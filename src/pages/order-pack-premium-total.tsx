import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Shield, Truck, Sparkles, Flame as Fire, Minus, Plus } from "lucide-react";
import all3products from '../assets/combined_photos/all3products.png';
import visa from '../assets/important svg/visa-classic-svgrepo-com.svg';
import mastercard from '../assets/important svg/mastercard-svgrepo-com.svg';
import paypal from '../assets/important svg/paypal-svgrepo-com.svg';
import applepay from '../assets/important svg/applepay-svgrepo-com.svg';
import amex from '../assets/important svg/american-express-svgrepo-com.svg';
import video1 from '../assets/videos/1sr.mp4';
import video2 from '../assets/videos/2nd.mp4';
import video3 from '../assets/videos/3rd.mp4';
import './order.css';

const paymentMethods = [
  { icon: visa, name: 'Visa' },
  { icon: mastercard, name: 'Mastercard' },
  { icon: paypal, name: 'PayPal' },
  { icon: applepay, name: 'Apple Pay' },
  { icon: amex, name: 'Amex' },
];

const images = [all3products];
const videos = [video1, video2, video3];

export default function OrderPackPremiumTotal() {
  const [quantity, setQuantity] = useState(1);
  const [videoIdx, setVideoIdx] = useState(0);

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
          <motion.div className="relative overflow-hidden border-2 border-orange-100 shadow-lg p-2 sm:p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl product-image-container flex justify-center items-center max-w-[80%] mx-auto aspect-square" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}>
            <img src={images[0]} alt="Pack Premium Total" className="absolute inset-0 m-auto w-[112%] h-[112%] object-contain rounded-lg" />
          </motion.div>
        </motion.div>

        {/* Details Section */}
        <motion.div className="space-y-6" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}>
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <motion.h1 className="text-2xl sm:text-3xl font-bold text-black text-center lg:text-left" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}>Pack « Premium Total »</motion.h1>
              <Sparkles className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />))}</div>
              <span className="text-sm text-gray-600">(2 847 reviews)</span>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <span className="text-lg text-gray-400 line-through">184,99 $</span>
            <span className="text-3xl font-bold text-orange-600">169,99 $ CAD</span>
          </div>

          {/* Product Description */}
          <div className="text-gray-700 text-base leading-relaxed mb-2 text-center lg:text-left">
            <p className="mb-1 font-bold">The ultimate bundle for complete hair care and styling.</p>
            <p className="mb-1">1 Styler 5 en 1 + 1 Spray + 1 Élixir</p>
            <p className="mb-1">Get all three best-sellers together for the best value and results.</p>
          </div>

          <motion.div className="bg-orange-100 border border-orange-200 p-4 rounded-xl text-center lg:text-left" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-orange-800">
              <Fire className="w-4 h-4" />
              <span className="font-medium">Limited time offer</span>
            </div>
            <p className="text-sm text-orange-700 mt-1">Free shipping on all orders</p>
          </motion.div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 justify-center lg:justify-start">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Secure payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-500" />
              <span>Fast delivery</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">Quantity</label>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <motion.button onClick={decrementQuantity} className="border border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 w-9 h-9 flex items-center justify-center rounded" whileHover={{ scale: 1.1, borderColor: "#ea580c" }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}><Minus className="w-4 h-4" /></motion.button>
              <span className="w-12 text-center font-medium text-lg">{quantity}</span>
              <motion.button onClick={incrementQuantity} className="border border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 w-9 h-9 flex items-center justify-center rounded" whileHover={{ scale: 1.1, borderColor: "#ea580c" }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}><Plus className="w-4 h-4" /></motion.button>
            </div>
          </div>
          <motion.div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center lg:text-left" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}>
            <p className="text-orange-800 text-sm font-medium flex items-center justify-center lg:justify-start gap-2"><Fire className="w-5 h-5" /> Only a few left in stock!</p>
          </motion.div>

          {/* --- TikTok Style Video Testimonials (if any) --- */}
          <div className="w-full flex flex-col items-center mt-6">
            <h3 className="text-lg font-semibold text-center mb-2">Join 20,000+ Happy Customers</h3>
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
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white text-sm text-center py-2 px-2 font-medium tracking-wide">Customer Testimonial</div>
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
              {videos.map((video, idx) => (
                <motion.div key={idx} className="w-full max-w-xs h-[340px] bg-black rounded-2xl shadow-2xl flex flex-col items-center justify-center overflow-hidden relative border-2 border-orange-200 transition-transform duration-200 hover:scale-105 group" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx, duration: 0.5, ease: 'easeOut' }}>
                  <video src={video} controls autoPlay muted loop playsInline className="w-full h-full object-cover rounded-2xl group-hover:brightness-110" style={{ aspectRatio: '9/16', background: '#222' }} />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white text-sm text-center py-2 px-2 font-medium tracking-wide">Customer Testimonial</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- Sticky Order Button for Mobile --- */}
          <div className="block fixed bottom-0 left-0 w-full z-50 bg-white p-3 border-t border-orange-200 shadow-lg lg:hidden">
            <motion.button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-4 text-lg rounded" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
              <Fire className="w-5 h-5 mr-2 inline-block" /> Order Now
            </motion.button>
          </div>

          {/* --- Desktop Order Button (hidden on mobile) --- */}
          <div className="space-y-3 mt-6 hidden lg:block">
            <motion.button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-4 text-lg rounded" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
              <Fire className="w-5 h-5 mr-2 inline-block" /> Order Now
            </motion.button>
          </div>

          {/* --- Payment Methods Section (under button) --- */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-3 font-semibold">Payment Methods</p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {paymentMethods.map((pm, i) => (
                <div key={i} className="flex flex-col items-center w-14">
                  <motion.div className="w-12 h-8 bg-white rounded border flex items-center justify-center relative overflow-hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.07, duration: 0.3, ease: 'easeOut' }} whileHover={{ scale: 1.1 }}>
                    <img src={pm.icon} alt={pm.name} className="absolute top-1/2 left-1/2 w-4/5 h-4/5 object-contain transform -translate-x-1/2 -translate-y-1/2" />
                  </motion.div>
                  <span className="text-xs text-gray-500 mt-1 text-center">{pm.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* --- Accordion Dropdown Section (styled, full width) --- */}
          <div className="w-full mt-8">
            <AccordionItem
              icon={null}
              title="Risk-free trial"
              content="30-day money-back guarantee."
            />
            <AccordionItem
              icon={null}
              title="Fast, reliable & secure delivery"
              content="Tracked shipping in 1-3 business days."
            />
            <AccordionItem
              icon={null}
              title="24/7 customer service"
              content="Our team is available at any time."
            />
            <AccordionItem
              icon={null}
              title="Technical specifications"
              content="See the full product technical sheet."
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function AccordionItem({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
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