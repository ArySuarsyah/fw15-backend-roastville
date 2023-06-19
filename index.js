import express from "express"
import "dotenv/config"
import cors from "cors"
import routes from "./src/routers/index.js"
import morgan from "morgan"

const app = express()
const PORT = process.env.PORT || 8080

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
)
app.use(express.urlencoded({ extended: false }))
app.use(morgan("dev"))
app.use("/", routes)
app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`)
})
