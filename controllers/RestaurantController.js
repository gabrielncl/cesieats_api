const Restaurant = require("../models/Restaurant");
const handlePassword = require("../modules/hashPassword");
const referrer = require("../modules/referrer");
const bcrypt = require("bcrypt");
const token = require("../modules/jwt");

const handleNewRestaurant = async (req, res) => {
	const { name, address, email, phone, logo } = req.body;

	const newRestaurant = new Restaurant({
		name,
		address,
		email,
		password: await handlePassword(req, res),
		phone,
		referrer,
        logo,
	});

	await newRestaurant.save();
	res.status(200).json({
		message: "Restaurant Created",
		data: { status: "success", restaurant: newRestaurant },
	});
};

const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	const restaurant = await Restaurant.findOne({ email: email });
	if (!restaurant) {
		res.status(401).send("Invalid email or password");
	} else {
		const isValidPassword = await bcrypt.compare(password, restaurant.password);
		if (!isValidPassword) {
			res.status(401).send("Invalid email or password");
		} else {
			const jwtToken = token(restaurant);
			res.status(200).json({
				message: "restaurant Logged",
				data: { status: "success", restaurant: restaurant, token: jwtToken },
			});
		}
	}
};

const deleteRestaurant = async (req, res) => {
	const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
	res
		.status(200)
		.json({ message: "Restaurant Deleted", data: { status: "success", restaurant: deletedRestaurant } });
};

const updateRestaurant = async (req, res) => {
	const { name, address, email, phone, logo } = req.body;
	const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, {
		name,
		address,
		email,
		password: await handlePassword(req, res),
		phone,
		referrer,
        logo,
	});
	res
		.status(200)
		.json({ message: "Restaurant Updated", data: { status: "success", restaurant: restaurant } });
};

module.exports = {
	handleNewRestaurant,
	handleLogin,
	deleteRestaurant,
	updateRestaurant,
};