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

export const findAllByUserId = async (userId) => {
  const query = `
  SELECT 
  "products"."id" as "id",
  "products"."picture" as "image",
  "products"."name",
  "transactionsStatus"."name" as "status",
  "users"."id" as "userId"
  FROM ${table} 
  JOIN "products" ON "products"."id" = ${table}."productId"
  JOIN "users" ON "users"."id" = ${table}."userId"
  JOIN "transactionsStatus" ON "transactionsStatus"."id" = ${table}."statusId"
  JOIN "paymentMethods" ON "paymentMethods"."id" = ${table}."paymentMethodId";
  WHERE "${table}"."userId"=$1
  `
  const values = [userId]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const insert = async (data, id) => {
  const query = `
  INSERT INTO ${table} 
  ("invoiceNum", "total", "items", "voucherId", "statusId", "paymentMethodId", "productId", "userId")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `
  const values = [
    data.invoiceNum,
    data.total,
    data.items,
    data.voucherId,
    data.statusId,
    data.paymentMethodId,
    data.productId,
    id,
  ]
  const { rows } = await db.query(query, values)
  return rows[0]
}
