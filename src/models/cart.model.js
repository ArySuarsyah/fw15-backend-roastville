import db from "../helpers/db.helper.js"
const table = "cart"

export const getCart = async () => {
  const query = `
  SELECT * FROM ${table}
  `
  const values = []
  const { rows } = await db.query(query, values)
  return rows
}

export const insertCart = async (data, id) => {
  const query = `
  INSERT INTO ${table} ("productId", "userId")
  VALUES ($1, $2) RETURNING *
  `

  const values = [data.productId, id]
  const { rows } = await db.query(query, values)
  return rows
}
