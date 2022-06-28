package sqlite3

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/assert/v2"
)

func TestLogin(t *testing.T) {
	w := httptest.NewRecorder()
	r := gin.Default()

	bodyReader := strings.NewReader(`{
		"email": "admin@gmail.com",
		"password": "admin1234",
	}`)

	req := httptest.NewRequest("POST", "http://localhost:8080/login", bodyReader)

	defer req.Body.Close()

	r.Run()

	assert.Equal(t, http.StatusOK, w.Code)
}