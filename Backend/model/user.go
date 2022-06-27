package model

type User struct {
	NoID     uint   `json:"id"`
	Nama     string `json:"name"`
	Email    string `json:"email"`
	Password []byte `json:"-"`
}
