import db from "../helpers/db.helper.js"

const table = "products"

export const findAllProduct = async function (page, limit, search, category) {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 5
  search = search ? search.toLowerCase() : ""
  category = category ? category.toLowerCase() : ""

  const offset = (page - 1) * limit

  const query = `
  SELECT 
  "pr"."id",
  "c"."id",
  "c"."name",
  "pr"."name",
  "pr"."picture",
  "pr"."description",
  "pr"."createdAt",
  "pr"."updatedAt"
  FROM ${table} "pr"
  JOIN "categories" "c" ON "c"."id" = "pr"."categoryId"
  WHERE LOWER("pr"."name") LIKE $3 AND LOWER("c"."name") LIKE $4
  LIMIT $1 OFFSET $2
  `

  const values = [limit, offset, `%${search}%`, `%${category}%`]
  const { rows } = await db.query(query, values)
  return rows
}

export const findOne = async (id) => {
  const query = `
  SELECT 
  pr.id AS "productId",
  c.id AS "categoryId",
  c.name AS "categoryName",
  pr."name",
  pr."picture",
  pr."description",
  pr."variant",
  pr."createdAt",
  pr."updatedAt"
  FROM ${table} pr
  JOIN "categories" c ON c.id = pr."categoryId"
  WHERE pr."id"=$1
  `
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const findOneByIdAndVariant = async (id, code) => {
  const query = `
  SELECT 
  "id",
  "name",
  "picture",
  "description",
  "sku"
  FROM ${table}
  CROSS JOIN jsonb_array_elements("variant") AS "sku"
  WHERE "sku"->> 'code' = ANY($2) AND "id" = ANY($1);
  `
  const values = [id, code]
  const { rows } = await db.query(query, values)
  return rows
}

export const insert = async function (data) {
  const query = `
  INSERT INTO ${table} ("picture", "name", "description", "variant", "categoryId")
  VALUES ($1, $2, $3, $4, $5) RETURNING *
  `

  const values = [
    data.picture,
    data.name,
    data.description,
    data.variant,
    data.categoryId,
  ]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export async function updateDetailProduct(id, data) {
  const query = `
  UPDATE "${table}" SET 
  "name" = COALESCE(NULLIF($2, ''), "name"),
  "description" = COALESCE(NULLIF ($3, ''), "description")
  WHERE "id" = $1 RETURNING *
  `
  const values = [id, data.name, data.description]
  const { rows } = await db.query(query, values)
  return rows[0]
}

export const updateQty = async (id, code, qty) => {
  const query = `
  WITH product AS (
    SELECT ('{'||index-1||',quantity}')::TEXT[] AS path
    FROM ${table}, jsonb_array_elements(variant) WITH ordinality arr(sku, index)
    WHERE sku->> 'code' = $2 AND id = $1
  ) UPDATE ${table} SET variant = jsonb_set(variant, product.path, '${qty}', false) FROM product
  WHERE id = $1
  RETURNING *
  `
  const values = [id, code]
  const { rows } = await db.query(query, values)
  return rows[0]
}
