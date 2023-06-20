import * as categoryModel from "../models/categories.model.js"
import errorHandler from "../helpers/error-handler.js"

export const getAllCategory = async (req, res) => {
  try {
    const data = { ...req.query }
    const { rows: category, pageInfo } = await categoryModel.findAll(data)
    if (!category) {
      throw Error("category_not_found")
    }
    return res.json({
      success: true,
      message: "Get all categories successfully",
      pageInfo,
      results: category,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}

export const createCategory = async (req, res) => {
  try {
    const data = { ...req.body }
    const category = await categoryModel.insertCategory(data)
    return res.json({
      success: true,
      message: "Add category successfully",
      results: category,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
