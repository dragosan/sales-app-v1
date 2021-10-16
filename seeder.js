import dotenv from "dotenv"
import users from "./data/users.js"
import categs from "./data/categs.js"
import types from "./data/types.js"
import User from "./models/User.js"
import Vendor from "./models/Vendor.js"
import Item from "./models/Item.js"
import Purchase from "./models/Purchase.js"
import Categ from "./models/Categ.js"
import Type from "./models/Type.js"
import connectDB from "./config/db.js"

dotenv.config({ path: "./config/config.env" })
connectDB()

const importData = async () => {
  try {
    await Purchase.deleteMany()
    await Item.deleteMany()
    await Vendor.deleteMany()
    await Categ.deleteMany()
    await Type.deleteMany()
    await User.deleteMany()

    await User.insertMany(users)
    await Categ.insertMany(categs)
    await Type.insertMany(types)

    console.log("Data Imported Successfully!")
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Purchase.deleteMany()
    await Item.deleteMany()
    await Vendor.deleteMany()
    await Categ.deleteMany()
    await Type.deleteMany()
    await User.deleteMany()

    console.log("Data Destroyed Successfully!")
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
