import { fetchMovieById } from '../services/movies.service'

type UserLikes = ({
    id: number;
    name: string;
    email: string;
    likes: {
        movieId: string
    }[]
}) | null

export type MoviesLiked = {
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    runtime: number;
    status: string;
    release_date: string;
}[]

export type UserAndLikes = {
    name: string;
    email: string;
    likes: MoviesLiked
}

export default async function checkForLikedMovies(userLikes: UserLikes): Promise<[] | UserAndLikes>  {
    if (!userLikes) return []
    const movieIds = userLikes ? userLikes.likes.map(user => user.movieId) : []
    
    const moviePromises = movieIds.map(async(movieId) => {
        return await fetchMovieById(movieId)
    })
    
    const movies = await Promise.all(moviePromises)

    const moviesObj: MoviesLiked = movies.map(movie => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        runtime: movie.runtime,
        status: movie.status,
        release_date: movie.release_date,
        liked: true
    }))

    const userAndLikes = {
        name: userLikes.name,
        email: userLikes.email,
        likes: moviesObj
    }

    return userAndLikes
}