"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    phone_number: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(t('contact_success'));
      setFormData({
        from_name: "",
        from_email: "",
        phone_number: "",
        message: "",
        });
      } else {
        toast.error(t('contact_error'));
      }
    } catch (error) {
      console.error("Failed to send message:", error)
      toast.error(t('contact_error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-2 py-8 pt-16 sm:pt-20">
      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">{t('contact_title')}</h2>
        <p className="text-gray-600 mb-8 text-center">{t('contact_subtitle')}</p>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="space-y-2">
            <label htmlFor="from_name" className="block text-sm font-medium text-gray-800">{t('contact_name')}</label>
            <input
              id="from_name"
              name="from_name"
              placeholder={t('contact_name_placeholder')}
              value={formData.from_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white text-gray-900 transition"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="from_email" className="block text-sm font-medium text-gray-800">{t('contact_email')}</label>
            <input
              id="from_email"
              name="from_email"
              type="email"
              placeholder={t('contact_email_placeholder')}
              value={formData.from_email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white text-gray-900 transition"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-800">{t('contact_phone')}</label>
            <input
              id="phone_number"
              name="phone_number"
              type="tel"
              placeholder={t('contact_phone_placeholder')}
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white text-gray-900 transition"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-800">{t('contact_message')}</label>
            <textarea
              id="message"
              name="message"
              placeholder={t('contact_message_placeholder')}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full min-h-[120px] px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white text-gray-900 transition resize-none"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-lg mt-2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? t('contact_sending') : t('contact_send')}
          </motion.button>
        </form>
        <div className="text-center text-gray-500 text-sm mt-8">
          {t('contact_footer')}
        </div>
      </motion.div>
    </div>
  )
}
