import { useEffect, useState } from "react";
import { getPopularMovieList } from "../api";
// import Grid from "@mui/material/Grid2";
// import { Card, CardContent, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Typography } from "@mui/material";

const HomeScreen = () => {
  // const [trendingMovie, setTrendingMovie] = useState([]);
  const [popularMovie, setPopularMovie] = useState([]);

  useEffect(() => {
    const fetchPopularMovie = async () => {
      const popularMovieList = await getPopularMovieList();
      setPopularMovie(popularMovieList);
    };

    fetchPopularMovie();
  }, []);

  console.log({ popularMovie: popularMovie });

  return (
    <>
      <div className="trending">
        <Typography variant="h4" sx={{ my: 2 }}>
          Popular Movies
        </Typography>
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          loop={true}
          mousewheel={true}
          autoplay={{
            delay: 2500,
            // disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel, Pagination, Autoplay]}
          className="mySwiper"
        >
          {popularMovie.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard
                title={movie.title}
                genreId={movie.genre_ids}
                image={movie.poster_path}
                rating={movie.vote_average}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
export default HomeScreen;
