import { useEffect, useState } from "react";
import {
  getGenreList,
  getPopularMovieList,
  getForMovies,
  getTrendingPeople,
} from "../api";
import MovieCard from "../components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  Avatar,
  Box,
  Button,
  Container,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

const HomeScreen = () => {
  const [popularMovie, setPopularMovie] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [nowPlayingMovie, setNowPlayingMovie] = useState([]);
  const [tabActive, setTabActive] = useState("now_playing");
  const [spotlightPeople, setSpotlightPeople] = useState([]);

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

    const fetchTrendingPeople = async () => {
      const trendingPeople = await getTrendingPeople();
      setSpotlightPeople(trendingPeople);
    };

    fetchPopularMovie();
    fetchGenreMovie();
    fetchForMovies();
    fetchTrendingPeople();
  }, []);

  const handleTabsMovie = (movies) => {
    const fetchForMovies = async () => {
      const moviesCategories = await getForMovies(movies);

      setNowPlayingMovie(moviesCategories);
    };

    setTabActive(movies);
    fetchForMovies();
  };

  console.log(spotlightPeople);

  return (
    <>
      {/* Trending Movies */}
      <div
        style={{
          backgroundImage: `url("/images/slider-bg.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "50%",
          backgroundPositiony: "50%",
        }}
      >
        <Container sx={{ paddingTop: "80px", pb: 2 }}>
          <Typography variant="h2">Popular Movies</Typography>
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
        </Container>
      </div>

      <Box sx={{ backgroundColor: "#020D18", py: 2 }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              my: 2,
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "70%" }, mr: 5 }}>
              <Typography variant="h2">Movies</Typography>
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
            <Box sx={{ width: { xs: "100%", sm: "30%" } }}>
              <Typography variant="h2">SPOTLIGHT PEOPLE</Typography>
              <Box
                component="div"
                sx={{ borderBottom: "1px solid rgb(64, 82, 102)", my: 1 }}
              >
                {spotlightPeople.slice(0, 5).map((people, index) => (
                  <ListItem key={index} sx={{ paddingY: 1 }}>
                    <ListItemAvatar>
                      <Avatar
                        src={
                          import.meta.env.VITE_MOVIE_BASE_IMG +
                          people.profile_path
                        }
                        alt={people.name}
                        sx={{
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: "10%",
                          objectFit: "cover",
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography sx={{ color: "#FFFFFF", fontWeight: 500 }}>
                          {people.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          sx={{ color: "rgb(64, 82, 102)", fontSize: 14 }}
                        >
                          {people.known_for_department}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default HomeScreen;
