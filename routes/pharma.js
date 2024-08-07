import express from "express"
import {
  deletePharma,
  getPharmaPicture,
  getPharmas,
  updatePharma,
} from "../controllers/user.js"
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", getPharmas)
// router.delete("/", isAuthenticated, isAdmin, deletePharma)
router.post("/update", isAuthenticated, updatePharma)
router.get("/profile/picture", getPharmaPicture)

export default router
