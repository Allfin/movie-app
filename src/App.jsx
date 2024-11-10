import Header from "./components/Header";
import "./App.css";
import { Container } from "@mui/material";
import HomeScreen from "./pages/HomeScreen";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <HomeScreen />
        </Container>
      </main>
    </>
  );
};
export default App;
