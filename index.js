import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import routes from "./src/routers/index.js"
import { connectToDatabase } from "./src/helpers/db.helper.js"

dotenv.config({
  path: ".env",
})

const app = express()
const PORT = process.env.PORT || 8080

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
)
app.use(express.urlencoded({ extended: false }))
app.use("/", routes)
app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`)
})
connectToDatabase()
