package domain

import (
	"context"
	"time"
)

type User struct {
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

type UserRepository interface {
	GetAll(ctx context.Context) ([]User, error)
	Store(ctx context.Context, user *User) (User, error)
	GetByRole(ctx context.Context, role string) ([]User, error)
	GetById(ctx context.Context, id int64) (User, error)
	Update(ctx context.Context, id int64, user *User) (User, error)
	UpdateRole(ctx context.Context, id int64, user *User) (User, error)
	Delete(ctx context.Context, id int64) error
}
