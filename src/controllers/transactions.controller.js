import moment from "moment"
import errorHandler from "../helpers/error-handler.js"
import * as transactionModel from "../models/transactions.model.js"
import * as productModel from "../models/products.model.js"
import { customAlphabet } from "nanoid"

export const getAll = async (req, res) => {
  try {
    const transaction = await transactionModel.findAll()
    return res.json({
      success: true,
      message: "Get all transactions successfully",
      results: transaction,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}

export const makeTransaction = async (req, res) => {
  try {
    const products = await productModel.findOneByIdAndVariant(
      req.body.itemId,
      req.body.variant
    )
    let index = 0
    for (const qty of req.body.quantity) {
      const quantity = parseInt(qty)
      const product = products[index]
      if (quantity > product.sku.quantity) {
        return res.json({
          success: false,
          message: `Quantity is only ${product.sku.quantity} left`,
          results: product,
        })
      }
      products[index].sku.quantity = quantity
      index++
    }

    const nanoid = customAlphabet("1234567890", 10)
    const invoiceNum = `INV/RV/${moment().format("DDMMYYYY")}/${nanoid()}`

    const items = products.map((item) => ({
      name: item.name,
      picture: item.picture,
      price: item.sku.price,
      total: item.sku.price * item.sku.quantity,
      variant: item.sku.name,
      quantity: item.sku.quantity,
    }))

    const total = items.reduce((prev, item) => prev + item.total, 0)
    const results = await transactionModel.insert({
      invoiceNum,
      total,
      items: JSON.stringify(items),
    })

    return res.json({
      success: true,
      message: "Get all transactions successfully",
      results,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
