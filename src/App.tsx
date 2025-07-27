import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/navbar";
import Main from "./pages/main";
import Footer from "./components/footer";
import Order from "./pages/order";
import Blog from "./pages/blog"; 
import ContactForm from "./pages/contact";
import HairCare from "./pages/haircare";
import OrderPackEssentiel from './pages/order-pack-essentiel';
import OrderPackSoinComplet from './pages/order-pack-soin-complet';
import OrderPackPremiumTotal from './pages/order-pack-premium-total';
import BlogHeatFreePage from "./pages/blog-heatfree";
import OurPacks from "./pages/ourpacks";
import { Toaster } from "react-hot-toast";
import { products } from "./data/products";


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/order/:productId" element={<Order />} />
        <Route path="/order" element={<Navigate to={`/order/${products[0].id}`} replace />} />
        <Route path="/order/pack-essentiel" element={<OrderPackEssentiel />} />
        <Route path="/order/pack-soin-complet" element={<OrderPackSoinComplet />} />
        <Route path="/order/pack-premium-total" element={<OrderPackPremiumTotal />} />
        <Route path="/haircare" element={<HairCare />} />
        <Route path="/blog" element={<Blog />} /> 
        <Route path="/blog-heatfree" element={<BlogHeatFreePage />} /> {/* NEW: Heat-Free Styling Blog Page */}
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/ourpacks" element={<OurPacks />} />
        <Route path="*" element={<Main />} />
      </Routes>
      <Footer />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    </Router>
  );
}

export default App;
