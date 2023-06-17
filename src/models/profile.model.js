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
