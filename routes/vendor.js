import express from "express"

import {
  createVendor,
  deleteVendor,
  getVendors,
} from "../controllers/vendorController.js"

const router = express.Router()

router.route("/").get(getVendors).post(createVendor)
router.route("/:id").delete(deleteVendor)

export default router
