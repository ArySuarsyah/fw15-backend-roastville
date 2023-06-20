import * as UsersModel from "../../models/users.model.js"
import * as ForgotRequest from "../../models/forgot-request.model.js"
import * as ProfileModel from "../../models/profile.model.js"
import argon from "argon2"
import jwt from "jsonwebtoken"
import errorHandler from "../../helpers/error-handler.js"

export const Login = async function (req, res) {
  try {
    const { email, password } = req.body
    const user = await UsersModel.findOneUsersByEmail(email)
    if (!user) {
      throw Error("auth_no_email")
    }
    const verify = await argon.verify(user.password, password)
    if (!verify) {
      throw Error("auth_wrong_password")
    }

    const token = jwt.sign({ id: user.id, role:user.roleId }, process.env.APP_SECRET)
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
    const customer = 2
    const hashedPassword = await argon.hash(password)
    const data = {
      ...req.body,
      roleId: customer,
      password: hashedPassword,
    }
    const user = await UsersModel.insertUsers(data)
    const profileData = {
      ...req.body,
      userId: user.id,
    }

    await ProfileModel.InsertProfile(profileData)
    const token = jwt.sign({ id: user.id, customer }, process.env.APP_SECRET)
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
    const user = await UsersModel.findOneUsersByEmail(email)

    if (!user) {
      throw Error("auth_no_user")
    }

    const findForgotReset = await ForgotRequest.findOneByEmail(email)
    if (findForgotReset) {
      throw Error("auth_forgot_password_duplicate")
    }

    const forgot = await ForgotRequest.insertForgotReq(email)

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
    const checkForgot = await ForgotRequest.findOneByEmail(email)

    const userNoRegisted = await UsersModel.findOneUsersByEmail(email)

    if (newPassword !== confirmPassword) {
      throw Error("auth_password_not_match")
    }
    if (!userNoRegisted) {
      throw Error("email_hasn't_registed")
    }
    if (!checkForgot) {
      throw Error("email_hasn't_forgot_request")
    }

    const selectedUser = await UsersModel.findOneUsersByEmail(email)
    const data = {
      password: await argon.hash(newPassword),
    }

    await UsersModel.updateUsers(selectedUser.id, data)

    await ForgotRequest.destroyForgotReq(email)
    return res.json({
      success: true,
      message: "Reset password successfully",
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
