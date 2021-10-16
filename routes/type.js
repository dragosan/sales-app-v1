import express from "express"
import {
  createType,
  deleteType,
  getTypes,
} from "../controllers/typeController.js"

const router = express.Router()

router.route("/").get(getTypes).post(createType)
router.route("/:id").delete(deleteType)

export default router
