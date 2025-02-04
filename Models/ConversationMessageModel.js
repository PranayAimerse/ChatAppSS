const mongoose = require("mongoose");
const crypto = require("crypto");
const ConversationMessageSchema = new mongoose.Schema(
  {
    token_conversation_message: {
      type: String,
      default: null
    },
    token_conversation:{
      type: String,
      default: null
    },
    token_user: {
      type: String,
      default: null
    },
    message: {
      type: String,
      default: null
    },
    is_read: {
      type: String,
      enum: ["yes", "no"],
      default: null
    }
  },
  { timestamps: true }
);
ConversationMessageSchema.pre("save", function (next) {
    if (!this.token_conversation_message) {
      this.token_conversation_message = crypto.randomBytes(6).toString("hex"); 
    }
    next();
  });

module.exports = mongoose.model(
  "ConversationMessage",
  ConversationMessageSchema
);
