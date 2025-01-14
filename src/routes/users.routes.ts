import { Router } from "express"
import { createUser, getUsersLikes } from "../controllers/users.controller"

const router = Router()

router.post('/', createUser)
router.get('/:id/likes', getUsersLikes)

export default router