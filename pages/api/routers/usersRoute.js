const express = require("express");
const { usersController } = require("../controller");
const routers = express.Router();

routers.get("/get", usersController.getData);
routers.post("/register", usersController.addData);
routers.patch("/login", usersController.editData);
routers.patch('/verified', usersController.verification)

module.exports = routers;