const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const UserCredential = require("../Models/UserCredentialModel");
const UserLoginHistory = require("../Models/UserLoginHistoryModel");
require("dotenv").config();
exports.register = async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email, mobile });
    await newUser.save();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserCredential = new UserCredential({
      token_user: newUser.token_user,
      password: hashedPassword
    });
    await newUserCredential.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "erro in registering the user ", error: error.message });
  }
};

exports.Login = async (req, res) => {
  try {
    const { token_user, password } = req.body;

    if (!token_user) {
      return res.status(400).json({ message: "token_user required" });
    } else if (!password) {
      return res.status(400).json({ message: "password is  required" });
    }

    const userCredential = await UserCredential.findOne({ token_user });

    if (!userCredential) {
      return res.status(404).json({ message: "User not found by the token" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      userCredential.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password " });
    }

    const user = await User.findOne({ token_user });

    const token = jwt.sign(
      { userId: user._id, token_user: user.token_user },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );
    res.cookie("token", token, {
      maxAge: 3600 * 1000
    });

    const loginEntry = new UserLoginHistory({
      token_user: user.token_user,
      time_login: new Date().toDateString(),
      status: "active"
    });

    await loginEntry.save();
    return res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile
      }
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Error in login" });
  }
};

exports.Logout = async (req, res) => {
  try {
    const { token_user } = req.body;

    const latestLogin = await UserLoginHistory.findOne({
      token_user,
      status: "active"
    }).sort({ createdAt: -1 });

    if (!latestLogin) {
      return res
        .status(400)
        .json({
          success: false,
          message: "No active session found invalid token"
        });
    }

    latestLogin.time_logout = new Date().toLocaleString();
    latestLogin.status = "offline";
    await latestLogin.save();

    res.clearCookie("token");

    return res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ success: false, message: "Logout failed" });
  }
};
exports.VerifyUser = async (req, res) => {
  try {
    const { username } = req.body;
console.log("email is printing",username)
    let validUser =await User.findOne({ email:username });
    if(!validUser)  validUser =await User.findOne({ mobile:username });
    console.log(validUser)
    
    if (!validUser) {
      return res.status(200).json({ message: "user not validate" ,username:validUser});
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "user verify successfully",
        validuser: validUser
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      error: error,
      message: "user not verifyed successfully"
    });
  }
};
