package sqlite3

import (
	"context"
	"database/sql"
	"pusat-ngoding/domain"
)

type kursus struct {
	db *sql.DB
}

func NewKursusRepo(db *sql.DB) domain.KursusRepository {
	return &kursus{db: db}
}

func (k *kursus) GetAll(ctx context.Context) ([]domain.KursusResp, error) {
	sqlStmt := `SELECT * FROM kursus`

	rows, err := k.db.QueryContext(ctx, sqlStmt)
	if err != nil {
		return []domain.KursusResp{}, err
	}

	listKursus := []domain.KursusResp{}

	for rows.Next() {
		kursus := domain.KursusResp{}
		err := rows.Scan(&kursus.Id, &kursus.Nama, &kursus.User.Id, &kursus.Deskripsi, &kursus.Modul, &kursus.CreatedAt)
		if err != nil {
			return []domain.KursusResp{}, err
		}

		listKursus = append(listKursus, kursus)
	}

	return listKursus, nil
}

func (k *kursus) GetById(ctx context.Context, id int64) (domain.KursusResp, error) {
	sqlStmt := `SELECT * FROM kursus WHERE id = ?`

	row := k.db.QueryRowContext(ctx, sqlStmt, id)

	kursus := domain.KursusResp{}

	err := row.Scan(&kursus.Id, &kursus.Nama, &kursus.User.Id, &kursus.Deskripsi, &kursus.Modul, &kursus.CreatedAt)
	if err != nil {
		return domain.KursusResp{}, err
	}

	return kursus, nil
}

func (k *kursus) Store(ctx context.Context, kursus *domain.Kursus) (domain.KursusResp, error) {
	sqlStmt := `INSERT INTO kursus(nama, users_id, deskripsi, modul) VALUES(?, ?, ?, ?)`

	row, _ := k.db.ExecContext(ctx, sqlStmt, kursus.Nama)

	lastId, _ := row.LastInsertId()

	res, _ := k.GetById(ctx, lastId)

	return res, nil
}

func (k *kursus) Delete(ctx context.Context, id int64) error {
	sqlStmt := `DELETE FROM kursus WHERE id = ?`

	_, err := k.db.ExecContext(ctx, sqlStmt, id)
	if err != nil {
		return err
	}

	return nil
}
