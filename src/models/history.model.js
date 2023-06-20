import db from "../helpers/db.helper.js"

export const getHistory = async (id) => {
  const query = `
    SELECT * FROM "history" WHERE "userId" = $1
    `
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows
}

export const makeHistory = async (id, data) => {
  const query = `
    INSERT INTO "history" 
    ("userid", "name", "price") 
    VALUES ($1, $2, $3) RETURNING *
    `

  const values = [id, data.name, data.price]
  const { rows } = await db.query(query, values)
  return rows[0]
}
