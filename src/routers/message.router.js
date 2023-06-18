import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js"
import * as MessageController from "../controllers/message.controller.js"

const MessageRouter = Router()

MessageRouter.get("/:id", MessageController.getAll)
MessageRouter.post("/", authMiddleware, MessageController.createMessage)

export default MessageRouter
