import errorHandler from "../helpers/errorhandler.js"

export default async function getProfile(req, res) {
  try {
    return res.json({
      success: true,
      message: "Get profile successfully",
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
