import path from "path"
import express from "express"
import dotenv from "dotenv"

import connectDB from "./config/db.js"
import user from "./routes/user.js"
import vendor from "./routes/vendor.js"
import categ from "./routes/categ.js"
import type from "./routes/type.js"
import item from "./routes/item.js"
import purchase from "./routes/purchase.js"
import { errorHandle, notFound } from "./middleware/errorHandle.js"

const app = express()
dotenv.config({ path: "./config/config.env" })

connectDB()
app.use(express.json())

//routes
app.use("/api/users", user)
app.use("/api/categs", categ)
app.use("/api/types", type)
app.use("/api/vendors", vendor)
app.use("/api/items", item)
app.use("/api/purchases", purchase)

const __direname = path.resolve()

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__direname, "/client/build")))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__direname, "client", "build", "index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("Api is running")
  })
}

//error handling
app.use(notFound)
app.use(errorHandle)

const port = process.env.PORT || 5000
app.listen(port, () =>
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`)
)
