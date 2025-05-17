const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwtProvider=require("../config/jwtprove");

const createUser = async (userData) => {
  try {
    let {name, email, password} = userData;
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      throw new Error("User already exist", email);
    }

    password = await bcrypt.hash(password, 10);
    const user = await User.create({ name, lastname, email, password });
    console.log("created user", user);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId).populate("address");
    if (!user) {
      throw new Error("user not found with this id", userId);
    }
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found with this email", email);
    }
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};
// get by token
const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("user not found with this id", userId);
    }
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// get all user

const getAllUser = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUser,
};
