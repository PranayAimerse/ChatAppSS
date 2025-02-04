const mongoose = require("mongoose");

const ConversationMessageReadHistorySchema = new mongoose.Schema(
  {


    token_conversation_message_read_history:{
      type:String,
      default:null

    },
    token_conversation_message: {
      type: String,
      default: null
    },

    token_user: {
      type: String,
      default: null
    },
 
    read_on: {
      type: String,
      enum: ["yes", "no"],
      default: null
    }
  },
  { timestamps: true }
);
ConversationMessageReadHistorySchema.pre("save", function (next) {
  if (!this.token_conversation_message_read_history) {
    this.token_conversation_message_read_history = crypto.randomBytes(6).toString("hex"); 
  }
  next();
});

module.exports = mongoose.model(
  "ConversationMessageReadHistory",
  ConversationMessageReadHistorySchema
);
