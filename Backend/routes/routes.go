package routes

import (
	"backend/controller"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	app.Post("/signup", controller.SignUp)
	app.Post("/login", controller.Login)
}
