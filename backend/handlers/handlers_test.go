package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"novafield-api/database"
	passwordauth "novafield-api/internal/auth"
	"novafield-api/internal/favorites"
	"novafield-api/models"
	"novafield-api/store"
	"time"

	"golang.org/x/crypto/bcrypt"
)

var testPasswordHasher = passwordauth.NewBcryptHasher(bcrypt.MinCost)

func resetDB() {
	d := database.GetDB()
	d.Mu.Lock()
	d.Users = nil
	d.Gigs = nil
	d.Packages = nil
	d.Orders = nil
	d.Reviews = nil
	d.Messages = nil
	d.Conversations = nil
	d.Notifications = nil
	d.Categories = nil
	d.Meetings = nil
	d.Templates = nil
	d.Desks = nil
	d.CoworkingSessions = nil
	d.Floors = nil
	d.Disputes = nil
	d.DisputeEvidences = nil
	d.ProjectBriefs = nil
	d.MatchResults = nil
	d.SubscriptionPlans = nil
	d.Subscriptions = nil
	d.SubDeliverables = nil
	d.Invoices = nil
	d.BillingInfo = nil
	d.Recommendations = nil
	d.UserPreferences = nil
	d.RecFeedback = nil
	d.Organizations = nil
	d.OrgMembers = nil
	d.OrgInvites = nil
	d.CaseStudies = nil
	d.Testimonials = nil
	d.Verifications = nil
	d.Milestones = nil
	d.ClientBriefs = nil
	d.Proposals = nil
	d.Referrals = nil
	d.ReferralEarnings = nil
	d.Assessments = nil
	d.AssessmentResults = nil
	d.Badges = nil
	d.SavedSearches = nil
	d.QualityScores = nil
	d.HelpArticles = nil
	d.SupportTickets = nil
	d.WorkspaceComments = nil
	d.WorkspaceTasks = nil
	d.NotificationPrefs = nil
	d.NotificationDigests = nil
	d.Mu.Unlock()

	store.ConfigureRepositories(
		passwordauth.NewMemorySessionRepository(time.Now),
		favorites.NewMemoryRepository(),
	)
}

func createTestUser(role string) (*models.User, string) {
	passwordHash, err := testPasswordHasher.Hash("password123")
	if err != nil {
		panic(err)
	}
	user := models.User{
		ID:           store.NewID(),
		Email:        store.NewID()[:8] + "@test.com",
		PasswordHash: passwordHash,
		Name:         "Test " + role,
		Role:         role,
		Skills:       []string{},
		JoinedAt:     store.Now(),
	}

	d := database.GetDB()
	d.Mu.Lock()
	d.Users = append(d.Users, user)
	d.Mu.Unlock()

	token, err := store.GenerateToken(user.ID, user.Email, user.Role)
	if err != nil {
		panic(err)
	}
	return &user, token
}

func jsonBody(v interface{}) *bytes.Buffer {
	b, _ := json.Marshal(v)
	return bytes.NewBuffer(b)
}

func decodeJSON(resp *httptest.ResponseRecorder) map[string]interface{} {
	var result map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&result)
	return result
}

func authRequest(method, path string, body *bytes.Buffer, token string) *http.Request {
	if body == nil {
		body = bytes.NewBuffer(nil)
	}
	req := httptest.NewRequest(method, path, body)
	req.Header.Set("Content-Type", "application/json")
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}
	return req
}
