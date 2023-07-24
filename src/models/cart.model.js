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
  INSERT INTO ${table} ("name", "picture", "variant", "userId")
  VALUES ($1, $2, $3, $4) RETURNING *
  `

  const values = [data.name, data.picture, data.variant, id]
  const { rows } = await db.query(query, values)
  return rows
}
