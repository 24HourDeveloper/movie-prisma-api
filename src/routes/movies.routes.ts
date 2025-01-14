import { Router } from "express"
import { getMovieById, getMovies, getMovieTrailers } from "../controllers/movies.controller"

const router = Router()

router.get('/', getMovies)
router.get('/:id', getMovieById)
router.get('/:id/trailers', getMovieTrailers)   

export default router