package domain

import (
	"context"
	"time"
)

// register user
type RegisterUser struct {
	Id           int64     `json:"id"`
	NamaDepan    string    `json:"nama_depan" binding:"required"`
	NamaBelakang string    `json:"nama_belakang" binding:"required"`
	Email        string    `json:"email" binding:"required,email"`
	NoTelp       string    `json:"no_telp" binding:"required"`
	Password     string    `json:"password" binding:"required,min=8"`
	Role         string    `json:"role"`
	Kota         string    `json:"kota"`       // siswa & mentor
	TglLahir     string    `json:"tgl_lahir"`  // siswa & mentor
	Pendidikan   string    `json:"pendidikan"` // siswa & mentor
	Keahlian     string    `json:"keahlian"`   // mentor
	Motivasi     string    `json:"motivasi"`   // mentor
	Status       string    `json:"status"`     // mentor
	Price        string    `json:"price"`      // mentor
	Rating       string    `json:"rating"`     // mentor
	Lulusan      string    `json:"lulusan"`    // mentor
	Avatar       string    `json:"avatar"`     // siswa & mentor
	CreatedAt    time.Time `json:"created_at"`
}

// login user
type LoginUser struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthRepository interface {
	Login(ctx context.Context, login *LoginUser) (User, error)
	Register(ctx context.Context, register *RegisterUser) (RegisterUser, error)
}
