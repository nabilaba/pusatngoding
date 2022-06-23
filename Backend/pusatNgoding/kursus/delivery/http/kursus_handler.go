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
	r.DELETE("/kursus/:id", h.delete)
}

func (k *kursus) getAll(c *gin.Context) {
	ctx := c.Request.Context()

	res, err := k.kursusUseCase.GetAll(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error internal",
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
	idConv, _ := strconv.Atoi(id)
	ctx := c.Request.Context()

	res, err := k.kursusUseCase.GetById(ctx, int64(idConv))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error internal",
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
	var kursus domain.Kursus

	err := c.ShouldBind(&kursus)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})

		return
	}

	res, err := k.kursusUseCase.Store(ctx, &kursus)
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

func (k *kursus) delete(c *gin.Context) {
	id := c.Param("id")
	idConv, _ := strconv.Atoi(id)
	ctx := c.Request.Context()

	err := k.kursusUseCase.Delete(ctx, int64(idConv))
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
