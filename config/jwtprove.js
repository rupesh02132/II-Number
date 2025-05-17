const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = "rupeshkumar"; 
const REFRESH_TOKEN_SECRET = "refresh_rupeshkumar"; 

// Generate Access and Refresh Tokens
const generateToken = (userId) => {
    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    return { accessToken, refreshToken };
};

// Verify Access Token
const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
        return decodedToken.userId;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};

// Refresh Access Token Using Refresh Token
const refreshAccessToken = (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign({ userId: decoded.userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        return newAccessToken;
    } catch (error) {
        throw new Error("Invalid or expired refresh token");
    }
};

module.exports = { generateToken, getUserIdFromToken, refreshAccessToken };