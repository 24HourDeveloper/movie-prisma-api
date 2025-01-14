import { Request, Response } from 'express'
import { prisma } from "../config/prisma.config"
import { fetchMovieById, fetchMovies, fetchMovieTrailers } from '../services/movies.service'

export async function getMovies(req: Request, res: Response) {
    const usersLikes = await prisma.user.findUnique({
        where: {
            id: 1
        },
        select: {
            likes: {
                select: {
                    movieId: true
                }
            }
        }
    })
    const page = typeof req.query.page === 'string' ? parseInt(req.query.page, 10) || 1 : 1

    try {
        const data = await fetchMovies(page)
        if (usersLikes) {
            const movieIds = usersLikes.likes.map((like: any) => parseInt(like.movieId))
            data.results.forEach((movie: any) => movieIds.includes(movie.id) ? movie.liked = true : movie.liked = false)
        }
        res.json(data)
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error', error: error.message})
    }
}

export async function getMovieById(req: Request, res: Response) {
    const movieId = req.params.id
    try {
        const movie = await fetchMovieById(movieId)
        res.json(movie)
    } catch (error: any) {
        res.status(500).json({ message: 'Movie can not be retrieved.', error: error.message})
    }
}

export async function getMovieTrailers(req: Request, res: Response) {
    const movieId = req.params.id

    try {
        const trailers = await fetchMovieTrailers(movieId)
        res.json(trailers)
    } catch (error: any) {
        res.status(500).json({ message: 'Trailers can not be retrieved.', error: error.message})
    }
}