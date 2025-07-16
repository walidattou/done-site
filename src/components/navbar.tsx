import { useState } from "react";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
          
          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setSearchOpen(false);
              }}
              className="text-gray-700 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          {!searchOpen && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900 text-sm font-medium">accueil</Link>
              <Link to="/order" className="text-gray-700 hover:text-gray-900 text-sm font-medium">styler</Link>
              <Link to="/blog" className="text-gray-700 hover:text-gray-900 text-sm font-medium">soins cheveux</Link>
            </nav>
          )}

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden min-[490px]:block">
            <h1 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900 font-serif">
              PerleBrush
            </h1>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            {!searchOpen && (
              <>
                <button
                  onClick={() => {
                    setSearchOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-gray-900 p-2"
                >
                  <Search className="h-5 w-5" />
                </button>
                <button className="text-gray-700 hover:text-gray-900 p-2">
                  <User className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCartOpen(true)}
                  className="text-gray-700 hover:text-gray-900 p-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Search Input */}
          {searchOpen && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-20 px-4 animate-slide-down">
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                className="w-full md:w-2/3 lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-6 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && !searchOpen && (
          <nav className="md:hidden px-4 pb-4 flex flex-col space-y-2 animate-slide-down">
            <Link to="/" className="text-gray-700 hover:text-gray-900 text-sm font-medium">accueil</Link>
            <Link to="/order" className="text-gray-700 hover:text-gray-900 text-sm font-medium">styler</Link>
            <Link to="/blog" className="text-gray-700 hover:text-gray-900 text-sm font-medium">soins cheveux</Link>
          </nav>
        )}
      </header>

      {/* Spacer below navbar */}
      <div className="h-20" />

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-50 p-6 animate-slide-in-right">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button onClick={() => setCartOpen(false)} className="text-gray-600 hover:text-gray-900">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-500 text-sm">No items yet. Your cart is empty.</p>
        </div>
      )}
    </>
  );
}
