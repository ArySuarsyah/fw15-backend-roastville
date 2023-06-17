import { findOneByEmail, insert } from "../../models/users.model"
import { insert } from "../../models/profile.model"
import argon from "argon2"
import jwt from "jsonwebtoken"
import errorHandler from "../../helpers/errorhandler"

export const Login = async function (req, res) {
  try {
    const { email, password } = req.body
    const user = await findOneByEmail(email)
    if (!user) {
      throw Error("No_email")
    }
    const verify = await argon.verify(user.password, password)
    if (!verify) {
      throw Error("wrong_password")
    }
    const token = jwt.sign({ id: user.id }, APP_SECRET)
    return res.json({
      success: true,
      message: "Login success!",
      results: { token },
    })
  } catch (e) {
    return errorHandler(res, e)
  }
}

export const Register = async function (req, res) {
  try {
    const password = req.body.password
    const checkEmail = await findOneByEmail(req.body.email)

    if (checkEmail) {
      throw Error("Email is already in use")
    }

    const hash = await argon.hash(password)
    const data = {
      ...req.body,
      password: hash,
    }
    const user = await insert(data)
    const profileData = {
      ...req.body,
    }
    await insert(profileData)
    const token = jwt.sign({ id: user.id }, APP_SECRET)
    return res.json({
      success: true,
      message: "Register success!, you'll be redirected in seconds",
      results: { token },
    })
  } catch (e) {
    errorHandler(res, e)
  }
}
