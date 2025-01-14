import { fetchMovies } from "./movies.service"

global.fetch = jest.fn()

describe('fetchMovies service', () => {
    afterEach(() => {
        jest.clearAllMocks() // Clear mocks between tests
    });
    
    it('should return an array of movies', async() => {
        const mockData = {
            results: [{ id: 1, title: 'Movie 1' }],
            total_results: 100,
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockData)
        })

        const movies = await fetchMovies(1)
        expect(movies).toEqual(mockData)
    })

    it('should throw an error if the api call fails', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            statusText: 'Internal Server Error'
        })
        await expect(fetchMovies(1)).rejects.toThrow('Failed to fetch movies: Internal Server Error')
    })
})