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

export async function updateDetailProduct(id, data) {
  const query = 
  `
  UPDATE "${table}" SET 
  "name" = COALESCE(NULLIF($2, ''), "name"),
  "description" = COALESCE(NULLIF ($3, ''), "description")
  WHERE "id" = $1 RETURNING *
  `

  const values = [id, data.name, data.description]
  const { rows } = await db.query(query, values)
  return rows[0]
}
