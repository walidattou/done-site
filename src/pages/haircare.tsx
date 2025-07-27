import p1m1 from '../assets/product2/p1m1.jpg';
import p3im1 from '../assets/product3/p3im1.jpg';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function HairCare() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <motion.section
      className="pt-[144px] py-10 px-2 sm:px-6 md:px-12 lg:px-24 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Rosemary Oil Card */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-y-16 lg:items-start"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Image Card (mobile first) */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 max-w-xs sm:max-w-sm md:max-w-md w-full mx-auto cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl order-1 lg:order-none lg:mb-0 lg:ml-8"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="aspect-square rounded-xl mb-4 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src={p1m1} alt={t('haircare_rosemary_title')} className="w-full h-full object-contain" />
            </div>
          </motion.div>
          {/* Text */}
          <motion.div
            className="space-y-6 w-full flex flex-col items-center order-2 lg:order-none lg:items-start lg:pl-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-4 mb-2 order-2 lg:order-none">
              <span className="text-lg text-gray-400 line-through">{t('haircare_rosemary_oldprice')}</span>
              <span className="text-2xl font-bold text-orange-600">{t('haircare_rosemary_price')}</span>
            </div>
            <motion.button
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 order-3 lg:order-none"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/order/rosemary-elixir')}
            >
              {t('haircare_order_btn')}
            </motion.button>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line order-4 lg:order-none">
              {t('haircare_rosemary_desc')}
            </p>
            <div className="flex flex-wrap gap-4 items-center mt-2 order-5 lg:order-none">
              <div className="text-2xl font-bold text-orange-600">{t('haircare_rating_value')}</div>
              <div className="text-yellow-400 text-xl">★★★★★</div>
              <div className="text-gray-600 text-sm sm:text-base">{t('haircare_rating_label')}</div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 order-1 lg:order-none">{t('haircare_rosemary_title')}</h2>
          </motion.div>
        </motion.div>
        {/* Protection Spray Card */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          {/* Image Card (mobile first) */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 max-w-xs sm:max-w-sm md:max-w-md w-full mx-auto cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl order-1 lg:order-2 lg:ml-8 lg:mb-0"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="aspect-square rounded-xl mb-4 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src={p3im1} alt={t('haircare_protection_title')} className="w-full h-full object-contain" />
            </div>
          </motion.div>
          {/* Text */}
          <motion.div
            className="space-y-6 w-full flex flex-col items-center order-2 lg:order-none lg:items-start lg:pl-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-2 order-2 lg:order-none">
              <span className="text-lg text-gray-400 line-through">{t('haircare_protection_oldprice')}</span>
              <span className="text-2xl font-bold text-orange-600">{t('haircare_protection_price')}</span>
            </div>
            <motion.button
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 order-3 lg:order-none"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/order/heat-protection-spray')}
            >
              {t('haircare_order_btn')}
            </motion.button>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line order-4 lg:order-none">
              {t('haircare_protection_desc')}
            </p>
            <div className="flex flex-wrap gap-4 items-center mt-2 order-5 lg:order-none">
              <div className="text-2xl font-bold text-orange-600">{t('haircare_rating_value')}</div>
              <div className="text-yellow-400 text-xl">★★★★★</div>
              <div className="text-gray-600 text-sm sm:text-base">{t('haircare_rating_label')}</div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 order-1 lg:order-none">{t('haircare_protection_title')}</h2>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
} 