import db from "../helpers/db.helper.js"

export const findAllUsers = async function (page, limit, search, sort, sortBy) {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 5
  search = search || ""
  sort = sort || "id"
  sortBy = sortBy || "ASC"

  const offset = (page - 1) * limit
  const query = `
    SELECT * FROM "users" WHERE "email" LIKE $3 ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2
    `

  const values = [limit, offset, `%${search}%`]
  const { rows } = await db.query(query, values)

  return rows
}

export const findOneUsers = async function (id) {
  const query = `
    SELECT "roleId" FROM "users" WHERE id=$1
    `

  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const makeAdmin = async function (id) {
  const query = `
  UPDATE "users" SET "roleId" = 1 WHERE id = id;
  `

  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const findOneUsersByEmail = async function (email) {
  const query = `
    SELECT * FROM "users" WHERE email=$1
    `

  const values = [email]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const insertUsers = async function (data) {
  const query = `
    INSERT INTO "users" ("email", "password", "phoneNumber", "roleId") 
    VALUES ($1, $2, $3, $4) RETURNING *
    `

  const values = [data.email, data.password, data.phoneNumber, data.roleId]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const updateUsers = async function (id, data) {
  const query = `
    UPDATE "users" 
    SET 
    "email"=COALESCE(NULLIF($2, ''), "email"), 
    "password"=COALESCE(NULLIF($3, ''), "password"),
    "phoneNumber"=COALESCE(NULLIF($4, ''), "phoneNumber"),
    "roleId"=COALESCE(NULLIF($5::INTEGER, NULL), "roleId")
    WHERE "id"=$1
    RETURNING *
    `

  const values = [id, data.email, data.password, data.phoneNumber, data.roleId]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const destroyUsers = async function (id) {
  const query = `
    DELETE FROM "users" 
    WHERE "id"=$1
    RETURNING *
    `

  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}
