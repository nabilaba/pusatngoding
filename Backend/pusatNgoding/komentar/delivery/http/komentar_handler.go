package handler

import (
	"net/http"
	"pusat-ngoding/domain"
	"pusat-ngoding/users/delivery/http/middleware"
	"strconv"

	"github.com/gin-gonic/gin"
)

type komentar struct {
	komenUseCase domain.KomentarUseCase
}

func NewKomentarHandler(r *gin.Engine, komenUseCase domain.KomentarUseCase) {
	h := &komentar{komenUseCase: komenUseCase}

	a := r.Group("api").Use(middleware.InitMiddleware().JWT())
	{
		a.GET("/komentar", h.getAll)
		a.GET("/komentar/:id", h.getById)
		a.POST("/komentar", h.store)
		a.PUT("/komentar/:id", h.update)
		a.DELETE("/komentar/:id", h.delete)
	}

	r.GET("/komentar/:id", h.getByIdKursus)
}

func (k *komentar) getAll(c *gin.Context) {
	ctx := c.Request.Context()

	res, err := k.komenUseCase.GetAll(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    res,
	})
}

func (k *komentar) getById(c *gin.Context) {
	id := c.Param("id")
	convertId, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})

		return
	}
	ctx := c.Request.Context()

	res, err := k.komenUseCase.GetById(ctx, int64(convertId))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    res,
	})
}

func (k *komentar) getByIdKursus(c *gin.Context) {
	id := c.Param("id")
	idKursus, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})

		return
	}
	ctx := c.Request.Context()

	res, err := k.komenUseCase.GetByIdKursus(ctx, int64(idKursus))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    res,
	})
}

func (k *komentar) store(c *gin.Context) {
	ctx := c.Request.Context()
	komen := domain.Komentar{}

	err := c.ShouldBind(&komen)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})

		return
	}

	res, err := k.komenUseCase.Store(ctx, &komen)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    res,
	})
}

func (k *komentar) update(c *gin.Context) {
	id := c.Param("id")
	convertId, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})

		return
	}
	ctx := c.Request.Context()
	komen := domain.Komentar{}

	err = c.ShouldBind(&komen)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})

		return
	}

	res, err := k.komenUseCase.Update(ctx, int64(convertId), &komen)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    res,
	})
}

func (k *komentar) delete(c *gin.Context) {
	id := c.Param("id")
	convertId, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})

		return
	}
	ctx := c.Request.Context()

	err = k.komenUseCase.Delete(ctx, int64(convertId))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}
