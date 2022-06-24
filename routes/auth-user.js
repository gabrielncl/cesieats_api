var express = require("express");
var router = express.Router();

const {
	handleNewUser,
	handleLogin,
	deleteUser,
	updateUser,
} = require("../controllers/UserController");

const { checkJWT, returnUserFromJwt } = require("../modules/jwt");
const { handleNewOrder, getOrders } = require("../controllers/OrderController");

router.get("/profile", checkJWT, async (req, res) => {
	res.send(returnUserFromJwt(req, res));
});

router.post("/login", async (req, res, next) => {
	handleLogin(req, res);
});

router.post("/register", async (req, res, next) => {
	handleNewUser(req, res);
});

router.delete("/delete/:id", checkJWT, async (req, res, next) => {
	deleteUser(req, res);
});

router.put("/update/:id", checkJWT, async (req, res, next) => {
	updateUser(req, res);
});

router.post("/order/create", checkJWT, async (req, res, next) => {
	handleNewOrder(req, res);
});

router.get("/orders", checkJWT, async (req, res, next) => {
	getOrders(req, res);
});

module.exports = router;
