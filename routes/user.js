import express from "express"

import {
  authUser,
  createUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/userController.js"
import { admin, auth } from "../middleware/auth.js"

const router = express.Router()

router.route("/").get(getUsers).post(auth, createUser)
router.route("/login").post(authUser)
router.route("/:id").get(getUser).delete(auth, admin, deleteUser)

export default router
