import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Header } from "./layout/header";
import { Footer } from "./layout/footer";
import { Error } from "./pages/error";
import { useEffect } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Game } from "./pages/game/game";
import { useStore } from "./store/dataStore";

function App() {
  const fetchAllLanguages = useStore((state) => state.fetchAllLanguages);
  const fetchAllSnippets = useStore((state) => state.fetchAllSnippets);

  useEffect(() => {
    fetchAllLanguages();
    fetchAllSnippets();
  }, [fetchAllSnippets, fetchAllLanguages]);

  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
