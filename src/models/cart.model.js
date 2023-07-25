import db from "../helpers/db.helper.js"
const table = "cart"

export const getCart = async (id) => {
  const query = `
  SELECT
  "p"."id",
  "p"."name",
  "p"."picture",
  "p"."description"
  FROM ${table}
  JOIN "products" "p" ON "p"."id" = ${table}."productId"
  WHERE ${table}."userId" = $1;
  `
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows
}

export const getOneCart = async (data, id) => {
  const query = `
  SELECT * FROM ${table} WHERE "productId" = $1 AND "userId" = $2
  `
  const values = [data, id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const insertCart = async (data, id) => {
  const query = `
  INSERT INTO ${table} ("productId", "userId")
  VALUES ($1, $2) RETURNING *
  `

  const values = [data, id]
  const { rows } = await db.query(query, values)
  return rows
}

export const destroyCart = async (data, id) => {
  const query = `
  DELETE FROM ${table} WHERE "productId" = $1 AND "userId" = $2
  RETURNING *
  `

  const values = [data, id]
  const { rows } = await db.query(query, values)
  return rows
}
