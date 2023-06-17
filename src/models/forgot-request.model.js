import db from "../helpers/db.helper.js"

const table = "forgot_request"

export const insertForgotReq = async function (data) {
  const query = `
    INSERT INTO "${table}" ("email") 
    VALUES ($1) RETURNING *
    `

  const values = [data]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const destroyForgotReq = async function (data) {
  const query = `
    DELETE FROM "${table}" WHERE "email"=$1 RETURNING *
    `

  const values = [data]
  const { rows } = await db.query(query, values)
  return rows[0]
}
