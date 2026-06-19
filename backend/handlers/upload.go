package handlers

import (
	"bytes"
	"fmt"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"

	"novafield-api/internal/blob"
	"novafield-api/store"

	"github.com/nfnt/resize"
)

var allowedExts = map[string]bool{".jpg": true, ".jpeg": true, ".png": true, ".gif": true}
var allowedArchiveExts = map[string]bool{".zip": true}
var maxUploadSize int64 = 10 << 20
var maxImageWidth = envInt("IMAGE_MAX_WIDTH", 1200)
var thumbWidth = envInt("THUMB_WIDTH", 300)
var thumbHeight = envInt("THUMB_HEIGHT", 300)
var uploadStore blob.Store = blob.NewMemoryStore("http://localhost:3001/uploads")

func ConfigureUploadStore(store blob.Store) { uploadStore = store }

func envInt(key string, fallback int) int {
	if value := getenv(key); value != "" {
		if number, err := strconv.Atoi(value); err == nil && number > 0 {
			return number
		}
	}
	return fallback
}

var getenv = os.Getenv

func UploadHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		Error(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}
	user := GetUser(r)
	if user == nil {
		Error(w, http.StatusUnauthorized, "Unauthorized")
		return
	}
	r.Body = http.MaxBytesReader(w, r.Body, maxUploadSize)
	if err := r.ParseMultipartForm(maxUploadSize); err != nil {
		Error(w, http.StatusBadRequest, "File too large (max 10MB)")
		return
	}
	file, header, err := r.FormFile("file")
	if err != nil {
		Error(w, http.StatusBadRequest, "No file provided")
		return
	}
	defer file.Close()

	ext := strings.ToLower(filepath.Ext(header.Filename))
	isImage, isArchive := allowedExts[ext], allowedArchiveExts[ext]
	if !isImage && !isArchive {
		Error(w, http.StatusBadRequest, "File type not allowed. Use: jpg, png, gif, zip")
		return
	}
	data, err := io.ReadAll(io.LimitReader(file, maxUploadSize+1))
	if err != nil || int64(len(data)) > maxUploadSize {
		Error(w, http.StatusBadRequest, "File too large (max 10MB)")
		return
	}
	contentType := http.DetectContentType(data)
	if isImage && !strings.HasPrefix(contentType, "image/") {
		Error(w, http.StatusBadRequest, "Invalid image content")
		return
	}
	if isArchive && contentType != "application/zip" {
		Error(w, http.StatusBadRequest, "Invalid ZIP content")
		return
	}
	base := strings.TrimSuffix(header.Filename, filepath.Ext(header.Filename))
	filename := fmt.Sprintf("%s_%s%s", store.NewID()[:8], sanitizeFilename(base), ext)
	prefix := "users/" + user.ID + "/"
	originalKey := prefix + filename
	created := make([]string, 0, 3)
	put := func(key, kind string, content []byte) error {
		if err := uploadStore.Put(r.Context(), key, kind, bytes.NewReader(content), int64(len(content))); err != nil {
			for _, createdKey := range created {
				_ = uploadStore.Delete(r.Context(), createdKey)
			}
			return err
		}
		created = append(created, key)
		return nil
	}
	if err := put(originalKey, contentType, data); err != nil {
		Error(w, http.StatusInternalServerError, "Failed to store file")
		return
	}
	response := H{"url": uploadStore.PublicURL(originalKey), "filename": filename}
	if isArchive {
		JSON(w, http.StatusCreated, response)
		return
	}
	variants, err := processImage(data, filename, ext)
	if err != nil {
		_ = uploadStore.Delete(r.Context(), originalKey)
		Error(w, http.StatusBadRequest, "Invalid image content")
		return
	}
	for _, variant := range variants {
		key := prefix + variant.key
		if err := put(key, variant.contentType, variant.data); err != nil {
			Error(w, http.StatusInternalServerError, "Failed to store image variants")
			return
		}
		response[variant.responseField] = uploadStore.PublicURL(key)
	}
	JSON(w, http.StatusCreated, response)
}

type imageVariant struct {
	key, contentType, responseField string
	data                            []byte
}

func processImage(data []byte, filename, ext string) ([]imageVariant, error) {
	img, _, err := image.Decode(bytes.NewReader(data))
	if err != nil {
		return nil, err
	}
	width := img.Bounds().Dx()
	if width <= thumbWidth {
		return nil, nil
	}
	baseName := strings.TrimSuffix(filename, ext)
	variants := make([]imageVariant, 0, 2)
	if width > maxImageWidth {
		encoded, contentType, err := encodeImage(ext, resize.Resize(uint(maxImageWidth), 0, img, resize.Lanczos3))
		if err != nil {
			return nil, err
		}
		variants = append(variants, imageVariant{baseName + "_resized" + ext, contentType, "resizedUrl", encoded})
	}
	encoded, contentType, err := encodeImage(ext, resize.Thumbnail(uint(thumbWidth), uint(thumbHeight), img, resize.Lanczos3))
	if err != nil {
		return nil, err
	}
	variants = append(variants, imageVariant{"thumbs/" + baseName + "_thumb" + ext, contentType, "thumbnailUrl", encoded})
	return variants, nil
}

func encodeImage(ext string, img image.Image) ([]byte, string, error) {
	var output bytes.Buffer
	var err error
	contentType := "image/png"
	switch ext {
	case ".jpg", ".jpeg":
		contentType = "image/jpeg"
		err = jpeg.Encode(&output, img, &jpeg.Options{Quality: 85})
	case ".gif":
		contentType = "image/gif"
		err = gif.Encode(&output, img, nil)
	default:
		err = png.Encode(&output, img)
	}
	return output.Bytes(), contentType, err
}

var unsafeChars = regexp.MustCompile(`[^a-zA-Z0-9_\-]`)

func sanitizeFilename(name string) string {
	name = filepath.Base(name)
	name = strings.TrimSuffix(name, filepath.Ext(name))
	name = unsafeChars.ReplaceAllString(name, "_")
	if name == "" {
		name = "file"
	}
	if len(name) > 50 {
		name = name[:50]
	}
	return name
}
