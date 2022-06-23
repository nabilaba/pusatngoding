package domain

import (
	"context"
	"time"
)

type Kursus struct {
	Id        int64     `json:"id"`
	Nama      string    `json:"nama"`
	UsersId   string    `json:"users_id"` // mentor
	Deskripsi string    `json:"deskripsi"`
	Modul     string    `json:"modul"`
	CreatedAt time.Time `json:"created_at"`
}

type KursusResp struct {
	Id        int64     `json:"id"`
	Nama      string    `json:"nama"`
	User      User      `json:"users"` // mentor
	Deskripsi string    `json:"deskripsi"`
	Modul     string    `json:"modul"`
	CreatedAt time.Time `json:"created_at"`
}

type KursusRepository interface {
	GetAll(ctx context.Context) ([]KursusResp, error)
	GetById(ctx context.Context, id int64) (KursusResp, error)
	Store(ctx context.Context, kursus *Kursus) (KursusResp, error)
	Delete(ctx context.Context, id int64) error
}

type KursusUseCase interface {
	GetAll(ctx context.Context) ([]KursusResp, error)
	GetById(ctx context.Context, id int64) (KursusResp, error)
	Store(ctx context.Context, kursus *Kursus) (KursusResp, error)
	Delete(ctx context.Context, id int64) error
}
