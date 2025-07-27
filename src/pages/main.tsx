import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, ShoppingCart } from "lucide-react";
import blog1 from "../assets/blog1.jpg";
import blog2 from "../assets/blog2.avif";
import bgVideo from "../assets/bgvid.mp4";
import mark1 from "../assets/mark1.avif";
import mark2 from "../assets/mark2.avif";
import mark3 from "../assets/mark3.avif";
import mark4 from "../assets/mark4.avif";
import { products } from "../data/products";
import Nav from "../components/navbar";
import { Link } from "react-router-dom";
import shopim1 from '../assets/shopim1.webp';
import rosemaryOil from '../assets/product2/p1m1.jpg';
import brosseIon from '../assets/product3/p3im1.jpg';
import beforeImg from '../assets/Before.png';
import afterImg from '../assets/After.png';
import React, { useRef } from 'react';
import { colors } from '../config/colors';
import { fonts } from '../config/fonts';

export default function HeroSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const carouselProducts = products;
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % carouselProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselProducts.length, paused]);

  const goRight = () => {
    setCarouselIdx((prev) => (prev + 1) % carouselProducts.length);
    setPaused(true);
    // Pause auto-advance for 5 seconds after manual click
    setTimeout(() => setPaused(false), 5000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close cart on overlay click or Escape
  useEffect(() => {
    if (!cartOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [cartOpen]);

  const blogPosts = [
    {
      id: 1,
      title: t("blog1_title"),
      excerpt: t("blog1_excerpt"),
      image: blog1,
      date: "July 15, 2024",
      readTime: "3 min read",
      onClick: () => { window.scrollTo(0, 0); navigate("/blog"); },
    },

    {
      id: 3,
      title: "The Science Behind Heat-Free Styling",
      excerpt: "Explore how modern styling technology protects your hair while delivering professional results without damaging heat.",
      image: blog2, // You can use a new image if available
      date: "July 10, 2024",
      readTime: "5 min read",
      onClick: () => { window.scrollTo(0, 0); navigate("/blog-heatfree"); },
    },
  ];

  const addToCart = (product: { id: string }) => {
    setCart((prev) => prev.includes(product.id) ? prev : [...prev, product.id]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter(pid => pid !== id));
  };

  // Find product objects for items in cart
  const cartProducts = cart.map(id => products.find(p => p.id === id)).filter(Boolean);

  // Price logic for carousel card
  const currentProduct = carouselProducts[carouselIdx];
  let priceBlock = null;
  if (currentProduct.id === 'perlebrush') {
    priceBlock = (
      <div className="flex items-center gap-4 mb-4">
        <span className="text-lg text-gray-400 line-through">219.99$</span>
        <span className="text-2xl font-bold text-orange-600">119.99$ CAD</span>
      </div>
    );
  } else if (currentProduct.id === 'rosemary-elixir') {
    priceBlock = (
      <div className="flex items-center gap-4 mb-4">
        <span className="text-lg text-gray-400 line-through">44.99$</span>
        <span className="text-2xl font-bold text-orange-600">34.99$</span>
      </div>
    );
  } else if (currentProduct.id === 'heat-protection-spray') {
    priceBlock = (
      <div className="flex items-center gap-4 mb-4">
        <span className="text-lg text-gray-400 line-through">39.99$</span>
        <span className="text-2xl font-bold text-orange-600">29.99$</span>
      </div>
    );
  }

  const featuredProducts = [
    {
      name: 'AirStyler',
      image: shopim1,
      oldPrice: '219.99$ CAD',
      price: '119.99$ CAD',
      tag: 'Offre spéciale',
      orderPath: '/order/perlebrush',
    },
    {
      name: 'Rosemary Oil',
      image: rosemaryOil,
      oldPrice: '44.99$ CAD',
      price: '34.99$ CAD',
      tag: 'Offre spéciale',
      orderPath: '/order/rosemary-elixir',
    },
    {
      name: 'Hair Heat Protection Spray',
      image: brosseIon,
      oldPrice: '39.99$ CAD',
      price: '29.99$ CAD',
      tag: 'Offre spéciale',
      orderPath: '/order/heat-protection-spray',
    },
  ];

  return (
    <>
      {/* Simple Cart Sidebar with overlay */}
      {cartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-[9998]"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart overlay"
          />
          <div className="fixed top-0 right-0 h-full w-full max-w-xs sm:max-w-sm md:max-w-md bg-white z-[9999] p-0 flex flex-col border-l border-gray-200" role="dialog" aria-modal="true">
            <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-700 text-xl rounded-full p-1 transition"><span aria-hidden>×</span></button>
            </div>
            {cartProducts.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 text-gray-400">
                <ShoppingCart className="w-10 h-10 mb-3 opacity-60" />
                <p className="text-base">Your cart is empty.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-2 sm:gap-3">
                {cartProducts.map((prod) => (
                  <div key={prod!.id} className="flex flex-col sm:flex-row items-center gap-2 border-b border-gray-100 pb-2">
                    <img src={prod!.images[0]} alt={prod!.name} className="w-16 h-16 sm:w-12 sm:h-12 object-cover rounded border" />
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <div className="font-medium text-gray-900 truncate">{prod!.name}</div>
                      <div className="text-orange-600 font-bold text-base">{prod!.price}</div>
                    </div>
                    <div className="flex gap-1 mt-2 sm:mt-0">
                      <button
                        className="p-2 text-gray-400 hover:text-red-600 transition rounded"
                        aria-label="Remove from cart"
                        onClick={() => removeFromCart(prod!.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button
                        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-3 py-2 rounded transition-colors duration-200 text-xs flex items-center gap-1"
                        onClick={() => navigate(`/order/${prod!.id}`)}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      <Nav cartCount={cart.length} onCartClick={() => setCartOpen(true)} />
      <section className="relative w-full min-h-screen bg-black pt-16 sm:pt-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 flex flex-col justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 py-12 sm:py-24">
          <div className="absolute inset-0 bg-black/60 z-[-1]" />

          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
              <Trans
                i18nKey="hero_title"
                components={[<span className="italic" />, <br />, <span className="italic" />]}
              />
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex text-green-400 text-lg mr-2">
                <span>★★★★★</span>
              </div>
              <span className="text-white text-sm underline">
                {t("hero_reviews")}
              </span>
            </div>

            <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
              {t("hero_desc")}
            </p>

            <motion.button
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { window.scrollTo(0, 0); navigate(`/order/${products[0].id}`); }}
            >
              {t("shop_now")}
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <p className="text-gray-500 text-sm uppercase tracking-wider">
              {t("trusted_by")}
            </p>
          </div>
          <div className="flex justify-center items-center gap-6 flex-wrap px-4 sm:px-8">
            {[mark1, mark2, mark3, mark4].map((mark, i) => (
              <motion.img
                key={i}
                src={mark}
                alt={`Brand ${i + 1}`}
                className="h-10 sm:h-12 w-auto object-contain"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.08 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section
        className="py-10 px-2 sm:px-6 md:px-12 lg:px-24 bg-gray-50"
        onClick={() => {
          setPaused(true);
          goRight();
        }}
        style={{ cursor: 'pointer' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative flex flex-col items-start w-full">
              {/* AnimatePresence is removed as per the edit hint, but the component is still used. */}
                <motion.div
                  key={carouselProducts[carouselIdx].id + '-text'}
                  className="space-y-6 w-full"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  {carouselProducts[carouselIdx].id === 'rosemary-elixir' ? (
                    <>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t('rosemary_carousel_title')}</h2>
                      <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{t('rosemary_carousel_desc')}</p>
                      <div className="flex flex-wrap gap-4 items-center mt-2">
                        <div className="text-2xl font-bold text-orange-600">4.8/5</div>
                        <div className="text-yellow-400 text-xl">★★★★★</div>
                        <div className="text-gray-600 text-sm sm:text-base">{t("rating")}</div>
                      </div>
                    </>
                  ) : carouselProducts[carouselIdx].id === 'heat-protection-spray' ? (
                    <>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t('heatprotection_title', 'Heat Protection Spray')}</h2>
                      <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{t('heatprotection_desc')}</p>
                      <div className="flex flex-wrap gap-4 items-center mt-2">
                        <div className="text-2xl font-bold text-orange-600">4.8/5</div>
                        <div className="text-yellow-400 text-xl">★★★★★</div>
                        <div className="text-gray-600 text-sm sm:text-base">{t("rating")}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {t("revolutionize_title")}
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {t("revolutionize_desc1")}
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {t("revolutionize_desc2")}
                      </p>
                      <div className="flex flex-wrap gap-4 items-center">
                        <div className="text-2xl font-bold text-orange-600">4.8/5</div>
                        <div className="text-yellow-400 text-xl">★★★★★</div>
                        <div className="text-gray-600 text-sm sm:text-base">{t("rating")}</div>
                      </div>
                    </>
                  )}
                </motion.div>
            </div>
            <div className="relative flex flex-col items-center justify-center lg:justify-end w-full mt-8 lg:mt-0">
              {/* AnimatePresence is removed as per the edit hint, but the component is still used. */}
                <motion.div
                  key={carouselProducts[carouselIdx].id + '-card'}
                  className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 max-w-xs sm:max-w-sm md:max-w-md w-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/order/${carouselProducts[carouselIdx].id}`);
                  }}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -30 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <div className="aspect-square rounded-xl mb-4 overflow-hidden">
                    <img
                      src={carouselProducts[carouselIdx].images[0]}
                      alt={carouselProducts[carouselIdx].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{carouselProducts[carouselIdx].name}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('product_desc')}
                  </p>
                {priceBlock}
                  <button
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(carouselProducts[carouselIdx]);
                    }}
                  >
                    Add to Cart
                  </button>
                  <div className="text-center text-sm text-gray-500 mt-2">
                    {t('free_shipping')}
                  </div>
                </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Slider Section */}
      <BeforeAfterSlider before={beforeImg} after={afterImg} />

      {/* Product Cards Section - Stylists, Rosemary Oil, Last Product */}
      <section className="py-12 px-2 sm:px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Our products</h2>
          <div className="text-lg text-center text-gray-700 mb-8" style={{ fontFamily: fonts.sans }}>
            Take a look at our products and discover your new favorites.
        </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((prod, idx) => (
              <Link to={prod.orderPath} key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center border border-gray-100 relative transition-transform duration-200 hover:scale-105 group cursor-pointer">
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 group-hover:bg-orange-600 transition-colors">{prod.tag}</span>
                <img src={prod.image} alt={prod.name} className="w-full max-h-60 object-contain mx-auto" />
                <div className="w-full p-6 flex flex-col items-center">
                  <div className="text-lg font-semibold text-gray-900 mb-2 text-center">{prod.name}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400 line-through text-base">{prod.oldPrice}</span>
                    <span className="text-2xl font-bold text-orange-600">{prod.price}</span>
                  </div>
                </div>
              </Link>
            ))}
              </div>
        </div>
      </section>

      {/* OUR PACKS Section */}
      {/* Remove the section with heading {t('our_packs')} and its content (packs grid/cards) */}

      <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("beauty_insights")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("beauty_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 border border-gray-100"
                whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                onClick={post.onClick}
              >
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-orange-600 font-semibold group">
                    <span>{t("read_more")}</span>
                    <svg
                      className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

    
          <div className="text-center mt-6">
            <Link
              to="/blog-heatfree"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-colors duration-200 mb-4"
              style={{ textDecoration: 'none' }}
            >
              The Science Behind Heat-Free Styling
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50); // percent
  const dragging = useRef(false);

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let clientX = 0;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    } else if ('clientX' in e) {
      clientX = e.clientX;
    }
    let percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    setSliderPos(percent);
  };

  const startDrag = () => { dragging.current = true; };
  const stopDrag = () => { dragging.current = false; };

  React.useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      if ('touches' in e && (e as TouchEvent).touches.length > 0) {
        onDrag(e as any);
      } else if ('clientX' in e) {
        onDrag(e as any);
      }
    };
    const up = () => { dragging.current = false; };
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-10">
      <h2
        className="text-3xl md:text-4xl font-bold mb-6 text-center"
        style={{ color: '#111827', fontFamily: fonts.sans }}
      >
        Before and after using our products
      </h2>
      <div className="text-lg text-center text-gray-700 mb-8" style={{ fontFamily: fonts.sans }}>
        See the transformation our products can make for your hair.
      </div>
      <div className="w-full flex justify-center">
        <div
          ref={containerRef}
          className="relative w-full max-w-5xl h-[400px] rounded-xl overflow-hidden select-none"
          style={{ background: colors.background, touchAction: 'none', fontFamily: fonts.sans }}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          onMouseMove={dragging.current ? onDrag : undefined}
          onTouchMove={dragging.current ? onDrag : undefined}
          onMouseUp={stopDrag}
          onTouchEnd={stopDrag}
        >
          {/* Before image */}
          <div className="absolute inset-0 w-full h-full flex items-end justify-center p-0 m-0">
            <img
              src={before}
              alt="Before"
              className="max-w-[90%] max-h-[90%] w-auto h-auto object-contain object-bottom"
              style={{ fontFamily: fonts.sans }}
            />
          </div>
          {/* After image, clipped */}
          <div
            className="absolute inset-0 w-full h-full flex items-end justify-center p-0 m-0"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img
              src={after}
              alt="After"
              className="max-w-[90%] max-h-[90%] w-auto h-auto object-contain object-bottom"
              style={{ fontFamily: fonts.sans }}
            />
          </div>
          {/* Slider handle */}
          <div
            className="absolute top-0 left-0 h-full flex items-center justify-center"
            style={{ left: `calc(${sliderPos}% - 24px)` }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-4 border-white shadow-lg z-20"
              style={{ transform: 'translateX(-50%)', background: 'rgb(234 88 12 / var(--tw-bg-opacity, 1))' }}
              onMouseDown={startDrag}
              onTouchStart={startDrag}
            >
              <span className="text-white text-2xl" style={{ fontFamily: fonts.sans }}>&#8596;</span>
            </div>
          </div>
          {/* Labels */}
          <span
            className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded"
            style={{ background: colors.muted, fontFamily: fonts.sans }}
          >
            Après
          </span>
          <span
            className="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded"
            style={{ background: colors.muted, fontFamily: fonts.sans }}
          >
            Avant
          </span>
        </div>
      </div>
    </div>
  );
}
