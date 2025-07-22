import p1m1 from '../assets/product2/p1m1.jpg';
import p3im1 from '../assets/product3/p3im1.jpg';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function HairCare() {
  const navigate = useNavigate();
  return (
    <section className="pt-[144px] py-10 px-2 sm:px-6 md:px-12 lg:px-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Rosemary Oil Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text */}
          <motion.div
            className="space-y-6 w-full"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Rosemary Oil</h2>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              Experience the natural power of rosemary oil for hair care. Our premium rosemary oil is designed to nourish your scalp, strengthen hair roots, and promote healthy, shiny hair. Perfect for daily use, it helps reduce hair thinning and supports overall hair vitality.
            </p>
            <div className="flex flex-wrap gap-4 items-center mt-2">
              <div className="text-2xl font-bold text-orange-600">4.8/5</div>
              <div className="text-yellow-400 text-xl">★★★★★</div>
              <div className="text-gray-600 text-sm sm:text-base">Rating</div>
            </div>
            <button
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 mt-4"
              onClick={() => navigate('/order/rosemary-elixir')}
            >
              Order Now
            </button>
          </motion.div>
          {/* Image Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 max-w-xs sm:max-w-sm md:max-w-md w-full mx-auto cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="aspect-square rounded-xl mb-4 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src={p1m1} alt="Rosemary Oil" className="w-full h-full object-contain" />
            </div>
          </motion.div>
        </div>
        {/* Protection Spray Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text */}
          <motion.div
            className="space-y-6 w-full lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Protection Spray</h2>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              Shield your hair from heat and environmental damage with our advanced Protection Spray. Formulated to provide a lightweight barrier, it keeps your hair safe during styling and daily exposure, leaving it soft, manageable, and full of life.
            </p>
            <div className="flex flex-wrap gap-4 items-center mt-2">
              <div className="text-2xl font-bold text-orange-600">4.8/5</div>
              <div className="text-yellow-400 text-xl">★★★★★</div>
              <div className="text-gray-600 text-sm sm:text-base">Rating</div>
            </div>
            <button
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 mt-4"
              onClick={() => navigate('/order/heat-protection-spray')}
            >
              Order Now
            </button>
          </motion.div>
          {/* Image Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 max-w-xs sm:max-w-sm md:max-w-md w-full mx-auto cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="aspect-square rounded-xl mb-4 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src={p3im1} alt="Protection Spray" className="w-full h-full object-contain" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 