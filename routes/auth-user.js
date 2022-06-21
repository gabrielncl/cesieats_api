var express = require("express");
var router = express.Router();
const {
	handleNewUser,
	handleLogin,
	deleteUser,
	updateUser,
} = require("../controllers/UserController");

router.post("/login", async (req, res, next) => {
	handleLogin(req, res);
});

router.post("/register", async (req, res, next) => {
	handleNewUser(req, res);
});

router.delete("/delete/:id", async (req, res, next) => {
	deleteUser(req, res);
});

router.put("/update/:id", async (req, res, next) => {
	updateUser(req, res);
});

module.exports = router;
