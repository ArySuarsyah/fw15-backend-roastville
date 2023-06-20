import db from "../helpers/db.helper.js"

const table = "profile"

export async function InsertProfile(data) {
  const query = `
  INSERT INTO "profile" ("picture","firstName", "lastName", "displayName", "address", "gender", "birthDate", "userId") 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `

  const values = [
    data.picture,
    data.firstName,
    data.lastName,
    data.displayName,
    data.address,
    data.gender,
    data.birthDate,
    data.userId
  ]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export async function findAll(page, limit, search, sort, sortBy) {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 5
  search = search || ""
  sort = sort || "id"
  sortBy = sortBy || "ASC"
  const offset = (page - 1) * limit

  const query = `
    SELECT * FROM "${table}" 
    ORDER BY "${sort}" ${sortBy} 
    LIMIT $1 OFFSET $2
  `

  const values = [limit, offset ]
  const { rows } = await db.query(query, values)
  return rows
}

export async function findOne(id) {
  const query = `
  SELECT * FROM "${table}"
  WHERE "id"=$1
  `
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}


export async function findOneByUserId(userId){
  
  const query = 
  `
  SELECT 
  "u"."id" AS "userId",
  "p"."picture",
  "p"."firstName",
  "p"."lastName",
  "p"."displayName",
  "u"."email",
  "u"."phoneNumber",
  "p"."address",
  "p"."gender",
  "p"."birthDate",
  "p"."createdAt",
  "p"."updatedAt",
  "r"."code" AS "role"
  FROM "${table}" "p"
  JOIN "users" "u" ON "u"."id" = "p"."userId"
  JOIN "role" "r" ON "r"."id" = "u"."roleId"
  WHERE "p"."userId"= $1
  `

  const values = [userId]
    const {rows} = await db.query(query, values)
    return rows[0]
}


export async function updateByUserId(userId, data) {
  const query =
    `
    UPDATE ${table} AS p
    SET
    "picture" = COALESCE(NULLIF($2, ''), "picture"),
    "displayName" = COALESCE(NULLIF($3, ''), "displayName"),
    "firstName" = COALESCE(NULLIF($4, ''), "firstName"),
    "lastName" = COALESCE(NULLIF($5, ''), "lastName"),
    "gender" = COALESCE(NULLIF($6::BOOLEAN, NULL), "gender"),
    "birthDate" = COALESCE(NULLIF($7::DATE, NULL), "birthDate"),
    "address" = COALESCE(NULLIF($8, ''), "address")
    FROM "users" AS u
    WHERE p."userId" = $1 AND u."id" = p."userId"
    RETURNING p.*, u."email", u."phoneNumber"
    `

  const values = [
    userId,
    data.picture,
    data.displayName,
    data.firstName,
    data.lastName,
    data.gender,
    data.birthDate,
    data.address
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
}


