const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
	firstname: {
		type: String,
	},
	lastname: {
		type: String,
	},
	address: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
		unique: true
	},
	referralCode: {
		type: String,
	},
	referrer: {
		type: String,
	},
});

module.exports = mongoose.model("User", userSchema);
