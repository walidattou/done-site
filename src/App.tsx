import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/navbar";
import Main from "./pages/main";
import Footer from "./components/footer";
import Order from "./pages/order";
import Blog from "./pages/blog"; // ✅ Capitalized import

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/order" element={<Order />} />
        <Route path="/blog" element={<Blog />} /> {/* ✅ Blog route added */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
