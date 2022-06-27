package controller

import (
	//"backend/database"
	"backend/model"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

const KodeSandi = "kodesandi"

func SignUp(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 0)

	user := model.User{
		Nama:     data["nama"],
		Email:    data["email"],
		Password: password,
	}

	//buat connect ke database
	//database.DB.Create(&user)

	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user model.User

	//database email kalau sama baru bisa login
	// database.DB.Where("email =?", data["email"]).First(&user)

	// if user.NoID == 0 { //(ndak ada di database)
	// 	c.Status(fiber.StatusNotFound)
	// 	return c.JSON(fiber.Map{
	// 		"message": "akun belum terdaftar",
	// 	})
	// }

	//jika password tidak cocok
	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "password anda salah, silahkan coba lagi",
		})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodES256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.NoID)),
		ExpiresAt: time.Now().Add(time.Hour * 48).Unix(),
	})

	token, err := claims.SignedString([]byte(KodeSandi))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "tidak bisa login",
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 48),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "sukses login akun",
	})
}

// func User(c *fiber.Ctx) error {
// 	cookie := c.Cookies("jwt")

// 	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
// 		return []byte(KodeSandi), nil
// 	})

// 	if err != nil {
// 		c.Status(fiber.StatusUnauthorized)
// 		return c.JSON(fiber.Map{
// 			"message": "tidak terotautorisasi",
// 		})
// 	}

// 	//claims := token.Claims.(*jwt.StandardClaims)

// 	var user model.User

// 	//database.DB.Where("id = ?", claims.Issuer).First(&user)

// 	return c.JSON(user)
// }

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "sukses logout akun",
	})
}
