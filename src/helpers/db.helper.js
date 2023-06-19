import pkg from "pg"
import dotenv from "dotenv"
const { Pool } = pkg

dotenv.config({
  path: ".env",
})

const db = new Pool({
  connectionString: process.env.DATABASE,
})

db.connect()
  .then(() => {
    console.log("Database Connected")
  })
  .catch((err) => {
    console.log(err)
  })

export default db
