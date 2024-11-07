import Header from "./Components/Header";
import "./App.css";
import { Container } from "@mui/material";
import HomeScreen from "./Screens/HomeScreen";

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
