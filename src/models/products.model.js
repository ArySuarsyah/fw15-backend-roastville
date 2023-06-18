import db from "../helpers/db.helper.js"

const table = "products"

export const findAllProduct = async function () {
  const query = `
  SELECT * FROM ${table}  
  `

  const values = []
  const { rows } = await db.query(query, values)
  return rows
}

export const insert = async function (data) {
  const query = `
  INSERT INTO ${table} ("picture", "name", "description", "variant")
  VALUES ($1, $2, $3, $4) RETURNING *
  `

  const values = [data.picture, data.name, data.description, data.variant]
  const { rows } = await db.query(query, values)
  return rows[0]
}
