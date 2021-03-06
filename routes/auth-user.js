var express = require("express");
var router = express.Router();

const {
	handleNewUser,
	handleLogin,
	deleteUser,
	updateUser,
} = require("../controllers/UserController");

const { returnUserFromJwt } = require("../modules/jwt");
const { getOrders } = require("../controllers/OrderController");
const {
	updateCart,
	getCart,
	payCart,
} = require("../controllers/CartController");

//USER
router.get("/profile", async (req, res) => {
	res.send(returnUserFromJwt(req, res));
});

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

// CART
router.get("/cart", async (req, res, next) => {
	getCart(req, res);
});

router.put("/cart/:id", async (req, res, next) => {
	updateCart(req, res);
});

router.post("/cart/payment", async (req, res, next) => {
	payCart(req, res);
});

// ORDER
router.get("/orders", async (req, res, next) => {
	getOrders(req, res);
});

module.exports = router;
