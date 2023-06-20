import * as ProfileModel from "../models/profile.model.js"
import * as UsersModel from "../models/users.model.js"
import errorHandler from "../helpers/error-handler.js"
import { limits } from "argon2"

export const getProfile = async function (req, res) {
  try {
    const data = await ProfileModel.findAll(
      req.query.page,
      req.query.limit,
      req.query.search,
      req.query.sort,
      req.query.sortBy
    )
    return res.json({
      success: true,
      message: "Get profile successfully",
      results: data,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}

export const getProfileByUser = async function (req, res) {
  try {
    const { id } = req.user
    const profile = await ProfileModel.findOneByUserId(id)
    if (!profile) {
      throw Error("profile_not_found!")
    }
    return res.json({
      success: true,
      message: "Profile",
      results: profile,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}

export const findOneProfile = async function (req, res) {
  try {
    if (isNaN(req.params.id) && parseInt(req.params.id) !== req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Parameter id must be number!",
      })
    }
    const data = await ProfileModel.findOne(req.params.id)
    if (data) {
      return res.json({
        success: true,
        message: "Detail Profile",
        results: data,
      })
    } else {
      return res.status(404).json({
        success: false,
        message: "Error : Data not found",
        results: data,
      })
    }
  } catch (error) {
    return errorHandler(res, error)
  }
}

export const updateProfile = async function (req, res) {
  try {
    const { id } = req.user
    const userData = {
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    }
    const userById = await ProfileModel.findOneByUserId(id)
    const data = {
      ...req.body,
    }
    if (req.file) {
      if (userById.picture) {
        // fileRemover({ filename: user.picture })
      }
      const fileSizeInBytes = req.file.size
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024)
      if (fileSizeInMB > limits) {
        return res.status(400).json({
          success: false,
          message: "File is too large!",
        })
      }
      data.picture = req.file.path
    }
    await UsersModel.updateUsers(id, userData)
    const profile = await ProfileModel.updateByUserId(id, data)
    if (!profile) {
      throw Error("Update_profile_failed")
    }
    return res.json({
      success: true,
      message: "Profile Updated",
      results: profile,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
