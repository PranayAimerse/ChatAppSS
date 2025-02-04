const express = require("express");
const { register, Login, Logout,VerifyUser } = require("../Controllers/UserController");
const {StartConversationMessage} = require("../Controllers/ConversationMessageController");
const { VerifyJwt } = require("../middleware/AuthMiddleware");


const router = express.Router();

// user auth routes

router.post("/register", register);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/verifyUser",VerifyUser)
// conversation Message routes

router.post("/message", VerifyJwt,StartConversationMessage);

module.exports = { router };
