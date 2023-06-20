import db from "../helpers/db.helper.js"

const table = "delivery"

export const findAllDelivery = async () => {
  const query = `
  SELECT * FROM ${table}  
  `

  const values = []
  const { rows } = await db.query(query, values)
  return rows
}
