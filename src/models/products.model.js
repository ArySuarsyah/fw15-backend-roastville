import db from "../helpers/db.helper.js"

const table = "products"

export const findAllProduct = async function () {
  const query = `
  SELECT * FROM ${table}  
  `

  const values = []
  const { rows } = await db.query(query, values)
  return rows
}

export const findOne = async (id) => {
  const query = `
  SELECT * FROM ${table} WHERE id=$1
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
  INSERT INTO ${table} ("picture", "name", "description", "variant")
  VALUES ($1, $2, $3, $4) RETURNING *
  `

  const values = [data.picture, data.name, data.description, data.variant]
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
