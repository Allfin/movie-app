import axios from "axios";

const baseUrl = import.meta.env.VITE_MOVIE_BASE_URL;
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
    const response = await axios.get(`${baseUrl}/genre/movie/list?page=1`, {
      headers,
    });

    return response.data.genres;
  } catch (error) {
    console.log(error);
  }
};

export const getForMovies = async (movieCategories) => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/${movieCategories}?page=1`,
      {
        headers,
      }
    );

    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getTrendingPeople = async () => {
  try {
    const response = await axios.get(`${baseUrl}/trending/person/week?page=1`, {
      headers,
    });

    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailMovie = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/movie/${id}`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCredits = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/movie/${id}/credits`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
