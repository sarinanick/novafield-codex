package handlers

import (
	"bytes"
	"image"
	"image/color"
	"image/jpeg"
	"mime/multipart"
	"net/http/httptest"
	"strings"
	"testing"

	"novafield-api/internal/blob"
)

func createTestJPEG(width, height int) []byte {
	img := image.NewRGBA(image.Rect(0, 0, width, height))
	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {
			img.Set(x, y, color.RGBA{R: uint8(x), G: uint8(y), B: 128, A: 255})
		}
	}
	var output bytes.Buffer
	_ = jpeg.Encode(&output, img, &jpeg.Options{Quality: 90})
	return output.Bytes()
}

func uploadRequest(t *testing.T, token, filename string, data []byte) *httptest.ResponseRecorder {
	t.Helper()
	var body bytes.Buffer
	writer := multipart.NewWriter(&body)
	part, err := writer.CreateFormFile("file", filename)
	if err != nil {
		t.Fatal(err)
	}
	if _, err := part.Write(data); err != nil {
		t.Fatal(err)
	}
	if err := writer.Close(); err != nil {
		t.Fatal(err)
	}
	req := httptest.NewRequest("POST", "/api/v1/upload", &body)
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", writer.FormDataContentType())
	response := httptest.NewRecorder()
	UploadHandler(response, req)
	return response
}

func setupUploadTest(t *testing.T) (*blob.MemoryStore, string) {
	t.Helper()
	resetDB()
	memory := blob.NewMemoryStore("https://cdn.example.test")
	ConfigureUploadStore(memory)
	t.Cleanup(func() { ConfigureUploadStore(blob.NewMemoryStore("http://localhost:3001/uploads")) })
	_, token := createTestUser("client")
	return memory, token
}

func TestUploadCreatesOriginalResizeAndThumbnail(t *testing.T) {
	memory, token := setupUploadTest(t)
	response := uploadRequest(t, token, "profile photo.jpg", createTestJPEG(2000, 1500))
	if response.Code != 201 {
		t.Fatalf("expected 201, got %d: %s", response.Code, response.Body)
	}
	result := decodeJSON(response)
	for _, field := range []string{"url", "resizedUrl", "thumbnailUrl"} {
		value, ok := result[field].(string)
		if !ok || !strings.HasPrefix(value, "https://cdn.example.test/users/") {
			t.Fatalf("unexpected %s: %#v", field, result[field])
		}
	}
	objects := memory.Objects()
	if len(objects) != 3 {
		t.Fatalf("expected 3 objects, got %d", len(objects))
	}
	for key, object := range objects {
		if object.ContentType != "image/jpeg" || len(object.Data) == 0 {
			t.Fatalf("invalid object %s", key)
		}
		if strings.Contains(key, "_thumb") {
			img, _, err := image.Decode(bytes.NewReader(object.Data))
			if err != nil {
				t.Fatal(err)
			}
			if img.Bounds().Dx() > thumbWidth || img.Bounds().Dy() > thumbHeight {
				t.Fatalf("thumbnail too large: %s", img.Bounds())
			}
		}
	}
}

func TestUploadArchive(t *testing.T) {
	memory, token := setupUploadTest(t)
	response := uploadRequest(t, token, "project.zip", []byte("PK\x03\x04fake zip content"))
	if response.Code != 201 {
		t.Fatalf("expected 201, got %d: %s", response.Code, response.Body)
	}
	if len(memory.Objects()) != 1 {
		t.Fatalf("expected one stored archive")
	}
}

func TestUploadRejectsExtensionAndContentMismatch(t *testing.T) {
	_, token := setupUploadTest(t)
	if response := uploadRequest(t, token, "malware.exe", []byte("bad")); response.Code != 400 {
		t.Fatalf("expected disallowed extension 400, got %d", response.Code)
	}
	if response := uploadRequest(t, token, "fake.jpg", []byte("not an image")); response.Code != 400 {
		t.Fatalf("expected invalid image 400, got %d", response.Code)
	}
}

func TestUploadCleansUpAfterPartialFailure(t *testing.T) {
	memory, token := setupUploadTest(t)
	memory.FailPutAt = 2
	response := uploadRequest(t, token, "large.jpg", createTestJPEG(2000, 1500))
	if response.Code != 500 {
		t.Fatalf("expected 500, got %d: %s", response.Code, response.Body)
	}
	if len(memory.Objects()) != 0 {
		t.Fatalf("expected partial upload cleanup")
	}
}

func TestUploadUnauthorized(t *testing.T) {
	resetDB()
	response := uploadRequest(t, "", "test.jpg", createTestJPEG(10, 10))
	if response.Code != 401 {
		t.Fatalf("expected 401, got %d", response.Code)
	}
}
