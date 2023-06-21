import pkg from "pg"
import dotenv from "dotenv"
const { Pool } = pkg

dotenv.config({
  path: ".env",
})

const db = new Pool({
  connectionString:
    "postgres://postgres:qBDVW7CdPWIo5ruO@db.xiwcnuyypffnuococzkk.supabase.co/postgres?schema=public",
})

db.connect()
  .then(() => {
    console.log("Database Connected")
  })
  .catch((err) => {
    console.log(err)
  })

export default db
