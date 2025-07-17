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
  Flame as Fire
} from "lucide-react";

import shopim1 from "../assets/shopim1.webp";
import shopim2 from "../assets/shopim2.webp";
import shopim3 from "../assets/shopim3.webp";
import shopim4 from "../assets/shopim4.webp";
import visa from "../assets/important svg/visa-classic-svgrepo-com.svg";
import mastercard from "../assets/important svg/mastercard-svgrepo-com.svg";
import paypal from "../assets/important svg/paypal-svgrepo-com.svg";
import applepay from "../assets/important svg/applepay-svgrepo-com.svg";
import amex from "../assets/important svg/american-express-svgrepo-com.svg";

export default function OrderPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { t } = useTranslation();

  const productImages = [shopim1, shopim2, shopim3, shopim4];
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <motion.div
      className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="overflow-hidden border-2 border-orange-100 shadow-lg p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          >
            <motion.img
              src={productImages[selectedImage]}
              alt="PerleBrush Styler"
              className="w-full h-auto rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>

          <div className="flex flex-wrap gap-3 justify-center">
            {productImages.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 overflow-hidden border-2 rounded-lg transition-all duration-200 ${
                  selectedImage === index
                    ? "border-orange-500 shadow-md"
                    : "border-gray-200 hover:border-orange-300"
                }`}
                whileHover={{ scale: 1.07, borderColor: "#ea580c" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Details Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <motion.h1
                className="text-2xl sm:text-3xl font-bold text-black text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
              >
                {t("order_title")}
              </motion.h1>
              <Sparkles className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">{t("order_reviews")}</span>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4">
            <span className="text-3xl font-bold text-black">{t("order_price")}</span>
            <span className="text-xl text-gray-400 line-through">{t("order_old_price")}</span>
            <span className="bg-orange-500 text-white px-3 py-1 text-sm rounded">{t("order_discount")}</span>
          </div>

          <motion.div
            className="bg-orange-100 border border-orange-200 p-4 rounded-xl text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          >
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
              <motion.button
                onClick={decrementQuantity}
                className="border border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 w-9 h-9 flex items-center justify-center rounded"
                whileHover={{ scale: 1.1, borderColor: "#ea580c" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <Minus className="w-4 h-4" />
              </motion.button>
              <span className="w-12 text-center font-medium text-lg">{quantity}</span>
              <motion.button
                onClick={incrementQuantity}
                className="border border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 w-9 h-9 flex items-center justify-center rounded"
                whileHover={{ scale: 1.1, borderColor: "#ea580c" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <motion.div
            className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center lg:text-left"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-orange-800 text-sm font-medium flex items-center justify-center lg:justify-start gap-2">
              <Fire className="w-4 h-4" /> {t("order_only_left")}
            </p>
          </motion.div>

          <div className="space-y-3">
            <motion.button
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-4 text-lg rounded"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              <Fire className="w-5 h-5 mr-2 inline-block" /> {t("order_want_now")}
            </motion.button>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-3">{t("order_payment_methods")}</p>
            <div className="flex gap-2 justify-center lg:justify-start">
              {[visa, mastercard, paypal, applepay, amex].map((icon, i) => (
                <motion.div
                  key={i}
                  className="w-12 h-8 bg-white rounded border flex items-center justify-center relative overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.07, duration: 0.3, ease: "easeOut" }}
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src={icon}
                    alt="payment method"
                    className="absolute top-1/2 left-1/2 w-4/5 h-4/5 object-contain transform -translate-x-1/2 -translate-y-1/2"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
