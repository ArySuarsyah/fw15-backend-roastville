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
  (item->>'id')::integer AS id,
  item->>'name' AS name,
  "t"."total" AS price,
  item->>'picture' AS picture,
  "ts"."name" AS "status",
  "pm"."name" AS "paymentMethod"
  FROM "transactions" "t"
  JOIN "paymentMethods" "pm" ON "pm"."id" = "t"."paymentMethodId"
  JOIN "transactionsStatus" "ts" ON "t"."statusId" = "ts"."id", jsonb_array_elements(t.items) AS item
  WHERE "t"."userId" = $1;
  `
  const values = [userId]
  const { rows } = await db.query(query, values)
  return rows
}

export const insert = async (data, id) => {
  const query = `
  INSERT INTO ${table} 
  ("invoiceNum", "total", "items", "voucherId", "statusId", "paymentMethodId", "userId")
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `
  const values = [
    data.invoiceNum,
    data.total,
    data.items,
    data.voucherId,
    data.statusId,
    data.paymentMethodId,
    id,
  ]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const update = async (data, id) => {
  const query = `
  UPDATE ${table} 
  SET "statusId" = 2 WHERE "id" = $1 AND "userId" = $2
  RETURNING *
  `

  const values = [data, id]
  const { rows } = await db.query(query, values)
  return rows[0]
}
