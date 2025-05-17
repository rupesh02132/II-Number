const userService = require("./userServices");
const jwtProvider = require("../config/jwtprove");
const bcrypt = require("bcrypt");


const register = async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Debugging

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: "Request body is empty" });
        }

        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id);

        return res.status(200).send({ jwt, message: "Registered successfully" });

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};


//for login..

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send({ message: "Invalid credentials" });
        }
        const jwt = jwtProvider.generateToken(user._id);
        return res.status(200).send({ jwt,message:"login successfully" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

module.exports = { register, login };
