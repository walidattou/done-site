import { useTranslation } from "react-i18next";
import {
  Award,
  Package,
  Shield,
  Headphones,
  CreditCard,
  Facebook,
  Instagram,
  ChevronDown
} from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const features = [
    { icon: <Award className="w-12 h-12" />, title: t("footer_warranty_title"), text: t("footer_warranty_text") },
    { icon: <Package className="w-12 h-12" />, title: t("footer_shipping_title"), text: t("footer_shipping_text") },
    { icon: <Shield className="w-12 h-12" />, title: t("footer_guarantee_title"), text: t("footer_guarantee_text") },
    { icon: <Headphones className="w-12 h-12" />, title: t("footer_support_title"), text: t("footer_support_text") },
    { icon: <CreditCard className="w-12 h-12" />, title: t("footer_payment_title"), text: t("footer_payment_text") },
  ];
  return (
    <footer className="w-full">
      {/* Top Feature Section */}
      <div className="bg-orange-600 py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center text-white">
            {features.map(({ icon, title, text }, i) => (
              <div key={i} className="flex flex-col items-center space-y-3">
                {icon}
                <h3 className="font-bold text-sm uppercase tracking-wide">{title}</h3>
                <p className="text-sm leading-relaxed whitespace-pre-line">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="bg-gray-900 text-white py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Logo */}
            <div className="lg:col-span-1 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-light tracking-wide">PerleBrush</h2>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
              {/* Shop */}
              <div>
                <h3 className="font-semibold text-lg mb-4">{t("footer_shop")}</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">{t("footer_home")}</a></li>
                  <li><a href="#" className="hover:text-white">{t("footer_our_stylers")}</a></li>
                  <li><a href="#" className="hover:text-white">{t("footer_our_accessories")}</a></li>
                </ul>
              </div>

              {/* Help */}
              <div>
                <h3 className="font-semibold text-lg mb-4">{t("footer_help")}</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">{t("footer_instructions")}</a></li>
                  <li><a href="#" className="hover:text-white">{t("footer_contact")}</a></li>
                  <li><a href="#" className="hover:text-white">{t("footer_shipping")}</a></li>
                  <li><a href="#" className="hover:text-white">{t("footer_refund")}</a></li>
                  <li><a href="#" className="hover:text-white">{t("footer_track_order")}</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold text-lg mb-4">{t("footer_legal")}</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">{t("footer_privacy_policy")}</a></li>
                  <li><a href="#" className="hover:text-white">{t("footer_terms_service")}</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Input */}
              <div className="lg:flex-1">
                <h3 className="text-lg font-semibold mb-4 text-center lg:text-left">{t("footer_newsletter_title")}</h3>
                <div className="flex flex-col sm:flex-row max-w-md mx-auto lg:mx-0">
                  <input
                    type="email"
                    placeholder={t("footer_email_placeholder")}
                    className="flex-1 bg-transparent border border-gray-600 text-white px-4 py-3 placeholder-gray-400 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none focus:outline-none focus:border-orange-600"
                  />
                  <button className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none transition">
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex justify-center lg:justify-end space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Country / Language Select */}
          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col sm:flex-row sm:justify-between gap-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{t("footer_country_region")}</span>
                <button className="flex items-center border border-gray-600 px-3 py-1 rounded hover:border-gray-500">
                  {t("footer_country_label")}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{t("footer_language")}</span>
                <button className="flex items-center border border-gray-600 px-3 py-1 rounded hover:border-gray-500">
                  {t("footer_language_label")}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center text-sm text-gray-400">© 2024, PerleBrush</div>
        </div>
      </div>
    </footer>
  );
}
