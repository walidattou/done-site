import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import productImage from "../assets/Product_im.webp";
import blog1 from "../assets/blog1.jpg";
import blog2 from "../assets/blog2.avif";
import bgVideo from "../assets/bgvid.mp4";
import mark1 from "../assets/mark1.avif";
import mark2 from "../assets/mark2.avif";
import mark3 from "../assets/mark3.avif";
import mark4 from "../assets/mark4.avif";

export default function HeroSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const blogPosts = [
    {
      id: 1,
      title: t("blog1_title"),
      excerpt: t("blog1_excerpt"),
      image: blog1,
      date: "July 15, 2024",
      readTime: "3 min read",
    },
    {
      id: 2,
      title: t("blog2_title"),
      excerpt: t("blog2_excerpt"),
      image: blog2,
      date: "July 10, 2024",
      readTime: "5 min read",
    },
  ];

  return (
    <>
      <section className="relative w-full min-h-screen bg-black">
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
              onClick={() => { window.scrollTo(0, 0); navigate("/order"); }}
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

      <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
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
            </motion.div>
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { window.scrollTo(0, 0); navigate("/order"); }}
              >
                <div className="aspect-square rounded-xl mb-4 overflow-hidden">
                  <img
                    src={productImage}
                    alt="PerleBrush Product"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{t("product_name")}</h3>
                <p className="text-gray-600 mb-4">
                  {t("product_desc")}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-orange-600">{t("new_price")}</div>
                  <div className="text-sm text-gray-500 line-through">{t("old_price")}</div>
                </div>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                  {t("order_now")}
                </button>
                <div className="text-center text-sm text-gray-500 mt-2">
                  {t("free_shipping")}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

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
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/blog");
                }}
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

          <div className="text-center mt-12">
            <motion.button
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/blog")}
            >
              {t("view_all_articles")}
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
}
