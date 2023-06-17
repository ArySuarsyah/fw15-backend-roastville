import { body, validationResult } from "express-validator"
import { findOneUsersByEmail } from "../models/users.model.js"

const emailFormat = body("email").isEmail().withMessage("Email is invalid")
const checkPassword = body("password")
  .isLength({ min: 1 })
  .isStrongPassword()
  .withMessage(
    "Password must be strong, must include capital letters, numbers and symbols"
  )
const checkDuplicateEmail = body("email").custom(async (value) => {
  const email = await findOneUsersByEmail(value)
  if (email) {
    throw new Error("Email is already in use")
  }
})
const checkDuplicatePass = body("confirmPassword").custom((value, { req }) => {
  return value === req.body.newPassword
})
const checkAuthPassword = body("newPassword")
  .isLength({ min: 1 })
  .isStrongPassword()
  .withMessage(
    "Password must be strong, must include capital letters, numbers and symbols"
  )

const isPhone = body("phoneNumber")
  .matches(/^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/)
  .withMessage("Invalid phone number")

const firstNameFormat = body("firstName")
  .optional()
  .isLength({ min: 3 })
  .withMessage("First name length is not valid, at least 3 characters")

const lastNameFormat = body("lastName")
  .optional()
  .isLength({ min: 3 })
  .withMessage("Last name length is not valid, at least 3 characters")

const displayNameFormat = body("displayName")
  .optional()
  .isLength({ min: 3 })
  .withMessage("Display name length is not valid, at least 3 characters")

const addressFormat = body("address")
  .optional()
  .isLength({ max: 255 })
  .withMessage("Address length is not valid, max 255 characters")

const genderFormat = body("gender")
  .optional()
  .notEmpty()
  .withMessage("Gender cannot be empty")

const birthDateFormat = body("birthDate")
  .optional()
  .isDate({ format: "DD-MM-YYYY" })
  .withMessage("Date format is not valid, use DD-MM-YYYY")

const rules = {
  authLogin: [emailFormat, checkPassword],
  authRegister: [emailFormat, checkPassword, checkDuplicateEmail, isPhone],
  authForgot: [emailFormat],
  authReset: [emailFormat, checkAuthPassword, checkDuplicatePass],
  updateProfile: [
    firstNameFormat,
    lastNameFormat,
    displayNameFormat,
    addressFormat,
    genderFormat,
    birthDateFormat,
  ],
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
