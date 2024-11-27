import Header from "./components/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DetailMovie from "./pages/DetailMovie";

const App = () => {
  return (
    <>
      <main style={{ backgroundColor: "rgb(2, 13, 24)" }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<DetailMovie />} />
        </Routes>
      </main>
    </>
  );
};
export default App;
