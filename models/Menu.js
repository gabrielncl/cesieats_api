const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	price: {
		type: Number,
		required: true,
	},
	photo: {
		type: String,
	},
	restaurant: {
		type: Object,
	},
    article: {
		type: Object,
		default:[],
	},
	//refreshToken: String,
});

module.exports = mongoose.model("Menu", menuSchema);
