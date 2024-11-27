import { useParams } from "react-router-dom";
import { getCredits, getDetailMovie } from "../api";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
  Backdrop,
  CircularProgress,
  Avatar,
  ListItem,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const DetailMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetailMoie = async () => {
      const detailMovie = await getDetailMovie(id);

      setMovie(detailMovie);
    };

    const fetchCredits = async () => {
      const listCredits = await getCredits(id);

      setCredits(listCredits);
      setIsLoading(false);
    };
    fetchDetailMoie();
    fetchCredits();
  }, []);

  // Format Date
  const date = new Date(movie.release_date);
  const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;
  const year = formattedDate.split("/")[2];

  console.log(credits.cast);

  return (
    <div>
      {isLoading ? (
        <Backdrop open={isLoading} sx={{ backgroundColor: "black" }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div>
          <Box
            sx={{
              position: "relative",
              paddingTop: "80px",
              backgroundImage: `url(${
                import.meta.env.VITE_MOVIE_BASE_IMG + movie?.backdrop_path
              })`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPositionX: "50%",
              backgroundPositiony: "50%",
              "::after": {
                content: '""', // Harus berupa string kosong
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.8)", // Layer transparan
                zIndex: 1,
              },
            }}
          >
            <Container sx={{ position: "relative", zIndex: 2 }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  borderRadius: 2,
                  backgroundColor: "transparent",
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    import.meta.env.VITE_MOVIE_BASE_IMG + movie.poster_path
                  }
                  alt="Breaking Bad Poster"
                  sx={{
                    alignSelf: "center",
                    maxWidth: "300px",
                    borderRadius: 2,
                  }}
                />
                <Box
                  sx={{
                    ml: 2,
                  }}
                >
                  {/* Title and Info */}
                  <CardContent>
                    <Typography variant="body1" fontWeight="bold">
                      {movie.title}{" "}
                      <span style={{ fontSize: "20px" }}>({year})</span>
                    </Typography>
                    <Typography variant="span">{formattedDate}</Typography>{" "}
                    <Typography variant="span">
                      {movie.genres?.map((genre) => genre.name).join(", ")}
                    </Typography>
                    {/* User Score */}
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ mt: 2 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          backgroundColor: "#46d369",
                        }}
                      >
                        <Typography variant="h6" fontWeight="bold">
                          {Math.ceil(movie.vote_average * 10)}%
                        </Typography>
                      </Box>
                      <Typography variant="body2">User Score</Typography>
                    </Stack>
                    {/* Overview */}
                    <Typography variant="body1" sx={{ mt: 3 }}>
                      Overview
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {movie.overview}
                    </Typography>
                  </CardContent>
                  {/* Button Section */}
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#E50914",
                        "&:hover": { backgroundColor: "#f40612" },
                      }}
                    >
                      Watch Now
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Container>
          </Box>
          <Container sx={{ overflow: "visible", position: "relative" }}>
            <ListItem sx={{ paddingY: 1 }}>
              <Swiper
                breakpoints={{
                  600: {
                    slidesPerView: 4,
                  },
                  900: {
                    slidesPerView: 7,
                    spaceBetween: 10,
                  },
                }}
                slidesPerView={1}
                mousewheel={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {credits.cast.map((cast, index) => (
                  <SwiperSlide key={index}>
                    <Avatar
                      src={
                        import.meta.env.VITE_MOVIE_BASE_IMG + cast.profile_path
                      }
                      alt={cast.name}
                      sx={{
                        md: { width: "100%" },
                        height: "200px",
                        width: "80%",
                        borderRadius: "10%",
                        objectFit: "cover",
                        margin: "0 auto",
                      }}
                    />
                    <CardContent>
                      <Typography variant="body2">{cast.name}</Typography>
                      <Typography variant="body2">{cast.character}</Typography>
                    </CardContent>
                  </SwiperSlide>
                ))}
              </Swiper>
            </ListItem>
          </Container>
        </div>
      )}
    </div>
  );
};
export default DetailMovie;
