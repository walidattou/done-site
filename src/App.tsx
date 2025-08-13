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
import ErrorBoundary from "./components/ErrorBoundary";


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
        <Route path="/order/:productId" element={<ErrorBoundary><Order /></ErrorBoundary>} />
        <Route path="/order" element={<Navigate to={`/order/${products[0].id}`} replace />} />
        <Route path="/order/*" element={<Navigate to={`/order/${products[0].id}`} replace />} />
        <Route path="/test-route" element={<div className="pt-24 text-center">Test route working!</div>} />
        <Route path="/order/pack-essentiel" element={<ErrorBoundary><OrderPackEssentiel /></ErrorBoundary>} />
        <Route path="/order/pack-soin-complet" element={<ErrorBoundary><OrderPackSoinComplet /></ErrorBoundary>} />
        <Route path="/order/pack-premium-total" element={<ErrorBoundary><OrderPackPremiumTotal /></ErrorBoundary>} />
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
