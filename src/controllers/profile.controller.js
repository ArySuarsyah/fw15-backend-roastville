import errorHandler from "../helpers/error-handler.js"
import { findAll } from "../models/profile.model.js"

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
      results: data,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
