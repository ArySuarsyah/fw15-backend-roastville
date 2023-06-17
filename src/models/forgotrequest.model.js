import db from "../helpers/db.helper.js"

export const findAll = async function (page, limit, search, sort, sortBy) {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 5
  search = search || ""
  sort = sort || "id"
  sortBy = sortBy || "ASC"

  const offset = (page - 1) * limit
  const query = `
    SELECT * FROM "forgotRequest" WHERE "email" LIKE $3 ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2
    `

  const values = [limit, offset, `%${search}%`]
  const { rows } = await db.query(query, values)

  return rows
}

export const findOneByCode = async function (code) {
  const query = `
    SELECT * FROM "forgotRequest" WHERE "code"=$1
    `

  const values = [code]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const findOneByEmail = async function (email) {
  const query = `
    SELECT * FROM "forgotRequest" WHERE "email"=$1
    `

  const values = [email]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const findOneByCodeAndEmail = async function (email, code) {
  const query = `
    SELECT * FROM "forgotRequest" WHERE "email"=$1 AND "code"=$2
    `

  const values = [email, code]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const InsertForgotRequest = async function (data) {
  const query = `
    INSERT INTO "forgotRequest" ("email", "code") 
    VALUES ($1, $2) RETURNING *
    `

  const values = [data.email, data.code]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const updateForgot = async function (id, data) {
  const query = `
    UPDATE "forgotRequest" 
    SET "email"=$2 "code"=$3
    WHERE "id" = $1
    RETURNING *
    `

  const values = [id, data.email, data.code]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const destroyForgot = async function (id) {
  const query = `
    DELETE FROM "forgotRequest" 
    WHERE "id"=$1
    RETURNING *
    `

  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}
