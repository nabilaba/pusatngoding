package sqlite3

import (
	"context"
	"database/sql"
	"pusat-ngoding/domain"
	"pusat-ngoding/utility/hash"
)

type authRepo struct {
	db *sql.DB
}

func NewAuthRepo(db *sql.DB) domain.AuthRepository {
	return &authRepo{db: db}
}

func (a *authRepo) findById(ctx context.Context, id int64) (domain.RegisterUser, error) {
	sqlStmt := `SELECT * FROM users WHERE id = ?`
	row := a.db.QueryRowContext(ctx, sqlStmt, id)

	var registerResp domain.RegisterUser

	err := row.Scan(&registerResp.Id, &registerResp.NamaDepan, &registerResp.NamaBelakang, &registerResp.Email, &registerResp.NoTelp, &registerResp.Password, &registerResp.Role, &registerResp.Kota, &registerResp.TglLahir, &registerResp.Pendidikan, &registerResp.Keahlian, &registerResp.Motivasi, &registerResp.Status, &registerResp.Price, &registerResp.Rating, &registerResp.Lulusan, &registerResp.Avatar, &registerResp.CreatedAt)
	if err != nil {
		return domain.RegisterUser{}, err
	}

	return registerResp, nil
}

func (a *authRepo) Login(ctx context.Context, login *domain.LoginUser) (domain.User, error) {
	sqlStmt := `SELECT * FROM users WHERE email = ?`

	row := a.db.QueryRowContext(ctx, sqlStmt, login.Email, login.Password)

	var user domain.User

	err := row.Scan(&user.Id, &user.NamaDepan, &user.NamaBelakang, &user.Email, &user.NoTelp, &user.Password, &user.Role, &user.Kota, &user.TglLahir, &user.Pendidikan, &user.Keahlian, &user.Motivasi, &user.Status, &user.Price, &user.Rating, &user.Lulusan, &user.Avatar, &user.CreatedAt)
	if err != nil {
		return domain.User{}, err
	}

	err = hash.ValidatePassword(user.Password, login.Password)
	if err != nil {
		return domain.User{}, err
	}

	return user, nil
}

func (a *authRepo) Register(ctx context.Context, register *domain.RegisterUser) (domain.RegisterUser, error) {
	sqlStmt := `INSERT INTO users(nama_depan, nama_belakang, email, no_telp, password) VALUES(?, ?, ?, ?, ?)`

	register.Password, _ = hash.GeneratePassword(register.Password)

	res, err := a.db.ExecContext(ctx, sqlStmt, register.NamaDepan, register.NamaBelakang, register.Email, register.NoTelp, register.Password)
	if err != nil {
		return domain.RegisterUser{}, err
	}

	id, _ := res.LastInsertId()

	userRes, err := a.findById(ctx, id)
	if err != nil {
		return domain.RegisterUser{}, err
	}

	return userRes, nil
}
