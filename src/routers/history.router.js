import { Router } from "express"
import * as historyController from "../controllers/history.controller.js"

const historyRouter = Router()

historyRouter.get("/", historyController.getAllHistory)
historyRouter.post("/", historyController.makeHistory)

export default historyRouter
