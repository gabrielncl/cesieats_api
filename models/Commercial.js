const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commercialSchema = Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	refreshToken: String,
});

module.exports = mongoose.model("Commercial", commercialSchema);
