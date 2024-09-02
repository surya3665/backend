const express = require("express")
const apiRouter = require("./routes")
require("dotenv").config()
const connectDB=require("./config/db")
const cookieParser = require("cookie-parser")
const app = express()
connectDB()
const PORT = process.env.PORT || 4000
app.use(cookieParser())
app.use(express.json())


app.use("/api", apiRouter)
app.listen(PORT,() => console.log(`server started ${PORT} port`))