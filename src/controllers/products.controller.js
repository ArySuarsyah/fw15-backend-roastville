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
      data.picture = req.file.path
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

export const updateProduct = async function (req, res) {
  try {
    console.log(req.user)
    if (req.user.role && req.user.role !== "superadmin") {
      throw Error(" only_admin_can_edit ")
    }
    const data = {
      ...req.body,
    }
    data.picture = req.file.path

    const product = await ProductModel.updateDetailProduct(req.params.id, data)
    if (product) {
      return res.json({
        success: true,
        message: "update_product_successfully! ",
        results: product,
      })
    }
    throw Error("update_product_failed! ")
  } catch (err) {


    return errorHandler(res, err)
  }
}


export const findOneProduct = async function (req, res) {
  try {
    const {data} ={
      ...req.body,
    }
    const product = await ProductModel.findOne(req.params.id, data)
    if(product){
      return res.json({
        success: true,
        message: "Get product detail",
        results: product
      })
    }else{
        return res.status(404).json({
          success:false,
          message:"not found"
        })
      }
  } catch (err) {

    return errorHandler(res, err)
  }
}
