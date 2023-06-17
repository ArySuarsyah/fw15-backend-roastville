import { Pool } from "pg"

const db = new Pool({
  connectionString: process.env.DATABASE,
})

async function connectToDatabase() {
  try {
    await db.connect()
    console.log("Database connected")
  } catch (error) {
    console.log("Failed to connect")
  }
}

connectToDatabase()

export default db
