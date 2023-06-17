import db from "../helpers/db.helper.js"

export const InsertProfile = async function (data) {
  const query = `
  INSERT INTO "profile" ("userId", "firstName", "lastName", "address", "gender", "birthDate") 
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
  `

  const values = [
    data.userId,
    data.firstName,
    data.lastName,
    data.address,
    data.gender,
    data.birthDate,
  ]
  const { rows } = await db.query(query, values)
  return rows[0]
}


exports.findAll = async function (page, limit, search, sort, soryBy) {
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

exports.findOne = async function(id){
  const query = `
  SELECT * FROM "${table}"
  WHERE "id"=$1
  `
  const values = [id]
  const {rows} = await db.query(query, values)
  return rows[0]
}

