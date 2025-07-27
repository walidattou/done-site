"use client"
import { motion } from "framer-motion"
import stylerProtector from '../assets/combined_photos/styler+protector.png';
import stylerOil from '../assets/combined_photos/styler+oil.png';
import all3products from '../assets/combined_photos/all3products.png';
import { fonts } from '../config/fonts';
import { Link } from 'react-router-dom';

export default function OurPacks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-24 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-center items-center font-sans">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          style={{ color: '#111827', fontFamily: fonts.sans }}
        >
          Nos packs <span className="text-orange-600">exclusifs</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto" style={{ fontFamily: fonts.sans }}>
          Combinez nos produits phares et profitez d'économies exceptionnelles pour une routine capillaire complète !
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl items-stretch">
        {/* Pack Essentiel */}
        <Link to="/order/pack-essentiel" className="w-full h-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            whileHover={{ y: -10, boxShadow: "0 12px 40px rgba(255,140,0,0.15)", scale: 1.03 }}
            className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between items-center w-full h-full min-h-[500px] border border-orange-50 transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <div className="w-full min-h-[10rem] flex items-center justify-center mb-4">
              <img
                src={stylerProtector}
                alt="Pack Essentiel: Styler 5 en 1 + Spray protecteur"
                className="w-48 sm:w-56 h-auto object-contain mx-auto drop-shadow-md"
              />
            </div>
            <div className="flex-1 flex flex-col items-center w-full text-center">
              <h3 className="text-2xl font-bold text-orange-700 mb-2">Pack Essentiel</h3>
              <p className="text-gray-700 text-base mb-4">Styler 5 en 1 + Spray protecteur</p>
              <div className="flex flex-col items-center gap-2 mb-4">
                <span className="text-3xl font-extrabold text-gray-900">139,99 $ CAD</span>
                <span className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full font-semibold tracking-wide">
                  Économisez 10$
                </span>
              </div>
            </div>
            <motion.button
              className="mt-auto w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-md text-lg"
              whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              Commander
            </motion.button>
          </motion.div>
        </Link>

        {/* Pack Soin Complet */}
        <Link to="/order/pack-soin-complet" className="w-full h-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            whileHover={{ y: -10, boxShadow: "0 12px 40px rgba(255,140,0,0.15)", scale: 1.03 }}
            className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between items-center w-full h-full min-h-[500px] border border-orange-50 transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <div className="w-full min-h-[10rem] flex items-center justify-center mb-4">
              <img
                src={stylerOil}
                alt="Pack Soin Complet: Styler 5 en 1 + Huile Elixir"
                className="w-48 sm:w-56 h-auto object-contain mx-auto drop-shadow-md"
              />
            </div>
            <div className="flex-1 flex flex-col items-center w-full text-center">
              <h3 className="text-2xl font-bold text-orange-700 mb-2">Pack Soin Complet</h3>
              <p className="text-gray-700 text-base mb-4">Styler 5 en 1 + Huile Elixir</p>
              <div className="flex flex-col items-center gap-2 mb-4">
                <span className="text-3xl font-extrabold text-gray-900">149,99 $ CAD</span>
                <span className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full font-semibold tracking-wide">
                  Économisez 5$
                </span>
              </div>
            </div>
            <motion.button
              className="mt-auto w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-md text-lg"
              whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              Commander
            </motion.button>
          </motion.div>
        </Link>

        {/* Pack Premium Total */}
        <Link to="/order/pack-premium-total" className="w-full h-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            whileHover={{ y: -10, boxShadow: "0 12px 40px rgba(255,140,0,0.15)", scale: 1.03 }}
            className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between items-center w-full h-full min-h-[500px] border border-orange-50 transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <div className="w-full min-h-[10rem] flex items-center justify-center mb-4">
              <img
                src={all3products}
                alt="Pack Premium Total: Styler 5 en 1 + Huile Elixir + Spray protecteur"
                className="w-48 sm:w-56 h-auto object-contain mx-auto drop-shadow-md"
              />
            </div>
            <div className="flex-1 flex flex-col items-center w-full text-center">
              <h3 className="text-2xl font-bold text-orange-700 mb-2">Pack Premium Total</h3>
              <p className="text-gray-700 text-base mb-4">Styler 5 en 1 + Huile Elixir + Spray protecteur</p>
              <div className="flex flex-col items-center gap-2 mb-4">
                <span className="text-3xl font-extrabold text-gray-900">169,99 $ CAD</span>
                <span className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full font-semibold tracking-wide">
                  Économisez 15$
                </span>
              </div>
            </div>
            <motion.button
              className="mt-auto w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-md text-lg"
              whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              Commander
            </motion.button>
          </motion.div>
        </Link>
      </div>
    </div>
  )
} 