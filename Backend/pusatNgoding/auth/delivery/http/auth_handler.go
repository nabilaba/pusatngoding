package auth

import (
	"net/http"
	"pusat-ngoding/domain"
	"pusat-ngoding/utility/jwt"

	"github.com/gin-gonic/gin"
)

type authHandler struct {
	authRepo domain.AuthRepository
}

func NewAuthHandler(r *gin.Engine, loginRepo domain.AuthRepository) {
	h := &authHandler{authRepo: loginRepo}

	r.POST("/login", h.login)
	r.POST("/register", h.register)
}

func (a *authHandler) login(c *gin.Context) {
	ctx := c.Request.Context()
	var login domain.LoginUser

	err := c.ShouldBind(&login)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error internal",
		})

		return
	}

	userLogin, err := a.authRepo.Login(ctx, &login)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error internal",
		})

		return
	}

	generateToken, err := jwt.GenerateToken(userLogin.Email, userLogin.Role)
	if err != nil {
		c.JSON(http.StatusFailedDependency, gin.H{
			"message": "failed depedency",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":    "success",
		"auth_token": generateToken,
		"data": gin.H{
			"email":      userLogin.Email,
			"created_at": userLogin.CreatedAt,
		},
	})
}

func (a *authHandler) register(c *gin.Context) {
	ctx := c.Request.Context()
	var registerUser domain.RegisterUser

	err := c.ShouldBind(&registerUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error internal",
		})

		return
	}

	userRegist, err := a.authRepo.Register(ctx, &registerUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error internal",
		})

		return
	}

	generateToken, err := jwt.GenerateToken(userRegist.Email, userRegist.Role)
	if err != nil {
		c.JSON(http.StatusFailedDependency, gin.H{
			"message": "failed depedency",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":    "success",
		"auth_token": generateToken,
		"data": gin.H{
			"email":      userRegist.Email,
			"created_at": userRegist.CreatedAt,
		},
	})
}
