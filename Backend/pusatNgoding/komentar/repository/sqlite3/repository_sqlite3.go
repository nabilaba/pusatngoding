package sqlite3

import (
	"context"
	"database/sql"
	"pusat-ngoding/domain"
)

type komentar struct {
	db *sql.DB
}

func NewKomentarRepo(db *sql.DB) domain.KomentarRepository {
	return &komentar{db: db}
}

func (k *komentar) GetAll(ctx context.Context) ([]domain.KomentarResp, error) {
	sqlStmt := `SELECT * FROM komentar`

	rows, err := k.db.QueryContext(ctx, sqlStmt)
	if err != nil {
		return []domain.KomentarResp{}, err
	}

	listKomen := []domain.KomentarResp{}

	for rows.Next() {
		komen := domain.KomentarResp{}

		err := rows.Scan(&komen.Id, &komen.Rate, &komen.Content, &komen.User.Id, &komen.Kursus.Id, &komen.CreatedAt)
		if err != nil {
			return []domain.KomentarResp{}, err
		}

		listKomen = append(listKomen, komen)
	}

	return listKomen, nil
}

func (k *komentar) GetById(ctx context.Context, id int64) (domain.KomentarResp, error) {
	sqlStmt := `SELECT * FROM komentar WHERE id = ?`

	row := k.db.QueryRowContext(ctx, sqlStmt, id)

	komen := domain.KomentarResp{}
	err := row.Scan(&komen.Id, &komen.Rate, &komen.Content, &komen.User.Id, &komen.Kursus.Id, &komen.CreatedAt)
	if err != nil {
		return domain.KomentarResp{}, err
	}

	return komen, nil
}

func (k *komentar) GetByIdKursus(ctx context.Context, idKursus int64) ([]domain.KomentarResp, error) {
	sqlStmt := `SELECT * FROM komentar WHERE kursus_id = ?`

	rows, err := k.db.QueryContext(ctx, sqlStmt, idKursus)
	if err != nil {
		return nil, err
	}

	listKomen := []domain.KomentarResp{}

	for rows.Next() {
		komen := domain.KomentarResp{}
		err := rows.Scan(&komen.Id, &komen.Rate, &komen.Content, &komen.User.Id, &komen.Kursus.Id, &komen.CreatedAt)
		if err != nil {
			return nil, err
		}

		listKomen = append(listKomen, komen)
	}

	return listKomen, nil
}

func (k *komentar) Store(ctx context.Context, komen *domain.Komentar) (domain.KomentarResp, error) {
	sqlStmt := `INSERT INTO komentar (rate, content, users_id, kursus_id) VALUES(?, ?, ?, ?)`

	row, err := k.db.ExecContext(ctx, sqlStmt, komen.Rate, komen.Content, komen.UsersId, komen.KursusId)
	if err != nil {
		return domain.KomentarResp{}, err
	}

	id, _ := row.LastInsertId()

	res, err := k.GetById(ctx, id)
	if err != nil {
		return domain.KomentarResp{}, err
	}

	return res, nil
}

func (k *komentar) Update(ctx context.Context, id int64, komen *domain.Komentar) (domain.KomentarResp, error) {
	sqlStmt := `UPDATE komentar SET rate = ?, content = ?, users_id = ?, kursus_id = ? WHERE id = ?`

	_, err := k.db.ExecContext(ctx, sqlStmt, komen.Rate, komen.Content, komen.UsersId, komen.KursusId, id)
	if err != nil {
		return domain.KomentarResp{}, err
	}

	res, err := k.GetById(ctx, id)
	if err != nil {
		return domain.KomentarResp{}, err
	}

	return res, nil
}

func (k *komentar) Delete(ctx context.Context, id int64) error {
	_, err := k.GetById(ctx, id)
	if err != nil {
		return err
	}

	sqlStmt := `DELETE FROM komentar WHERE id = ?`

	_, err = k.db.ExecContext(ctx, sqlStmt, id)
	if err != nil {
		return err
	}

	return nil
}
