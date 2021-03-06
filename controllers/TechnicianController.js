const Technician = require("../models/Technician");
const handlePassword = require("../modules/hashPassword");
const bcryptjs = require("bcryptjs");
const token = require("../modules/jwt");

const handleNewTechnician = async (req, res) => {
	const { email } = req.body;

	const newTechnician = new Technician({
		email,
		password: await handlePassword(req, res),
	});

	await newTechnician.save((err, newTechnician) => {
		if (err) {
			console.error(err);
			res.status(500).json({
				message: "Technician already exists",
				data: { status: "error", error: err },
			});
		} else {
			res.status(200).json({
				message: "Technician Created",
				data: { status: "success", user: newTechnician },
			});
		}
	});
};

const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	const tech = await Technician.findOne({ email: email });
	if (!tech) {
		res.status(401).send("Invalid email or password");
	} else {
		const isValidPassword = await bcryptjs.compare(password, tech.password);
		if (!isValidPassword) {
			res.status(401).send("Invalid email or password");
		} else {
			const jwtToken = token(tech);
			res.status(200).json({
				message: "Technician Logged",
				data: { status: "success", tech: tech, token: jwtToken },
			});
		}
	}
};

const deleteTechnician = async (req, res) => {
	const deletedTechnician = await Technician.findByIdAndDelete(req.params.id);
	if (!deletedTechnician) {
		res.status(401).json({
			message: "Technician doesn't exist",
			data:{ status: "error"}
		}); 
	} else {
		res.status(200).json({
			message: "Technician Deleted",
			data: { status: "success", user: deletedTechnician },
		});
	}
};

const updateTechnician = async (req, res) => {
	const { email } = req.body;
	const updateTech = await Technician.findByIdAndUpdate(req.params.id, {
		email,
		password: await handlePassword(req, res),
	});
	if (!updateTech) {
		res.status(401).json({
			message: "Technician doesn't exist",
			data:{ status: "error"}
		});  
	} else {
		res.status(200).json({
			message: "Technician Updated",
			data: { status: "success", user: updateTech },
		});
	}
};

module.exports = {
	handleNewTechnician,
	handleLogin,
	deleteTechnician,
	updateTechnician,
};
