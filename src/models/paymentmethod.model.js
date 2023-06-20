import db from "../helpers/db.helper.js"

export const findAll = async function () {
  const query = `SELECT * FROM "paymentMethods"`

  const values = []
  const { rows } = await db.query(query, values)
  return rows
}
