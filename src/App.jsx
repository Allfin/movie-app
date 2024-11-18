import Header from "./components/Header";
import "./App.css";
import HomeScreen from "./pages/HomeScreen";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <HomeScreen />
      </main>
    </>
  );
};
export default App;
