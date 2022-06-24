package sqlite3

import (
	"context"
	"database/sql"
	"pusat-ngoding/domain"
	"pusat-ngoding/utility/hash"
)

type userRepo struct {
	db *sql.DB
}

func NewUserRepo(db *sql.DB) domain.UserRepository {
	return &userRepo{db: db}
}

func (u *userRepo) GetAll(ctx context.Context) ([]domain.User, error) {
	sqlStmt := `SELECT * FROM users`

	rows, err := u.db.QueryContext(ctx, sqlStmt)
	if err != nil {
		return nil, err
	}

	var listSiswa []domain.User

	for rows.Next() {
		var user domain.User

		err := rows.Scan(&user.Id, &user.NamaDepan, &user.NamaBelakang, &user.Email, &user.NoTelp, &user.Password, &user.Role, &user.Kota, &user.TglLahir, &user.Pendidikan, &user.Keahlian, &user.Motivasi, &user.Status, &user.Price, &user.Rating, &user.Lulusan, &user.Avatar, &user.CreatedAt)
		if err != nil {
			return nil, err
		}

		listSiswa = append(listSiswa, user)
	}

	return listSiswa, nil
}

func (u *userRepo) GetByRole(ctx context.Context, role string) ([]domain.User, error) {
	sqlStmt := `SELECT * FROM users WHERE role = ?`

	rows, err := u.db.QueryContext(ctx, sqlStmt, role)
	if err != nil {
		return []domain.User{}, err
	}

	users := []domain.User{}
	for rows.Next() {
		user := domain.User{}

		err := rows.Scan(&user.Id, &user.NamaDepan, &user.NamaBelakang, &user.Email, &user.NoTelp, &user.Password, &user.Role, &user.Kota, &user.TglLahir, &user.Pendidikan, &user.Keahlian, &user.Motivasi, &user.Status, &user.Price, &user.Rating, &user.Lulusan, &user.Avatar, &user.CreatedAt)
		if err != nil {
			return []domain.User{}, err
		}

		users = append(users, user)
	}

	return users, nil
}

func (u *userRepo) GetById(ctx context.Context, id int64) (domain.User, error) {
	sqlStmt := `SELECT * FROM users WHERE id = ?`

	row := u.db.QueryRowContext(ctx, sqlStmt, id)

	var user domain.User

	err := row.Scan(&user.Id, &user.NamaDepan, &user.NamaBelakang, &user.Email, &user.NoTelp, &user.Password, &user.Role, &user.Kota, &user.TglLahir, &user.Pendidikan, &user.Keahlian, &user.Motivasi, &user.Status, &user.Price, &user.Rating, &user.Lulusan, &user.Avatar, &user.CreatedAt)
	if err != nil {
		return domain.User{}, err
	}

	return user, nil
}

func (u *userRepo) Store(ctx context.Context, user *domain.User) (domain.User, error) {
	sqlStmt := `INSERT INTO users(nama_depan, nama_belakang, email, no_telp, password) VALUES(?, ?, ?, ?, ?)`

	user.Password, _ = hash.GeneratePassword(user.Password)

	res, err := u.db.ExecContext(ctx, sqlStmt, user.NamaDepan, user.NamaBelakang, user.Email, user.NoTelp, user.Password)
	if err != nil {
		return domain.User{}, err
	}

	id, _ := res.LastInsertId()

	userRes, err := u.GetById(ctx, id)
	if err != nil {
		return domain.User{}, err
	}

	return userRes, nil
}

func (u *userRepo) Update(ctx context.Context, id int64, user *domain.User) (domain.User, error) {
	userOld, _ := u.GetById(ctx, id)

	sqlStmt := `UPDATE users SET nama_depan = ?, nama_belakang = ?, email = ?, no_telp = ?, password = ?, kota = ?, tgl_lahir = ?, pendidikan = ?, avatar = ? WHERE id = ?`

	if user.Password == userOld.Password {
		user.Password = userOld.Password
	} else {
		user.Password, _ = hash.GeneratePassword(user.Password)
	}

	_, err := u.db.ExecContext(ctx, sqlStmt, user.NamaDepan, user.NamaBelakang, user.Email, user.NoTelp, user.Password, user.Kota, user.TglLahir, user.Pendidikan, user.Avatar, id)
	if err != nil {
		return domain.User{}, err
	}

	res, err := u.GetById(ctx, id)
	if err != nil {
		return domain.User{}, err
	}

	return res, nil
}

func (u *userRepo) UpdateRole(ctx context.Context, id int64, user *domain.User) (domain.User, error) {
	userOld, _ := u.GetById(ctx, id)

	sqlStmt := `UPDATE users SET nama_depan = ?, nama_belakang = ?, email = ?, no_telp = ?, password = ?, role = ?, kota = ?, tgl_lahir = ?, pendidikan = ?, avatar = ? WHERE id = ?`

	if user.Password == userOld.Password {
		user.Password = userOld.Password
	} else {
		user.Password, _ = hash.GeneratePassword(user.Password)
	}

	_, err := u.db.ExecContext(ctx, sqlStmt, user.NamaDepan, user.NamaBelakang, user.Email, user.NoTelp, user.Password, user.Role, user.Kota, user.TglLahir, user.Pendidikan, user.Avatar, id)
	if err != nil {
		return domain.User{}, err
	}

	res, err := u.GetById(ctx, id)
	if err != nil {
		return domain.User{}, err
	}

	return res, nil
}

func (u *userRepo) Delete(ctx context.Context, id int64) error {
	_, err := u.GetById(ctx, id)
	if err != nil {
		return err
	}

	sqlStmt := `DELETE FROM users WHERE id = ?`
	_, err = u.db.ExecContext(ctx, sqlStmt, id)
	if err != nil {
		return err
	}

	return nil
}
