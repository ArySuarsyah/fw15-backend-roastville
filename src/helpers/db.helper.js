import pkg from "pg"
const { Pool } = pkg

const db = new Pool({
  connectionString:
    "postgres://postgres:1@127.0.0.1:5432/postgres?schema=public",
})

export const connectToDatabase = async function () {
  try {
    await db.connect()
    console.log("Database connected")
  } catch (error) {
    console.log("Failed to connect")
  }
}

export default db
