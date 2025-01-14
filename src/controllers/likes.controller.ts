import { Request, Response } from "express"
import { prisma } from "../config/prisma.config"

export async function createLike(req: Request, res: Response) {
    const { userId, movieId } = req.body

    try {
        const like = await prisma.like.create({
            data: {
                userId,
                movieId
            }
        })

        res.json(like)
    } catch (error) {
        res.status(400).json(error)
    }
}

export async function deleteLike(req: Request, res: Response) {
    const { userId, movieId } = req.body

    try {
        await prisma.like.deleteMany({
            where: {
                userId,
                movieId
            }
        })

        res.json({ message: "Like deleted" })
    } catch (error) {
        res.status(400).json(error)
    }
}