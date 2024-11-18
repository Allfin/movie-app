import Header from "./components/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </main>
    </>
  );
};
export default App;
