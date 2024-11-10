import axios from "axios";

const baseUrl = import.meta.env.VITE_MOVIE_BASE_URL;
// const imgUrl = import.meta.env.VITE_MOVIE_BASE_IMG;
const token = import.meta.env.VITE_MOVIE_TOKEN;

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${token}`,
};

export const getPopularMovieList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/movie/upcoming?page=1`, {
      headers,
    });

    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getGenreList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/genre/movie/list`, {
      headers,
    });

    return response.data.genres;
  } catch (error) {
    console.log(error);
  }
};
