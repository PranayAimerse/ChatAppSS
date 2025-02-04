const ConversationMessage = require("../Models/ConversationMessageModel");
const Conversation = require("../Models/ConversationModel");
const UserLoginHistory=require("../Models/UserLoginHistoryModel")

exports. StartConversationMessage = async (req, res) => {
    try {
        let {  token_user_login_history,token_user, message } = req.body;
       if(!token_user_login_history)
        if (!token_user){
            return res.status(404).json({ error: "token_user(reciver) Required" });
        }else if(!message){
            return res.status(404).json({ error: "message Required" });
        }

        const sender=await UserLoginHistory.find(token_user_login_history)
        if(!sender){
            return response.status(400).json({message:"sender user not found on that login history token"})
        }
        let conversation;
            conversation = new Conversation({
                
                date_start: new Date(),
                status: "active",
                count_user: 1
            });

            await conversation.save();
        

            if (!conversation.count_user.includes(1)) {
                conversation.count_user.push(1);
            }

            await conversation.save();
        


        
        const newMessage = new ConversationMessage({
            token_conversation:conversation.token_conversation,
            token_user:sender.token_user_login_history,
            message:message,
            is_read: "no",
           
        });

        await newMessage.save();

        return res.status(201).json({ success: true,  message:"conversation message Created ",data: newMessage });
    } catch (error) {
        console.error("Error creating message:", error);
        return res.status(500).json({ error: "Erro in  Createing the message" });
    }
};


