import { body, param, query, validationResult } from "express-validator"
import { findOneUsersByEmail } from "../models/users.model.js"

const emailFormat = body("email").isEmail().withMessage("Email is invalid")
const checkPassword = body("password")
  .isLength({ min: 1 })
  .isStrongPassword()
  .withMessage("Password is invalid")
const checkDuplicateEmail = body("email").custom(async (value) => {
  const email = await findOneUsersByEmail(value)
  if (email) {
    throw new Error("Email is already in use")
  }
})
const checkDuplicatePass = body("confirmPassword").custom((value, { req }) => {
  return value === req.body.newPassword
})

const rules = {
  authLogin: [emailFormat, checkPassword],
  authRegister: [emailFormat, checkPassword, checkDuplicateEmail],
  authForgot: [emailFormat],
  authReset: [emailFormat, checkDuplicatePass],
}

const validator = (req, res, next) => {
  const errors = validationResult(req)
  try {
    if (!errors.isEmpty()) {
      throw Error("Validation rules")
    }
    return next()
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      results: errors.array(),
    })
  }
}

export const validate = (selectedrules) => [rules[selectedrules], validator]
