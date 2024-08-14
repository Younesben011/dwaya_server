import express from "express"
import { create, patch, remove,search,getPosts } from "../controllers/post.js"
import { parse } from "dotenv"


const router = express.Router()

router.get("/",getPosts)
router.post("/create",isAuthenticated,create)
router.post("/patch",isAuthenticated,patch)
router.post("/delete",isAuthenticated,remove)
router.post("/search",search)
// ss
export default router