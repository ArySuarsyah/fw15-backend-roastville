import * as ProductModel from "../models/products.model.js"
import errorHandler from "../helpers/error-handler.js"

export const getAll = async function (req, res) {
  try {
    const product = await ProductModel.findAllProduct()
    return res.json({
      success: true,
      message: "Get all products successfully",
      results: product,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}

export const createProduct = async function (req, res) {
  try {
    const data = { ...req.body }
    if (req.file) {
      data.picture = req.file.filename
    }
    const product = await ProductModel.insert(data)
    return res.json({
      success: true,
      message: "Add products successfully",
      results: product,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
