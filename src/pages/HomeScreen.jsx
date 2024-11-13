import { useEffect, useState } from "react";
import { getGenreList, getPopularMovieList, getForMovies } from "../api";
import MovieCard from "../components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Box, Button, Stack, Typography } from "@mui/material";

const HomeScreen = () => {
  const [popularMovie, setPopularMovie] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [nowPlayingMovie, setNowPlayingMovie] = useState([]);
  const [tabActive, setTabActive] = useState("now_playing");

  useEffect(() => {
    const fetchPopularMovie = async () => {
      const popularMovieList = await getPopularMovieList();
      setPopularMovie(popularMovieList);
    };

    const fetchGenreMovie = async () => {
      const genreData = await getGenreList();
      setGenreList(genreData);
    };

    const fetchForMovies = async () => {
      const moviesCategories = await getForMovies("now_playing");
      setNowPlayingMovie(moviesCategories);
    };

    fetchPopularMovie();
    fetchGenreMovie();
    fetchForMovies();
  }, []);

  const handleTabsMovie = (movies) => {
    const fetchForMovies = async () => {
      const moviesCategories = await getForMovies(movies);

      setNowPlayingMovie(moviesCategories);
    };

    setTabActive(movies);
    fetchForMovies();
  };

  return (
    <>
      {/* Trending Movies */}
      <Typography variant="h2" sx={{ my: 2 }}>
        Popular Movies
      </Typography>
      <Swiper
        breakpoints={{
          600: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        spaceBetween={20}
        loop={true}
        mousewheel={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {popularMovie.map((movie, index) => (
          <SwiperSlide key={index}>
            <MovieCard
              title={movie.title}
              genreId={movie.genre_ids}
              image={movie.poster_path}
              rating={movie.vote_average}
              genreList={genreList}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        <Box sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography variant="h2" sx={{ my: 2 }}>
            Movies
          </Typography>

          <Box>
            <Stack direction="row" spacing={2} sx={{ my: 2 }}>
              <Button
                sx={{
                  color:
                    tabActive === "now_playing"
                      ? "rgb(220, 248, 54)"
                      : "rgb(171, 183, 196)",
                }}
                onClick={() => handleTabsMovie("now_playing")}
                variant="text"
              >
                #NOW PLAYING
              </Button>
              <Button
                sx={{
                  color:
                    tabActive === "top_rated"
                      ? "rgb(220, 248, 54)"
                      : "rgb(171, 183, 196)",
                }}
                onClick={() => handleTabsMovie("top_rated")}
                variant="text"
              >
                #TOP RATED
              </Button>
              <Button
                sx={{
                  color:
                    tabActive === "upcoming"
                      ? "rgb(220, 248, 54)"
                      : "rgb(171, 183, 196)",
                }}
                onClick={() => handleTabsMovie("upcoming")}
                variant="text"
              >
                #UPCOMING
              </Button>
            </Stack>
            <Swiper
              breakpoints={{
                600: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                900: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              spaceBetween={20}
              loop={true}
              mousewheel={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Autoplay]}
              className="mySwiper"
            >
              {nowPlayingMovie.map((movie, index) => (
                <SwiperSlide key={index}>
                  <MovieCard
                    mini={true}
                    title={movie.title}
                    genreId={movie.genre_ids}
                    image={movie.poster_path}
                    rating={movie.vote_average}
                    genreList={genreList}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>

          <Box>2</Box>
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "30%" } }}>3</Box>
      </Box>
    </>
  );
};
export default HomeScreen;
