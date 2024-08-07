import express from "express"
import { create, patch, remove,search,getPosts } from "../controllers/post.js"
import { parse } from "dotenv"


const router = express.Router()

router.get("/",getPosts)
router.post("/create",create)
router.post("/patch",patch)
router.post("/delete",remove)
router.post("/search",search)

export default router