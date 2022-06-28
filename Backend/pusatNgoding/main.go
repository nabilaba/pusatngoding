package main

import (
	"database/sql"
	"fmt"
	authRepo "pusat-ngoding/auth/repository/sqlite3"
	komenRepo "pusat-ngoding/komentar/repository/sqlite3"
	komenUseCase "pusat-ngoding/komentar/usecase"
	kursusRepo "pusat-ngoding/kursus/repository/sqlite3"
	kursusUseCase "pusat-ngoding/kursus/usecase"
	transaksiRepo "pusat-ngoding/transaksi/repository/sqlite3"
	transaksiUseCase "pusat-ngoding/transaksi/usecase"
	userRepo "pusat-ngoding/users/repository/sqlite3"
	"time"

	authHandler "pusat-ngoding/auth/delivery/http"
	komenHandler "pusat-ngoding/komentar/delivery/http"
	kursusHandler "pusat-ngoding/kursus/delivery/http"
	transaksiHandler "pusat-ngoding/transaksi/delivery/http"
	userHandler "pusat-ngoding/users/delivery/http"
	"pusat-ngoding/users/delivery/http/middleware"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := sql.Open("sqlite3", "./db/pusat_ngoding.db")
	if err != nil {
		fmt.Println(err)
		return
	}

	r := gin.Default()

	// middleware
	r.Use(middleware.InitMiddleware().CORS())

	ctxTimeout := time.Duration(2) * time.Second

	authRepo := authRepo.NewAuthRepo(db)
	authHandler.NewAuthHandler(r, authRepo)

	userRepo := userRepo.NewUserRepo(db)
	userHandler.NewSiswaHandler(r, userRepo)

	kursusRepo := kursusRepo.NewKursusRepo(db)
	kursusUseCase := kursusUseCase.NewKursusUseCase(kursusRepo, userRepo, ctxTimeout)
	kursusHandler.NewKursusHandler(r, kursusUseCase)

	komenRepo := komenRepo.NewKomentarRepo(db)
	komenUseCase := komenUseCase.NewKomentarUseCase(komenRepo, userRepo, kursusRepo, ctxTimeout)
	komenHandler.NewKomentarHandler(r, komenUseCase)

	transaksiRepo := transaksiRepo.NewTransaksiRepo(db)
	transaksiUseCase := transaksiUseCase.NewTransaksiUseCase(transaksiRepo, userRepo, kursusRepo, ctxTimeout)
	transaksiHandler.NewTransaksiHandler(r, transaksiUseCase)

	r.Run()
}
