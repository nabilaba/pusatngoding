package sqlite3

import (
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/assert/v2"
)

func SetUpRouter() *gin.Engine {
	router := gin.Default()
	return router
}

func TestLogin(t *testing.T) {
	w := httptest.NewRecorder()

	bodrReader := strings.NewReader(`{
		"email": "admin@gmail.com",
		"password": "admin1234",
	}`)

	req := httptest.NewRequest("POST", "/login", bodrReader)

	r := SetUpRouter()

	r.ServeHTTP(w, req)

	assert.Equal(t, w.Code, 200)
}
