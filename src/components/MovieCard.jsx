import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { Box, Card, CardMedia, Chip, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const MovieCard = ({
  title,
  movieId,
  image,
  rating,
  genreId,
  genreList,
  mini,
}) => {
  const genreNames = genreId
    .map((id) => {
      const genre = genreList.find((genre) => genre.id === id);
      return genre ? genre.name : null;
    })
    .filter((name) => name !== null);

  const genreColors = {
    Action: "#8B0000",
    Adventure: "#8B4513",
    Animation: "#556B2F",
    Comedy: "#8B8B00",
    Crime: "#4B0082",
    Documentary: "#2F4F4F",
    Drama: "#A52A2A",
    Family: "#4682B4",
    Fantasy: "#6A5ACD",
    History: "#8B4513",
    Horror: "#2E2E2E",
    Music: "#483D8B",
    Mystery: "#696969",
    Romance: "#800000",
    "Science Fiction": "#008080",
    "TV Movie": "#4B0082",
    Thriller: "#2C3539",
    War: "#3B3B3B",
    Western: "#5C4033",
  };

  return (
    <Card
      component={RouterLink}
      to={`/movie/${movieId}`}
      sx={{
        height: mini ? "70" : "340",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        "&:hover .overlay": {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
        "&:hover .hover-content": {
          opacity: 1,
        },
      }}
    >
      <CardMedia
        component="img"
        image={`${import.meta.env.VITE_MOVIE_BASE_IMG}/${image}`} //
        alt={title}
        className="media"
      />
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          transition: "background-color 0.3s ease",
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "0",
          color: "#fff",
          zIndex: 2,
          padding: 2,

          transition: "opacity 0.3s ease",
        }}
        className="hover-content"
      >
        {genreNames.slice(0, 2).map((genre, index) => (
          <Chip
            label={genre}
            size="small"
            sx={{
              fontWeight: "bold",
              mb: 1,
              mr: 1,
              borderRadius: 1.5,
              py: 1,
              backgroundColor: genreColors[genre] || "#ffffff",
              color: "#ffffff",
            }}
            key={index}
          />
        ))}

        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          {title.toUpperCase()}
        </Typography>
        <Typography
          variant="p"
          fontWeight="bold"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <StarIcon sx={{ color: "yellow" }} /> {Math.round(rating * 10) / 10}
          <span style={{ fontSize: 10 }}>/ 10</span>
        </Typography>
      </Box>
    </Card>
  );
};

MovieCard.defaultProps = {
  mini: false,
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  movieId: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  genreId: PropTypes.object,
  genreList: PropTypes.object,
  image: PropTypes.string.isRequired,
  mini: PropTypes.bool,
};

export default MovieCard;
