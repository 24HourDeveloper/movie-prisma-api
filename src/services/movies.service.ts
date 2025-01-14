const baseURL = process.env.MOVIE_API_URL
const apiKey = process.env.MOVIE_API_KEY

export async function fetchMovies(page: string | number): Promise<any> {
  const response = await fetch(`${baseURL}/now_playing?api_key=${apiKey}&language=en-US&page=${page}`)
  if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`)
  }
  return response.json()
}

export async function fetchMovieById(movieId: string): Promise<any> {
  const response = await fetch(`${baseURL}/${movieId}?api_key=${apiKey}&language=en-US`)
  if (!response.ok) {
    throw new Error(`Failed to fetch movie: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchMovieTrailers(movieId: string): Promise<any> {
  const response = await fetch(`${baseURL}/${movieId}/videos?api_key=${apiKey}&language=en-US`)
  if (!response.ok) {
    throw new Error(`Failed to fetch trailers: ${response.statusText}`);
  }
  return response.json()
}