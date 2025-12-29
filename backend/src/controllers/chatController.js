import { chatWithContext } from "../services/chatService.js";

export const handleChat = async (req, res, next) => {
    try {
        const { message } = req.body;

        if (!message || message.trim().length === 0) {
            return res.status(400).json({
                status: "error",
                error: "Message is required"
            });
        }

        const chatResponse = await chatWithContext(message);

        res.json({
            status: "success",
            data: chatResponse
        });
    } catch (error) {
        next(error);
    }
};
