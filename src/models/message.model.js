import db from "../helpers/db.helper.js";
const table = "messages"

export const findAllByMessageId = async function (qs, articleId) {
  qs.page = parseInt(qs.page) || 1;
  qs.limit = parseInt(qs.limit) || 100;
  qs.sort = qs.sort || "id";
  qs.sortBy = qs.sortBy || "ASC";

  const offset = (qs.page - 1) * qs.limit;

  const countQuery = `
  SELECT COUNT(*)::INTEGER
  FROM "${table}"
  WHERE "messagesId"=$1`;

  const countvalues = [messagesId];
  const { rows: countRows } = await db.query(countQuery, countvalues);

  const query = `
  SELECT
  "ms"."id",
  "ms"."messagesId",
  "ms"."textMessage",
  "p"."picture",
  "p"."fullName",
  "ms"."createdAt",
  "ms"."updatedAt"
  FROM "${table}" "ms"
  JOIN "profile" AS "p" ON "p"."userId" = "ms"."userId"
  WHERE "messagesId"=$3
  ORDER BY ${qs.sort} ${qs.sortBy}
  LIMIT $1 OFFSET $2
  `;
  const values = [qs.limit, offset, messagesId,];
  const { rows } = await db.query(query, values);
  return {
      rows,
      pageInfo: {
          totalData: countRows[0].count,
          page: qs.page,
          limit: qs.limit,
          totalPage: Math.ceil(countRows[0].count / qs.limit),
      },
  };
};

export const insert = async function (data) {
  const query = `
  INSERT INTO "${table}" ("userId", "textMessage")
  VALUES ($1, $2) RETURNING *
  `;
  const values = [data.userId, data.textMessage];
  const { rows } = await db.query(query, values);
  return rows[0];
};
