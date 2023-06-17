import pkg from "pg"
import dotenv from "dotenv"
const { Pool } = pkg

dotenv.config({
  path: ".env",
})

const db = new Pool({
  connectionString: process.env.DATABASE,
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
