import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function BlogPage() {
  const { t } = useTranslation();
  return (
    <motion.div
      className="min-h-screen bg-white text-gray-800 px-4 py-12 sm:px-6 lg:px-24"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.article
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        {/* Cover Image */}
        <motion.img
          src="https://images.unsplash.com/photo-1522337660859-02fbefca4702"
          alt={t("blog_cover_alt")}
          className="w-full h-64 object-cover rounded-xl shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        />

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        >
          {t("blogpage_title")}
        </motion.h1>

        {/* Author & Date */}
        <motion.div
          className="text-sm text-gray-500 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
        >
          {t("blogpage_by")} <span className="font-medium text-gray-700">Lea Dubois</span> • July 16, 2025
        </motion.div>

        {/* Article Body */}
        <motion.div
          className="prose max-w-none prose-p:leading-relaxed prose-h2:mt-10 prose-h2:mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        >
          <motion.p
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {t("blogpage_p1")}
          </motion.p>

          <motion.h2
            whileHover={{ color: "#ea580c" }}
            transition={{ duration: 0.2 }}
          >
            {t("blogpage_h2")}
          </motion.h2>
          <motion.p
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {t("blogpage_p2")}
          </motion.p>

          <motion.p
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {t("blogpage_p3")}
          </motion.p>
        </motion.div>
      </motion.article>
    </motion.div>
  );
}
