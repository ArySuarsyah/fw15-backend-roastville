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

export const findOneByCode = async (code) => {
  const query = `
  SELECT * FROM ${table} WHERE code=$1
  `
  const values = [code]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const insert = async (data) => {
  const query = `
  INSERT INTO ${table} (code, percentage, "maxAmount", name, description, "expiredIn") 
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
  `

  const values = [
    data.code,
    data.percentage,
    data.maxAmount,
    data.name,
    data.description,
    data.expiredIn,
  ]
  const { rows } = await db.query(query, values)
  return rows
}
