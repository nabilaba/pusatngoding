package handler

import (
	"net/http"
	"pusat-ngoding/domain"
	"pusat-ngoding/users/delivery/http/middleware"
	"pusat-ngoding/utility/jwt"
	"strconv"

	"github.com/gin-gonic/gin"
)

type usersHandler struct {
	usersRepo domain.UserRepository
}

func NewSiswaHandler(r *gin.Engine, usersRepo domain.UserRepository) {
	h := &usersHandler{usersRepo: usersRepo}

	a := r.Group("api").Use(middleware.InitMiddleware().JWT())
	{
		a.GET("/users", h.getAll)
		a.GET("/users/:id", h.getById)
		a.POST("/users", h.store)
		a.PUT("/users/:id", h.update)
		a.DELETE("/users/:id", h.delete)

		a.GET("/users/role/:role", h.getByRole)
		a.PUT("/users/role/:id", h.updateRole)
	}

}

func (s *usersHandler) getAll(c *gin.Context) {
	ctx := c.Request.Context()
	users, err := s.usersRepo.GetAll(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error internal",
		})

		return
	}

	auth := c.Request.Header.Get("Authorization")

	claims, err := jwt.ValidateToken(auth)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "unauthorized",
		})
		return
	}

	if claims.Role != "admin" && claims.Role != "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "unauthorized",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"users":   users,
	})
}

func (u *usersHandler) getByRole(c *gin.Context) {
	ctx := c.Request.Context()
	role := c.Param("role")

	// check role
	auth := c.Request.Header.Get("Authorization")

	claims, err := jwt.ValidateToken(auth)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "unauthorized",
		})
		return
	}

	if claims.Role != "admin" && claims.Role != "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "unauthorized",
		})
		return
	}

	res, err := u.usersRepo.GetByRole(ctx, role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error internal",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"user":    res,
	})
}

func (u *usersHandler) getById(c *gin.Context) {
	id := c.Param("id")
	intId, _ := strconv.Atoi(id)
	ctx := c.Request.Context()

	user, err := u.usersRepo.GetById(ctx, int64(intId))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error internal",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"user":    user,
	})
}

func (u *usersHandler) store(c *gin.Context) {
	ctx := c.Request.Context()
	var user domain.User

	err := c.ShouldBind(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})

		return
	}

	// check role
	auth := c.Request.Header.Get("Authorization")

	claims, err := jwt.ValidateToken(auth)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "unauthorized",
		})
		return
	}

	if claims.Role != "admin" && claims.Role != "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "unauthorized",
		})
		return
	}

	res, err := u.usersRepo.Store(ctx, &user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error internal",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"user":    res,
	})
}

func (u *usersHandler) update(c *gin.Context) {
	id := c.Param("id")
	intId, _ := strconv.Atoi(id)
	ctx := c.Request.Context()
	user := domain.User{}

	err := c.ShouldBind(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})

		return
	}

	res, err := u.usersRepo.Update(ctx, int64(intId), &user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error internal",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"user":    res,
	})
}

func (u *usersHandler) updateRole(c *gin.Context) {
	id := c.Param("id")
	intId, _ := strconv.Atoi(id)
	ctx := c.Request.Context()
	user := domain.User{}

	err := c.ShouldBind(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})

		return
	}

	// check role
	auth := c.Request.Header.Get("Authorization")

	claims, err := jwt.ValidateToken(auth)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "unauthorized",
		})
		return
	}

	if claims.Role != "admin" && claims.Role != "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "unauthorized",
		})
		return
	}

	res, err := u.usersRepo.UpdateRole(ctx, int64(intId), &user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error internal",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"user":    res,
	})
}

func (u *usersHandler) delete(c *gin.Context) {
	id := c.Param("id")
	intId, _ := strconv.Atoi(id)
	ctx := c.Request.Context()

	err := u.usersRepo.Delete(ctx, int64(intId))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error internal",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}
