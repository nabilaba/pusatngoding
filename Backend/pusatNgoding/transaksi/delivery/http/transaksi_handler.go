package handler

import (
	"fmt"
	"net/http"
	"path/filepath"
	"pusat-ngoding/domain"
	"pusat-ngoding/users/delivery/http/middleware"
	"pusat-ngoding/utility/jwt"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type transaksi struct {
	transaksiUseCase domain.TransaksiUseCase
}

func NewTransaksiHandler(r *gin.Engine, transaksiUseCase domain.TransaksiUseCase) {
	h := &transaksi{transaksiUseCase: transaksiUseCase}

	a := r.Group("/api").Use(middleware.InitMiddleware().JWT())
	{
		a.GET("/transaksi", h.getAll)
		a.GET("/transaksi/:id", h.getById)
		a.POST("/transaksi", h.store)
		a.PUT("/transaksi/:id", h.update)
		a.DELETE("/transaksi/:id", h.delete)
	}
}

func (t *transaksi) getAll(c *gin.Context) {
	ctx := c.Request.Context()

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

	res, err := t.transaksiUseCase.GetAll(ctx)
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

func (t *transaksi) getById(c *gin.Context) {
	ctx := c.Request.Context()
	id := c.Param("id")
	convertId, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "bad request",
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

	res, err := t.transaksiUseCase.GetById(ctx, int64(convertId))
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

func (t *transaksi) store(c *gin.Context) {
	ctx := c.Request.Context()
	users_id := c.PostForm("users_id")
	kursus_id := c.PostForm("kursus_id")
	status := c.PostForm("status")
	endAt := c.PostForm("end_at")
	convUser, _ := strconv.Atoi(users_id)
	convKursus, _ := strconv.Atoi(kursus_id)
	convStatus, _ := strconv.ParseBool(status)
	convEndAt, _ := time.Parse("2006-01-02", endAt)
	bukti, err := c.FormFile("bukti_transaksi")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})
		return
	}

	fileName := filepath.Base(users_id + "_" + bukti.Filename)
	filePath := fmt.Sprint("storage/transaksi/" + fileName)

	err = c.SaveUploadedFile(bukti, filePath)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})

		return
	}

	transaksi := domain.Transaksi{
		Users_id:       int64(convUser),
		Kursus_id:      int64(convKursus),
		Status:         convStatus,
		BuktiTransaksi: filePath,
		EndAt:          convEndAt,
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

	res, err := t.transaksiUseCase.Store(ctx, &transaksi)
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

func (t *transaksi) update(c *gin.Context) {
	ctx := c.Request.Context()
	id := c.Param("id")
	convertId, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})
		return
	}

	users_id := c.PostForm("users_id")
	kursus_id := c.PostForm("kursus_id")
	status := c.PostForm("status")
	endAt := c.PostForm("end_at")
	convUser, _ := strconv.Atoi(users_id)
	convKursus, _ := strconv.Atoi(kursus_id)
	convStatus, _ := strconv.ParseBool(status)
	convEndAt, _ := time.Parse("2006-01-02", endAt)
	bukti, err := c.FormFile("bukti_transaksi")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})
		return
	}

	fileName := filepath.Base(users_id + "_" + bukti.Filename)
	filePath := fmt.Sprint("storage/transaksi/" + fileName)

	err = c.SaveUploadedFile(bukti, filePath)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})

		return
	}

	transaksi := domain.Transaksi{
		Users_id:       int64(convUser),
		Kursus_id:      int64(convKursus),
		Status:         convStatus,
		BuktiTransaksi: filePath,
		EndAt:          convEndAt,
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

	res, err := t.transaksiUseCase.Update(ctx, int64(convertId), &transaksi)
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

func (t *transaksi) delete(c *gin.Context) {
	ctx := c.Request.Context()
	id := c.Param("id")
	convertId, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "bad request",
		})
		return
	}

	err = t.transaksiUseCase.Delete(ctx, int64(convertId))
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
