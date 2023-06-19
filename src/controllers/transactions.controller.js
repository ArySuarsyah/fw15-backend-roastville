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

    req.body.variant.forEach((code, varIndex) => {
      products.forEach((product, index) => {
        if (product.sku.code === code) {
          products[index].sku.reqQuantity = parseInt(
            req.body.quantity[varIndex]
          )
        }
      })
    })

    for (const product of products) {
      if (product.sku.reqQuantity > product.sku.quantity) {
        delete product.sku.reqQuantity
        return res.json({
          success: false,
          message: `Item is only ${product.sku.quantity} left`,
          results: product,
        })
      }
    }

    const nanoid = customAlphabet("1234567890", 10)
    const invoiceNum = `INV/RV/${moment().format("DDMMYYYY")}/${nanoid()}`

    const items = products.map((item) => ({
      id: item.id,
      name: item.name,
      picture: item.picture,
      price: item.sku.price,
      total: item.sku.price * item.sku.reqQuantity,
      code: item.sku.code,
      variant: item.sku.name,
      quantity: item.sku.reqQuantity,
    }))

    const total = items.reduce((prev, item) => prev + item.total, 0)
    const results = await transactionModel.insert({
      invoiceNum,
      total,
      items: JSON.stringify(items),
    })

    const uQty = products.reduce((prev, item) => {
      const calc = item.sku.quantity - item.sku.reqQuantity
      prev.push(calc)
      return prev
    }, [])

    let updateCount = 0
    for (const item of items) {
      await productModel.updateQty(item.id, item.code, uQty[updateCount])
      updateCount++
    }

    return res.json({
      success: true,
      message: "Get all transactions successfully",
      results,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
