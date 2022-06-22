const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema({
    user_id: {
        type: String,
    },
    description: {
		type: String,
	},
    totalprice:{
        type: Number,
    },
    deliveryAdress:{
        type: String,
    },
    article_id: {
        type: Array,
        default:[],
    },
    menu_id: {
		type: Array,
        default:[],
	},
    confirmOrder:{
        type: Boolean,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model('Order', orderSchema)