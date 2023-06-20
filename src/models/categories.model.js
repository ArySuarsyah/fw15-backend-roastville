import db from "../helpers/db.helper.js"

const table = "categories"

export const findAll = async (params) => {
  params.page = parseInt(params.page) || 1
  params.limit = parseInt(params.limit) || 5
  params.search = params.search || ""
  params.sort = params.sort || "id"
  params.sortBy = params.sortBy || "ASC"

  const offset = (params.page - 1) * params.limit

  const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM ${table}
    WHERE "name" ILIKE $1`

  const countvalues = [`%${params.search}%`]
  const { rows: countRows } = await db.query(countQuery, countvalues)

  const query = `
    SELECT
    "id",
    "name",
    "createdAt",
    "updatedAt"
    FROM ${table}
    WHERE "name" ILIKE $3
    ORDER BY ${params.sort} ${params.sortBy}
    LIMIT $1 OFFSET $2
    `
  const values = [params.limit, offset, `%${params.search}%`]
  const { rows } = await db.query(query, values)
  return {
    rows,
    pageInfo: {
      totalData: countRows[0].count,
      page: params.page,
      limit: params.limit,
      totalPage: Math.ceil(countRows[0].count / params.limit),
    },
  }
}

export const insertCategory = async (data) => {
  const query = `
  INSERT INTO ${table} ("name")
  VALUES ($1)
  RETURNING *`

  const values = [data.name]
  const { rows } = await db.query(query, values)
  return rows[0]
}
