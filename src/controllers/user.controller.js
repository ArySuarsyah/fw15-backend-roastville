import errorHandler from "../helpers/error-handler.js"
import * as UsersModel from "../models/users.model.js"

export async function getRoleId(req, res) {
  try {
    const { id } = req.user
    const data = await UsersModel.findOneUsers(id)
    let role
    if (data.roleId == 1) {
      role = "admin"
    } else if (data.roleId == 2) {
      role = "customer"
    }
    return res.json({
      success: true,
      message: role,
      results: data.roleId,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
