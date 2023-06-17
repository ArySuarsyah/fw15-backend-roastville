import {
  findOneUsersByEmail,
  insertUsers,
  updateUsers,
} from "../../models/users.model.js"
import {
  destroyForgotReq,
  insertForgotReq,
} from "../../models/forgot-request.model.js"
import { InsertProfile } from "../../models/profile.model.js"
import argon from "argon2"
import jwt from "jsonwebtoken"
import errorHandler from "../../helpers/error-handler.js"

export const Login = async function (req, res) {
  try {
    const { email, password } = req.body
    const user = await findOneUsersByEmail(email)
    if (!user) {
      throw Error("auth_no_email")
    }
    const verify = await argon.verify(user.password, password)
    if (!verify) {
      throw Error("auth_wrong_password")
    }

    const token = jwt.sign({ id: user.id }, process.env.APP_SECRET)
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
    const hashedPassword = await argon.hash(password)
    const data = {
      ...req.body,
      password: hashedPassword,
    }
    const user = await insertUsers(data)
    const profileData = {
      ...req.body,
      userId: user.id,
    }

    await InsertProfile(profileData)
    const token = jwt.sign({ id: user.id }, process.env.APP_SECRET)
    return res.json({
      success: true,
      message: "Register success",
      results: { token },
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

export const ForgotPassword = async function (req, res) {
  try {
    const { email } = req.body
    const user = await findOneUsersByEmail(email)
    const forgot = await insertForgotReq(email)
    if (!user) {
      throw Error("auth_no_user")
    }

    if (!forgot) {
      throw Error("auth_forgot_password_failed")
    }
    return res.json({
      success: true,
      message: "Request reset password successfully",
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}

export const ResetPassword = async function (req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body

    if (newPassword !== confirmPassword) {
      throw Error("auth_password_not_match")
    }

    const selectedUser = await findOneUsersByEmail(email)
    const data = {
      password: await argon.hash(newPassword),
    }
    const user = await updateUsers(selectedUser.id, data)
    if (!user) {
      throw Error("auth_no_forgot_request")
    }
    await destroyForgotReq(email)
    return res.json({
      success: true,
      message: "Reset password successfully",
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
