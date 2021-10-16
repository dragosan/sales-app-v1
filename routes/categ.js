import express from "express"
import {
  createCateg,
  deleteCateg,
  getCategs,
} from "../controllers/categController.js"

const router = express.Router()

router.route("/").get(getCategs).post(createCateg)
router.route("/:id").delete(deleteCateg)

export default router
