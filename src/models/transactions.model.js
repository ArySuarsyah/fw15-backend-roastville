import db from "../helpers/db.helper.js"

const table = "transactions"

export const findAll = async () => {
  const query = `
  SELECT * FROM ${table}
  `
  const values = []
  const { rows } = await db.query(query, values)
  return rows
}

export const insert = async (data) => {
  const query = `
  INSERT INTO ${table} ("invoiceNum", "total", "items", "voucherId")
  VALUES ($1, $2, $3, $4) RETURNING *
  `
  const values = [data.invoiceNum, data.total, data.items, data.voucherId]
  const { rows } = await db.query(query, values)
  return rows[0]
}
