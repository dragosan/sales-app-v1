import express from "express"
import {
  createPurchase,
  getPurchases,
} from "../controllers/purchaseController.js"
import { admin, auth } from "../middleware/auth.js"

const router = express.Router()

router.route("/").get(auth, admin, getPurchases).post(createPurchase)

export default router
