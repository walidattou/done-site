import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/navbar";
import Main from "./pages/main";
import Footer from "./components/footer";
import Order from "./pages/order";
import Blog from "./pages/blog"; 
import ContactForm from "./pages/contact";
import { Toaster } from "react-hot-toast";
import { products } from "./data/products";


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/order/:productId" element={<Order />} />
        <Route path="/order" element={<Navigate to={`/order/${products[0].id}`} replace />} />
        <Route path="/blog" element={<Blog />} /> 
        <Route path="/contact" element={<ContactForm />} />
        <Route path="*" element={<Main />} />
      </Routes>
      <Footer />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    </Router>
  );
}

export default App;
