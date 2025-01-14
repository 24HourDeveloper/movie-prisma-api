import { Request, Response } from "express"
import { prisma } from "../config/prisma.config"
import checkForLikedMovies from "../utils/checkForLikedMovies"
import { UserAndLikes } from "../utils/checkForLikedMovies"


export async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        res.json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}

export async function getUsersLikes(req: Request, res: Response) {
    const id = req.params.id
    let moviesObj: [] | UserAndLikes;

    try {
        const userLikes = await prisma.user.findUnique({
            where: {
                id: parseInt(id, 10)
            },
            include: {
                likes: {
                    select: {
                        movieId: true,
                    }
                }
            }
        })

        if (!userLikes) {
            moviesObj = []
        }else {
            moviesObj = await checkForLikedMovies(userLikes)
        }

        res.json(moviesObj)
    } catch (error) {
        res.status(400).json(error)
    }
}