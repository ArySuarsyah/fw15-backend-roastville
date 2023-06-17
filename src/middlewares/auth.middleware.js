import jwt from "jsonwebtoken"
import errorHandler from "../helpers/error-handler.js"

const APP_SECRET = process.env.APP_SECRET

export default function authMiddleware(req, res, next) {
  try {
    const { authorization: auth } = req.headers
    if (!auth && !auth?.startsWith("Bearer ")) {
      throw Error("Unauthorized")
    }

    const token = auth.slice(7)
    req.user = jwt.verify(token, APP_SECRET)
    return next()
  } catch (err) {
    return errorHandler(res, err)
  }
}
