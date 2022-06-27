package domain

import (
	"context"
	"time"
)

type Transaksi struct {
	Id             int64     `json:"id"`
	Users_id       int64     `json:"users_id" binding:"required"`
	Kursus_id      int64     `json:"kursus_id" binding:"required"`
	Status         bool      `json:"status"`
	BuktiTransaksi string    `json:"bukti_transaksi"`
	CreatedAt      time.Time `json:"created_at"`
	EndAt          time.Time `json:"end_at"`
}

type TransaksiResp struct {
	Id             int64      `json:"id"`
	Users          User       `json:"users"`
	Kursus         KursusResp `json:"kursus"`
	Status         bool       `json:"status"`
	BuktiTransaksi string     `json:"bukti_transaksi"`
	CreatedAt      time.Time  `json:"created_at"`
	EndAt          time.Time  `json:"end_at"`
}

type TransaksiRepository interface {
	GetAll(ctx context.Context) ([]TransaksiResp, error)
	GetById(ctx context.Context, id int64) (TransaksiResp, error)
	Store(ctx context.Context, transaksi *Transaksi) (TransaksiResp, error)
	Update(ctx context.Context, id int64, transaksi *Transaksi) (TransaksiResp, error)
	Delete(ctx context.Context, id int64) error
}

type TransaksiUseCase interface {
	GetAll(ctx context.Context) ([]TransaksiResp, error)
	GetById(ctx context.Context, id int64) (TransaksiResp, error)
	Store(ctx context.Context, transaksi *Transaksi) (TransaksiResp, error)
	Update(ctx context.Context, id int64, transaksi *Transaksi) (TransaksiResp, error)
	Delete(ctx context.Context, id int64) error
}
