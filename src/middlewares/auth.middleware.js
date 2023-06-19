import jwt from "jsonwebtoken"
import errorHandler from "../helpers/error-handler.js"
import { findOneUsersByRole } from "../models/users.model.js"

const APP_SECRET = process.env.APP_SECRET

export default async function authMiddleware(req, res, next) {
  try {
    const { authorization: auth } = req.headers
    if (!auth && !auth?.startsWith("Bearer ")) {
      throw Error("Unauthorized")
    }

    const token = auth.slice(7)
    const jwtDecodeResult = jwt.verify(token, APP_SECRET)
    const findOneReslut = await findOneUsersByRole(jwtDecodeResult.id)
    req.user = findOneReslut
    return next()
  } catch (err) {
    return errorHandler(res, err)
  }
}
