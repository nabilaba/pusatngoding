package domain

import (
	"context"
	"time"
)

type Komentar struct {
	Id        int64     `json:"id"`
	Rate      int       `json:"rate" binding:"required"`
	Content   string    `json:"content"`
	UsersId   int64     `json:"users_id" binding:"required"`
	KursusId  int64     `json:"kursus_id" binding:"required"`
	CreatedAt time.Time `json:"created_at"`
}

type KomentarResp struct {
	Id        int64      `json:"id"`
	Rate      int        `json:"rate"`
	Content   string     `json:"content"`
	User      User       `json:"user"`
	Kursus    KursusResp `json:"kursus"`
	CreatedAt time.Time  `json:"created_at"`
}

type KomentarRepository interface {
	GetAll(ctx context.Context) ([]KomentarResp, error)
	GetById(ctx context.Context, id int64) (KomentarResp, error)
	GetByIdKursus(ctx context.Context, idKursus int64) ([]KomentarResp, error)
	Store(ctx context.Context, komen *Komentar) (KomentarResp, error)
	Update(ctx context.Context, id int64, komen *Komentar) (KomentarResp, error)
	Delete(ctx context.Context, id int64) error
}

type KomentarUseCase interface {
	GetAll(ctx context.Context) ([]KomentarResp, error)
	GetById(ctx context.Context, id int64) (KomentarResp, error)
	GetByIdKursus(ctx context.Context, idKursus int64) ([]KomentarResp, error)
	Store(ctx context.Context, komen *Komentar) (KomentarResp, error)
	Update(ctx context.Context, id int64, komen *Komentar) (KomentarResp, error)
	Delete(ctx context.Context, id int64) error
}
