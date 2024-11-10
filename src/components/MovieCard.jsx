import PropTypes from "prop-types";
import { Box, Card, CardMedia, Chip, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { getGenreList } from "../api";
import { useEffect, useState } from "react";

const MovieCard = ({ title, image, rating, genreId }) => {
  const [genreList, setGenreList] = useState([]);

  const genreNames = genreId
    .map((id) => {
      const genre = genreList.find((genre) => genre.id === id);
      return genre ? genre.name : null;
    })
    .filter((name) => name !== null);

  const genreColors = {
    Action: "#8B0000", // Dark Red
    Adventure: "#8B4513", // SaddleBrown
    Animation: "#556B2F", // DarkOliveGreen
    Comedy: "#8B8B00", // DarkGoldenRod
    Crime: "#4B0082", // Indigo
    Documentary: "#2F4F4F", // DarkSlateGray
    Drama: "#A52A2A", // Brown
    Family: "#4682B4", // SteelBlue
    Fantasy: "#6A5ACD", // SlateBlue
    History: "#8B4513", // SaddleBrown
    Horror: "#2E2E2E", // Darker Gray
    Music: "#483D8B", // DarkSlateBlue
    Mystery: "#696969", // DimGray
    Romance: "#800000", // Maroon
    "Science Fiction": "#008080", // Teal
    "TV Movie": "#4B0082", // Indigo
    Thriller: "#2C3539", // Gunmetal
    War: "#3B3B3B", // Dark Gray
    Western: "#5C4033", // Dark Brown
  };

  useEffect(() => {
    const fetchGenreMovie = async () => {
      const genreData = await getGenreList();
      setGenreList(genreData);
    };
    fetchGenreMovie();
  }, []);

  return (
    <Card
      sx={{
        height: 343,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        "&:hover .overlay": {
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Darken on hover
        },
        "&:hover .hover-content": {
          opacity: 1, // Show title and other hover content on hover
        },
      }}
    >
      <CardMedia
        component="img"
        image={`${import.meta.env.VITE_MOVIE_BASE_IMG}/${image}`} // URL gambar
        alt={title}
        className="media"
        sx={{ height: "100%", width: "100%" }}
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
          // opacity: 0,
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

// Menambahkan validasi prop-types
MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  genreId: PropTypes.object,
  image: PropTypes.string.isRequired,
};

export default MovieCard;
