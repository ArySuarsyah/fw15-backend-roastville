import errorHandler from "../helpers/error-handler.js"
import fileRemover from "../middlewares/file-remover.js"
import { findAll, findOneByUserId, findOne, updateByUserId } from "../models/profile.model.js"
import { updateUsers } from "../models/users.model.js"

export const getProfile = async function (req, res) {
  try {
    const data = await findAll(
      req.query.page,
      req.query.limit,
      req.query.search,
      req.query.sort,
      req.query.sortBy
    )
    return res.json({
      success: true,
      message: "Get profile successfully",
      results: data
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}


export const getProfileByUser = async function (req, res) {
  try {
    console.log(req.user)
    const { id } = req.user
    const profile = await findOneByUserId(id)
    if (!profile) {
      throw Error("profile_not_found!")
    }
    return res.json({
      success: true,
      message: "Profile",
      results: profile
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
        message: "Parameter id must be number!"
      })
    }
    const data = await findOne(req.params.id)
    if (data) {
      return res.json({
        success: true,
        message: "Detail Profile",
        results: data
      })
    }
    else {
      return res.status(404).json({
        success: false,
        message: "Error : Data not found",
        results: data
      })
    }

  } catch (error) {
    console.log(error)
    return errorHandler(res, error)

  }
}

export const updateProfile = async function (req, res) {
  try {
    const { id } = req.user
    const userData = {
      email: req.body.email,
      phoneNumber: req.body.phoneNumber
    }
    const userById = await findOneByUserId(id)
    const data = {
      ...req.body
    }
    if (req.file) {
      if (userById.picture) {
        // fileRemover({ filename: user.picture })
      }
      data.picture = req.file.path
    }
    await updateUsers(id, userData)
    const profile = await updateByUserId(id, data)
    if (!profile) {
      throw Error("Update_profile_failed")
    }
    return res.json({
      success: true,
      message: "Profile Updated",
      results: profile 

    })

  } catch (err) {
    return errorHandler(res, err)
  }
}
