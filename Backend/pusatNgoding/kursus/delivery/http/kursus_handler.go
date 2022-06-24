package handler

import (
	"net/http"
	"pusat-ngoding/domain"
	"strconv"

	"github.com/gin-gonic/gin"
)

type kursus struct {
	kursusUseCase domain.KursusUseCase
}

func NewKursusHandler(r *gin.Engine, kursusUseCase domain.KursusUseCase) {
	h := &kursus{kursusUseCase: kursusUseCase}

	r.GET("/kursus", h.getAll)
	r.GET("/kursus/:id", h.getById)
	r.POST("/kursus", h.store)
	r.PUT("/kursus/:id", h.update)
	r.DELETE("/kursus/:id", h.delete)
}

func (k *kursus) getAll(c *gin.Context) {
	ctx := c.Request.Context()

	res, err := k.kursusUseCase.GetAll(ctx)
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

func (k *kursus) getById(c *gin.Context) {
	id := c.Param("id")
	convertId, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})
		return
	}

	ctx := c.Request.Context()

	res, err := k.kursusUseCase.GetById(ctx, int64(convertId))
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

func (k *kursus) store(c *gin.Context) {
	ctx := c.Request.Context()
	kursus := domain.Kursus{}

	err := c.ShouldBind(&kursus)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})
		return
	}

	res, err := k.kursusUseCase.Store(ctx, &kursus)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "internal")
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    res,
	})
}

func (k *kursus) update(c *gin.Context) {
	id := c.Param("id")
	convertId, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})
		return
	}
	ctx := c.Request.Context()
	kursus := domain.Kursus{}

	err = c.ShouldBind(&kursus)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})
		return
	}

	res, err := k.kursusUseCase.Update(ctx, int64(convertId), &kursus)
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

func (k *kursus) delete(c *gin.Context) {
	id := c.Param("id")
	convertId, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})
		return
	}
	ctx := c.Request.Context()

	err = k.kursusUseCase.Delete(ctx, int64(convertId))
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
