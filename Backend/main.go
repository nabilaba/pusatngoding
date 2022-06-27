package main

import (
	"backend/routes"
	//
	"github.com/gofiber/fiber/v2"
)

func main() {
	//database.Connect()

	app := fiber.New()

	routes.Setup(app)

	app.Listen(":7777")
}
