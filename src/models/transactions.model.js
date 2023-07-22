import db from "../helpers/db.helper.js"

const table = "transactions"

export const findAll = async () => {
  const query = `
  SELECT * FROM ${table}
  `
  const values = []
  const { rows } = await db.query(query, values)
  return rows
}

export const findMyTransactions = async (id) => {
  const query = `
  SELECT * FROM ${table} WHERE "userId" = $1
  `
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows
}

export const findAllByUserId = async (userId) => {
  const query = `
  SELECT 
  "products"."id" as "productId",
  "users"."id" as "userId",
  "products"."name",
  "${table}"."createdAt",
  "${table}"."updatedAt"
  FROM "${table}" 
  JOIN "products" ON "products"."id" = "${table}"."productId"
  JOIN "users" ON "users"."id" = "${table}"."userId"
  JOIN "transactionStatus" ON "transactionStatus"."id" = "${table}"."statusId"
  JOIN "paymentMethods" ON "paymentMethods"."id" = "${table}"."paymentMethodId"
  WHERE "${table}"."userId"=$1
  `
  const values = [userId]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const insert = async (data, id) => {
  const query = `
  INSERT INTO ${table} ("invoiceNum", "total", "items", "voucherId", "userId")
  VALUES ($1, $2, $3, $4, $5) RETURNING *
  `
  const values = [data.invoiceNum, data.total, data.items, data.voucherId, id]
  const { rows } = await db.query(query, values)
  return rows[0]
}
