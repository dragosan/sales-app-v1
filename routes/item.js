import express from "express"
import {
  createItem,
  deleteItem,
  searchItems,
  getItem,
  getItems,
} from "../controllers/itemController.js"
import { admin, auth } from "../middleware/auth.js"

const router = express.Router()

router.route("/").get(getItems).post(auth, createItem)
router.route("/:id").get(getItem).delete(auth, admin, deleteItem)
router.route("/search").post(searchItems)

export default router
