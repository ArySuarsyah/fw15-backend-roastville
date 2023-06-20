import db from "../helpers/db.helper.js"

const table = "vouchers"

export const findAllVoucher = async function () {
  const query = `
  SELECT * FROM ${table}  
  `

  const values = []
  const { rows } = await db.query(query, values)
  return rows
}

export const findOneByCode = async (id) => {
  const query = `
  SELECT * FROM ${table} WHERE code=$1
  `
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}
