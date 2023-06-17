exports.insert = async function (data) {
  const query = `
  INSERT INTO "profile" ("userId", "picture", "fullName", "phoneNumber", "gender", "profession", "nationality", "birthDate") 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `

  const values = [
    data.userId,
    data.picture,
    data.fullName,
    data.phoneNumber,
    data.gender,
    data.profession,
    data.nationality,
    data.birthDate,
  ]
  const { rows } = await db.query(query, values)
  return rows[0]
}
