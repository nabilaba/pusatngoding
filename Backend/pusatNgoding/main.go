package main

import (
	"database/sql"
	"fmt"
	authRepo "pusat-ngoding/auth/repository/sqlite3"
	kursusRepo "pusat-ngoding/kursus/repository/sqlite3"
	"pusat-ngoding/kursus/usecase"
	userRepo "pusat-ngoding/users/repository/sqlite3"
	"time"

	authHandler "pusat-ngoding/auth/delivery/http"
	kursusHandler "pusat-ngoding/kursus/delivery/http"
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
	kursusUseCase := usecase.NewKursusNewUseCase(kursusRepo, userRepo, ctxTimeout)
	kursusHandler.NewKursusHandler(r, kursusUseCase)

	r.Run()
}
