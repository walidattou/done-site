import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Minus,
  Plus,
  Star,
  Shield,
  Truck,
  Sparkles,
  Flame as Fire,
} from "lucide-react";

import { useParams } from "react-router-dom";
import { products } from "../data/products";
import video1 from '../assets/videos/1sr.mp4';
import video2 from '../assets/videos/2nd.mp4';
import video3 from '../assets/videos/3rd.mp4';
import { AnimatePresence } from 'framer-motion';
import './order.css';

export default function OrderPage() {
  const { productId } = useParams();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [videoIdx, setVideoIdx] = useState(0);
  const videos = [video1, video2, video3];

  const product = products.find((p: any) => p.id === productId) || products[0]; // fallback to first product
  if (!product) return <div className="p-8 text-center text-xl">Product not found.</div>;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <motion.div
      className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8 pt-24 sm:pt-28"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <motion.div className="space-y-4" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}>
          <motion.div className="overflow-hidden border-2 border-orange-100 shadow-lg p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl product-image-container flex justify-center max-w-sm mx-auto" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}>
            <AnimatePresence mode="wait">
              <motion.img 
                key={selectedImage}
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-auto rounded-lg" 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </motion.div>
          <div className="flex flex-wrap gap-3 justify-center">
            {product.images.map((image: string, index: number) => (
              <motion.button key={index} onClick={() => setSelectedImage(index)} className={`w-20 h-20 overflow-hidden border-2 rounded-lg product-thumbnail ${selectedImage === index ? "border-orange-500 shadow-md" : "border-gray-200 hover:border-orange-300"}`} whileHover={{ scale: 1.07, borderColor: "#ea580c" }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
                <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Details Section */}
        <motion.div className="space-y-6" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}>
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <motion.h1 className="text-2xl sm:text-3xl font-bold text-black text-center lg:text-left" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}>{product.name}</motion.h1>
              <Sparkles className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />))}</div>
              <span className="text-sm text-gray-600">{t("order_reviews")}</span>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <span className="text-3xl font-bold text-black">{product.price}</span>
            <span className="text-xl text-gray-400 line-through">{product.oldPrice}</span>
            <span className="bg-orange-500 text-white px-3 py-1 text-sm rounded">{product.discount}</span>
          </div>

          {/* Product Description */}
          <div className="text-gray-700 text-base leading-relaxed mb-2 text-center lg:text-left">
            {Array.isArray(product.description)
              ? product.description.map((desc, idx) => (
                  <p key={idx} className="mb-1">{desc}</p>
                ))
              : <p>{product.description}</p>}
          </div>

          <motion.div className="bg-orange-100 border border-orange-200 p-4 rounded-xl text-center lg:text-left" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-orange-800">
              <Fire className="w-4 h-4" />
              <span className="font-medium">{t("order_limited_offer")}</span>
            </div>
            <p className="text-sm text-orange-700 mt-1">{t("order_free_shipping")}</p>
          </motion.div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 justify-center lg:justify-start">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>{t("order_secure_payment")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-500" />
              <span>{t("order_fast_delivery")}</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">{t("order_quantity")}</label>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <motion.button onClick={decrementQuantity} className="border border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 w-9 h-9 flex items-center justify-center rounded" whileHover={{ scale: 1.1, borderColor: "#ea580c" }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}><Minus className="w-4 h-4" /></motion.button>
              <span className="w-12 text-center font-medium text-lg">{quantity}</span>
              <motion.button onClick={incrementQuantity} className="border border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 w-9 h-9 flex items-center justify-center rounded" whileHover={{ scale: 1.1, borderColor: "#ea580c" }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}><Plus className="w-4 h-4" /></motion.button>
            </div>
          </div>
          <motion.div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center lg:text-left" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}>
            <p className="text-orange-800 text-sm font-medium flex items-center justify-center lg:justify-start gap-2"><Fire className="w-4 h-4" /> {t("order_only_left")}</p>
          </motion.div>

          {/* --- TikTok Style Video Testimonials (if any) --- */}
          <div className="w-full flex flex-col items-center mt-6">
            <h3 className="text-lg font-semibold text-center mb-2">{t('order_happy_customers', 'Join 20,000+ Happy Customers')}</h3>
            {/* Mobile: 1 video at a time with arrows */}
            <div className="flex flex-row gap-4 justify-center items-end w-full video-mobile-carousel video-carousel-container">
              <button
                className="p-2 text-gray-400 hover:text-orange-500 focus:outline-none"
                onClick={() => setVideoIdx((videoIdx + videos.length - 1) % videos.length)}
                aria-label="Previous video"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={videoIdx} 
                  className="w-full max-w-xs h-[340px] bg-black rounded-2xl shadow-2xl flex flex-col items-center justify-center overflow-hidden relative border-2 border-orange-200 transition-transform duration-200 hover:scale-105 group" 
                  initial={{ opacity: 0, x: 50 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                <video src={videos[videoIdx]} controls autoPlay muted loop playsInline className="w-full h-full object-cover rounded-2xl group-hover:brightness-110" style={{ aspectRatio: '9/16', background: '#222' }} />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white text-sm text-center py-2 px-2 font-medium tracking-wide">{t('order_video_testimonial', 'Customer Testimonial')}</div>
              </motion.div>
              </AnimatePresence>
              <button
                className="p-2 text-gray-400 hover:text-orange-500 focus:outline-none"
                onClick={() => setVideoIdx((videoIdx + 1) % videos.length)}
                aria-label="Next video"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
            {/* Desktop: 3 videos side by side */}
            <div className="hidden video-desktop-carousel flex-row gap-4 justify-center items-end w-full">
              {videos.map((video: string, idx: number) => (
                <motion.div key={idx} className="w-full max-w-xs h-[340px] bg-black rounded-2xl shadow-2xl flex flex-col items-center justify-center overflow-hidden relative border-2 border-orange-200 transition-transform duration-200 hover:scale-105 group" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx, duration: 0.5, ease: 'easeOut' }}>
                  <video src={video} controls autoPlay muted loop playsInline className="w-full h-full object-cover rounded-2xl group-hover:brightness-110" style={{ aspectRatio: '9/16', background: '#222' }} />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white text-sm text-center py-2 px-2 font-medium tracking-wide">{t('order_video_testimonial', 'Customer Testimonial')}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- Sticky Order Button for Mobile --- */}
          <div className="block fixed bottom-0 left-0 w-full z-50 bg-white p-3 border-t border-orange-200 shadow-lg lg:hidden">
            <motion.button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-4 text-lg rounded" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
              <Fire className="w-5 h-5 mr-2 inline-block" /> {t("order_want_now")}
            </motion.button>
          </div>

          {/* --- Desktop Order Button (hidden on mobile) --- */}
          <div className="space-y-3 mt-6 hidden lg:block">
            <motion.button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-4 text-lg rounded" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
              <Fire className="w-5 h-5 mr-2 inline-block" /> {t("order_want_now")}
            </motion.button>
          </div>

          {/* --- Payment Methods Section (under button) --- */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-3 font-semibold">{t("order_payment_methods")}</p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {(product.paymentMethods as any[]).map((pm: any, i: number) => (
                <div key={i} className="flex flex-col items-center w-14">
                  <motion.div className="w-12 h-8 bg-white rounded border flex items-center justify-center relative overflow-hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.07, duration: 0.3, ease: 'easeOut' }} whileHover={{ scale: 1.1 }}>
                    <img src={pm.icon} alt={pm.name} className="absolute top-1/2 left-1/2 w-4/5 h-4/5 object-contain transform -translate-x-1/2 -translate-y-1/2" />
                  </motion.div>
                  <span className="text-xs text-gray-500 mt-1 text-center">{t(`payment_${pm.name.toLowerCase()}`)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* --- Accordion Dropdown Section (styled, full width) --- */}
          <div className="w-full mt-8">
            {[1,2,3,4].map((idx: number) => (
              <AccordionItem
                key={idx}
                icon={null}
                title={t(`order_dropdown${idx}`)}
                content={t(`order_dropdown${idx}_content`)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

type AccordionItemProps = { icon: React.ReactNode; title: string; content: string };
function AccordionItem({ icon, title, content }: AccordionItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex justify-between items-center py-3 px-2 text-left text-base font-medium text-gray-800 focus:outline-none bg-transparent hover:bg-gray-50 transition"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="flex items-center">{icon}{title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="ml-2 text-gray-400 text-lg font-bold flex items-center"
          style={{ display: 'inline-block' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 8 10 12 14 8" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="overflow-hidden px-2 pb-2 text-gray-600 text-sm bg-transparent"
            style={{ pointerEvents: open ? 'auto' : 'none' }}
          >
            <div>{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
