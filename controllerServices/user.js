const userService = require("./userServices");

const getUserProfile = async (req, res) => {
    try {
        console.log("Authorization Header:", req.headers.authorization); // Debugging

        if (!req.headers.authorization) {
            return res.status(401).send({ message: "Authorization header is missing." });
        }
        
        const jwt = req.headers.authorization.split(" ")[1];

        if (!jwt) {
            return res.status(401).send({ message: "JWT not found. Check if 'Bearer <token>' format is used." });
        }

        const user = await userService.getUserProfileByToken(jwt);

        if (!user) {
            return res.status(401).send({ message: "Invalid or expired token." });
        }

        return res.status(200).send({ user });
    } catch (err) {
        console.error("Error in getUserProfile:", err);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};


const getAllUser = async (req, res) => {
    try {
        const users = await userService.getAllUser();
        return res.status(200).send({ users });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

module.exports = { getUserProfile, getAllUser };
