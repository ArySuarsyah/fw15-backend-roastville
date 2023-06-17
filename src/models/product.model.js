import db from "../helpers/db.helper.js"

export const findAllProduct = async function () {
  const query = `
  SELECT * FROM "products"  
  `

  const values = []
  const { rows } = await db.query(query, values)
  return rows
}
