import db from '../helpers/db.helper.js'

const table = "profile"

export async function insert(data) {
  const query = `
  INSERT INTO "profile" ("firstName", "lastName", "displayName", "address", "gender", "birthDate", "userId") 
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `
  
  const values = [
    data.firstName,
    data.lastName,
    data.displayName,
    data.address,
    data.gender,
    data.birthDate,
    data.userId,
  ]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export async function findAll(page, limit, search, sort, soryBy) {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 5
  search = search || ""
  sort = sort || "id"
  soryBy = soryBy || "ASC"
  const offset = (page - 1) * limit

  const query = `
    SELECT * FROM "${table}" 
    WHERE "fullName" LIKE $3 
    ORDER BY "${sort}" ${sortBy} 
    LIMIT $1 OFFSET $2
  `

  const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query, values)
    return rows
}

export async function findOne(id){
  const query = `
  SELECT * FROM "${table}"
  WHERE "id"=$1
  `
  const values = [id]
  const {rows} = await db.query(query, values)
  return rows[0]
}

