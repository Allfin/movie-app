import { useEffect } from "react";
import { getMovieList } from "../api";

const HomeScreen = () => {
  useEffect(() => {
    getMovieList();
  }, []);

  return <div>HomeScreen</div>;
};
export default HomeScreen;
