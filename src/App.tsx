import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Quiz from "./pages/quiz";

function App() {
  return (
    <main className="h-screen bg-gradient-to-br from-q-primary to-q-secondary">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </main>
  );
}

export default App;
