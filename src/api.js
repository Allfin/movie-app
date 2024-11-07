import axios from "axios";

const baseUrl = import.meta.env.VITE_MOVIE_BASE_URL;
// const imgUrl = import.meta.env.VITE_MOVIE_BASE_IMG;
const header = import.meta.env.VITE_MOVIE_TOKEN;

export const getMovieList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/movie/popular?page=1`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${header}`,
      },
    });

    const data = await response.json();
    const movies = data.results.slice(0, 6);
    return movies;
  } catch (error) {
    console.log(error);
  }
};
