import { Router } from "express"
import { createLike, deleteLike } from "../controllers/likes.controller"

const route = Router()

route.post('/', createLike)
route.delete('/', deleteLike)

export default route