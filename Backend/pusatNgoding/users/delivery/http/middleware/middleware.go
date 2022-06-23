package middleware

import (
	"net/http"
	"pusat-ngoding/utility/jwt"

	"github.com/gin-gonic/gin"
)

type GoMiddleware struct{}

// CORS
func (m *GoMiddleware) CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		c.Next()
	}
}

// JWT
func (m *GoMiddleware) JWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := c.Request.Header.Get("Authorization")

		if auth == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "Unauthorized",
			})

			c.Abort()
			return
		}

		claims, err := jwt.ValidateToken(auth)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "Unauthorized",
			})

			c.Abort()
			return
		}

		c.Set("user", claims)

		c.Next()
	}
}

func InitMiddleware() *GoMiddleware {
	return &GoMiddleware{}
}
