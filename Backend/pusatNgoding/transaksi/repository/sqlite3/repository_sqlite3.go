package sqlite3

import (
	"context"
	"database/sql"
	"os"
	"pusat-ngoding/domain"
)

type transaksi struct {
	db *sql.DB
}

func NewTransaksiRepo(db *sql.DB) domain.TransaksiRepository {
	return &transaksi{db: db}
}

func (t *transaksi) GetAll(ctx context.Context) ([]domain.TransaksiResp, error) {
	sqlStmt := `SELECT * FROM transaksi`

	rows, err := t.db.QueryContext(ctx, sqlStmt)
	if err != nil {
		return nil, err
	}

	listTransaksi := []domain.TransaksiResp{}

	for rows.Next() {
		transaksi := domain.TransaksiResp{}

		err := rows.Scan(&transaksi.Id, &transaksi.Users.Id, &transaksi.Kursus.Id, &transaksi.Status, &transaksi.BuktiTransaksi, &transaksi.CreatedAt, &transaksi.EndAt)
		if err != nil {
			return nil, err
		}

		listTransaksi = append(listTransaksi, transaksi)
	}

	return listTransaksi, nil
}

func (t *transaksi) GetById(ctx context.Context, id int64) (domain.TransaksiResp, error) {
	sqlStmt := `SELECT * FROM transaksi WHERE id = ?`

	row := t.db.QueryRowContext(ctx, sqlStmt, id)

	transaksi := domain.TransaksiResp{}

	err := row.Scan(&transaksi.Id, &transaksi.Users.Id, &transaksi.Kursus.Id, &transaksi.Status, &transaksi.BuktiTransaksi, &transaksi.CreatedAt, &transaksi.EndAt)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	return transaksi, nil
}

func (t *transaksi) Store(ctx context.Context, transaksi *domain.Transaksi) (domain.TransaksiResp, error) {
	sqlStmt := `INSERT INTO transaksi (users_id, kursus_id, status, bukti_transaksi, end_at) VALUES(?, ?, ?, ?, ?)`

	row, err := t.db.ExecContext(ctx, sqlStmt, transaksi.Users_id, transaksi.Kursus_id, transaksi.Status, transaksi.BuktiTransaksi, transaksi.EndAt)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	id, _ := row.LastInsertId()

	res, err := t.GetById(ctx, id)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	return res, nil
}

func (t *transaksi) Update(ctx context.Context, id int64, transaksi *domain.Transaksi) (domain.TransaksiResp, error) {
	oldTrans, err := t.GetById(ctx, id)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	if transaksi.BuktiTransaksi != oldTrans.BuktiTransaksi {
		err = os.Remove(oldTrans.BuktiTransaksi)
		if err != nil {
			return domain.TransaksiResp{}, err
		}
	}

	sqlStmt := `UPDATE transaksi SET users_id = ?, kursus_id = ?, status = ?, bukti_transaksi = ?, end_at = ? WHERE id = ?`

	_, err = t.db.ExecContext(ctx, sqlStmt, transaksi.Users_id, transaksi.Kursus_id, transaksi.Status, transaksi.BuktiTransaksi, transaksi.EndAt, id)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	res, err := t.GetById(ctx, id)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	return res, nil
}

func (t *transaksi) Delete(ctx context.Context, id int64) error {
	transaksi, err := t.GetById(ctx, id)
	if err != nil {
		return err
	}

	err = os.Remove(transaksi.BuktiTransaksi)
	if err != nil {
		return err
	}

	sqlStmt := `DELETE FROM transaksi WHERE id = ?`

	_, err = t.db.ExecContext(ctx, sqlStmt, id)
	if err != nil {
		return err
	}

	return nil
}
