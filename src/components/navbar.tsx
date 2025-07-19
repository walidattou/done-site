import { useState, useEffect, useRef } from "react";
import { Search, User, ShoppingCart, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

interface HeaderProps {
  cartCount?: number;
  onCartClick?: () => void;
}

export default function Header({ cartCount = 0, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close all overlays on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setLangMenuOpen(false);
  }, [location.pathname]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    if (!langMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [langMenuOpen]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  // Mutually exclusive overlay openers
  const openMobileMenu = () => {
    setMobileMenuOpen((open) => {
      if (!open) {
        setSearchOpen(false);
        setLangMenuOpen(false);
      }
      return !open;
    });
  };
  const openSearch = () => {
    setSearchOpen((open) => {
      if (!open) {
        setMobileMenuOpen(false);
        setLangMenuOpen(false);
      }
      return !open;
    });
  };
  const openLangMenu = () => {
    setLangMenuOpen((open) => {
      if (!open) {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
      return !open;
    });
  };

  return (
    <>
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-down {
          from { transform: translateY(-10%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in-right { animation: slide-in-right 0.3s ease-out; }
        .animate-slide-down { animation: slide-down 0.2s ease-out; }
      `}</style>

      <header className="w-full bg-white border-b border-gray-200 fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 h-16 sm:h-20 flex items-center justify-between relative">
          {/* Mobile Hamburger */}
          <div className="flex-1 flex items-center md:hidden">
            <button
              onClick={openMobileMenu}
              className="text-gray-700 hover:text-gray-900 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
              aria-label="Open menu"
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>

          {/* Center Logo - always visible, shrinks on mobile */}
          <div className="flex-1 flex justify-center hidden sm:block">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-gray-900 font-serif truncate">
              PerleBrush
            </h1>
          </div>

          {/* Desktop Navigation */}
          {!searchOpen && (
            <nav className="hidden md:flex flex-1 items-center justify-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-gray-900 text-base font-medium px-2 py-1 rounded-lg whitespace-nowrap">{t("nav_home")}</Link>
              <Link to="/order" className="text-gray-700 hover:text-gray-900 text-base font-medium px-2 py-1 rounded-lg whitespace-nowrap">{t("nav_styler")}</Link>
              <Link to="/blog" className="text-gray-700 hover:text-gray-900 text-base font-medium px-2 py-1 rounded-lg whitespace-nowrap">{t("nav_haircare")}</Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900 text-base font-medium px-2 py-1 rounded-lg whitespace-nowrap">{t('contact_title')}</Link>
            </nav>
          )}

          {/* Right Icons */}
          <div className="flex-1 flex items-center justify-end space-x-1 sm:space-x-2 md:space-x-3 h-full">
            {!searchOpen && (
              <>
                <button
                  onClick={() => {
                    openSearch();
                    setLangMenuOpen(false);
                  }}
                  className="flex items-center justify-center text-gray-700 hover:text-gray-900 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Search"
                  style={{ verticalAlign: 'middle' }}
                >
                  <Search className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    setLangMenuOpen(false);
                  }}
                  className="flex items-center justify-center text-gray-700 hover:text-gray-900 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="User"
                  style={{ verticalAlign: 'middle' }}
                >
                  <User className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    onCartClick && onCartClick();
                    setLangMenuOpen(false);
                  }}
                  className="flex items-center justify-center text-gray-700 hover:text-gray-900 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Cart"
                  style={{ verticalAlign: 'middle' }}
                >
                  <span className="relative inline-block">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] flex items-center justify-center shadow-lg border-2 border-white">
                        {cartCount}
                      </span>
                    )}
                  </span>
                </button>
                {/* Language Dropdown */}
                <div className="relative flex items-center" ref={langMenuRef}>
                  <button
                    onClick={() => {
                      openLangMenu();
                      setSearchOpen(false);
                      // setCartOpen(false); // This state was removed, so this line is removed.
                    }}
                    className="flex items-center justify-center text-gray-700 hover:text-gray-900 p-2 sm:p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    aria-label="Language"
                    style={{ verticalAlign: 'middle' }}
                  >
                    <span className="mr-1 hidden sm:inline">{t("language")}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {langMenuOpen && (
                      <motion.div
                        className="absolute left-0 top-full mt-2 min-w-[120px] bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          onClick={() => changeLanguage("en")}
                          className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${i18n.language === "en" ? "font-bold" : ""}`}
                        >
                          {t("english")}
                        </button>
                        <button
                          onClick={() => changeLanguage("fr")}
                          className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${i18n.language === "fr" ? "font-bold" : ""}`}
                        >
                          {t("french")}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>

          {/* Search Input */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-white z-20 px-2 sm:px-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  autoFocus
                  type="text"
                  placeholder={t("search") + "..."}
                  className="w-full md:w-2/3 lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-6 text-gray-500 hover:text-gray-800"
                  aria-label="Close search"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && !searchOpen && (
            <motion.nav
              className="md:hidden px-2 pb-4 flex flex-col space-y-2 bg-white border-b border-gray-100 shadow-lg rounded-b-xl"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Link to="/" className="text-gray-700 hover:text-gray-900 text-base font-medium px-2 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" onClick={() => setMobileMenuOpen(false)}>{t("nav_home")}</Link>
              <Link to="/order" className="text-gray-700 hover:text-gray-900 text-base font-medium px-2 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" onClick={() => setMobileMenuOpen(false)}>{t("nav_styler")}</Link>
              <Link to="/blog" className="text-gray-700 hover:text-gray-900 text-base font-medium px-2 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" onClick={() => setMobileMenuOpen(false)}>{t("nav_haircare")}</Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900 text-base font-medium px-2 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" onClick={() => setMobileMenuOpen(false)}>{t('contact_title')}</Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer below navbar (removed to eliminate white space) */}
      {/* <div className="h-16 sm:h-20" /> */}

      {/* Cart Sidebar */}
      <AnimatePresence>
        {/* The cartOpen state and openCart function were removed, so this block is no longer needed. */}
        {/* If cart functionality is still needed, it should be managed by the parent component. */}
      </AnimatePresence>
    </>
  );
}
