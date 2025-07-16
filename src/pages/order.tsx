import { useState } from "react";
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

  const productImages = [shopim1, shopim2, shopim3, shopim4];
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="overflow-hidden border-2 border-orange-100 shadow-lg p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl">
            <img
              src={productImages[selectedImage]}
              alt="PerleBrush Styler"
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 overflow-hidden border-2 rounded-lg transition-all duration-200 ${
                  selectedImage === index
                    ? "border-orange-500 shadow-md"
                    : "border-gray-200 hover:border-orange-300"
                }`}
              >
                <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <h1 className="text-2xl sm:text-3xl font-bold text-black text-center lg:text-left">
                PerleBrush - The Styler 5-in-1
              </h1>
              <Sparkles className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(2,847 reviews)</span>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4">
            <span className="text-3xl font-bold text-black">$59.99</span>
            <span className="text-xl text-gray-400 line-through">$99.98</span>
            <span className="bg-orange-500 text-white px-3 py-1 text-sm rounded">40% OFF</span>
          </div>

          <div className="bg-orange-100 border border-orange-200 p-4 rounded-xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-orange-800">
              <Fire className="w-4 h-4" />
              <span className="font-medium">Limited Time Offer!</span>
            </div>
            <p className="text-sm text-orange-700 mt-1">Free shipping worldwide • 30-day money-back guarantee</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 justify-center lg:justify-start">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-500" />
              <span>Fast Delivery</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-black">Quantity</label>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <button
                onClick={decrementQuantity}
                className="border border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 w-9 h-9 flex items-center justify-center rounded"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium text-lg">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="border border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 w-9 h-9 flex items-center justify-center rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center lg:text-left">
            <p className="text-orange-800 text-sm font-medium flex items-center justify-center lg:justify-start gap-2">
              <Fire className="w-4 h-4" /> Only 12 left in stock - order soon!
            </p>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-black hover:bg-gray-800 text-white font-medium py-4 text-lg rounded">
              <Fire className="w-5 h-5 mr-2 inline-block" /> I Want This Now!
            </button>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 text-lg rounded">
              Buy with ShopPay
            </button>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-3">Accepted payment methods:</p>
            <div className="flex gap-2 justify-center lg:justify-start">
              {[visa, mastercard, paypal, applepay, amex].map((icon, i) => (
                <div
                  key={i}
                  className="w-12 h-8 bg-white rounded border flex items-center justify-center relative overflow-hidden"
                >
                  <img
                    src={icon}
                    alt="payment method"
                    className="absolute top-1/2 left-1/2 w-4/5 h-4/5 object-contain transform -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
