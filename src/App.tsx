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
import AdminLogin from "./pages/admin-login";
import AdminDashboard from "./pages/admin-dashboard";
import TestOrder from "./pages/test-order";
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

function AppContent() {
  const location = useLocation();
  
  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/test-order';
  
  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Nav />}
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
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/test-order" element={<TestOrder />} />
        <Route path="*" element={<Main />} />
      </Routes>
      {!isAdminRoute && <Footer />}
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
