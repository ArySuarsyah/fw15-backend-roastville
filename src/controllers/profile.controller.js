import errorHandler from "../helpers/errorhandler.js"
import {findAll} from "../models/profile.model.js"

export default async function getProfile(req, res) {
  try {
    const data = await findAll(
      req.query.page,
      req.query.limit,
      req.query.search,
      req.query.sort,
      req.query.soryBy)
    return res.json({
      success: true,
      message: "Get profile successfully",
      results: data
    })

  } catch (err) {
    return errorHandler(res, err)
  }
}
