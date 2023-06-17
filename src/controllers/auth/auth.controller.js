import {
  findOneUsersByEmail,
  insertUsers,
  updateUsers,
} from "../../models/users.model.js"
import { InsertProfile } from "../../models/profile.model.js"
import {
  findOneByCodeAndEmail,
  findOneByCode,
  InsertForgotRequest,
  destroyForgot,
} from "../../models/forgotrequest.model.js"
import argon from "argon2"
import jwt from "jsonwebtoken"
import errorHandler from "../../helpers/errorhandler.js"

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
    if (!user) {
      throw Error("auth_no_user")
    }

    const randomNumber = Math.random()
    const rounded = Math.round(randomNumber * 100000)
    const padded = String(rounded).padEnd(6, "0")
    const forgot = await InsertForgotRequest({
      email: user.email,
      code: padded,
    })
    if (!forgot) {
      throw Error("auth_forgot_password_fail")
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
    const { code, email, password } = req.body
    const find = await findOneByCodeAndEmail(email, code)
    const checkCode = await findOneByCode(code)

    if (!checkCode) {
      throw Error("auth_code_invalid")
    }

    if (!find) {
      throw Error("auth_no_forgot_request")
    }
    const selectedUser = await findOneUsersByEmail(email)
    const data = {
      password: await argon.hash(password),
    }
    const user = await updateUsers(selectedUser.id, data)
    if (!user) {
      throw Error("auth_no_forgot_request")
    }
    await destroyForgot(find.id)
    return res.json({
      success: true,
      message: "Reset password successfully",
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
