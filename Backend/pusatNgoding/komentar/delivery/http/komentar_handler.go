package handler

import (
	"net/http"
	"pusat-ngoding/domain"
	"strconv"

	"github.com/gin-gonic/gin"
)

type komentar struct {
	komenUseCase domain.KomentarUseCase
}

func NewKomentarHandler(r *gin.Engine, komenUseCase domain.KomentarUseCase) {
	h := &komentar{komenUseCase: komenUseCase}

	r.GET("/komentar", h.getAll)
	r.GET("/komentar/:id", h.getById)
	r.POST("/komentar", h.store)
	r.PUT("/komentar/:id", h.update)
	r.DELETE("/komentar/:id", h.delete)
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
