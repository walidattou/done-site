// Product data for the order template page
import shopim1 from '../assets/shopim1.webp';
import shopim2 from '../assets/shopim2.webp';
import shopim3 from '../assets/shopim3.webp';
import shopim4 from '../assets/shopim4.webp';
import mark1 from '../assets/mark1.avif';
import mark2 from '../assets/mark2.avif';
import mark3 from '../assets/mark3.avif';
import bgvid from '../assets/bgvid.mp4';
import visa from '../assets/important svg/visa-classic-svgrepo-com.svg';
import mastercard from '../assets/important svg/mastercard-svgrepo-com.svg';
import paypal from '../assets/important svg/paypal-svgrepo-com.svg';
import applepay from '../assets/important svg/applepay-svgrepo-com.svg';
import amex from '../assets/important svg/american-express-svgrepo-com.svg';

import p1m1 from '../assets/product2/p1m1.jpg';
import p1m2 from '../assets/product2/p1m2.jpg';
import p1m3 from '../assets/product2/p1m3.jpg';
import p1m4 from '../assets/product2/p1m4.jpg';
import p1m5 from '../assets/product2/p1m5.jpg';
import p1m6 from '../assets/product2/p1m6.jpg';

import p3im1 from '../assets/product3/p3im1.jpg';
import p3im2 from '../assets/product3/p3im2.jpg';
import p3im3 from '../assets/product3/p3im3.jpg';

export const products = [
  {
    id: 'perlebrush',
    name: 'PerleBrush Styler',
    images: [shopim1, shopim2, shopim3, shopim4],
    videos: [bgvid, bgvid, bgvid],
    posters: [mark1, mark2, mark3],
    price: '€49.99',
    oldPrice: '€79.99',
    discount: '-38%',
    description: [
      'Smoothing brush for a sleek look.',
      'Round volumising brush for body.',
    ],
    features: [
      { title: 'Essai sans risque', content: '30 jours satisfait ou remboursé.' },
      { title: 'Livraison rapide, fiable et sécurisée', content: 'Expédition suivie en 1-3 jours ouvrés.' },
      { title: 'Service client 24h/24 et 7j/7', content: 'Notre équipe est disponible à tout moment.' },
      { title: 'Spécifications techniques', content: 'Voir la fiche technique complète du produit.' },
    ],
    paymentMethods: [
      { icon: visa, name: 'Visa' },
      { icon: mastercard, name: 'Mastercard' },
      { icon: paypal, name: 'PayPal' },
      { icon: applepay, name: 'Apple Pay' },
      { icon: amex, name: 'Amex' },
    ],
  },
  {
    id: 'rosemary-elixir',
    name: 'Rosemary Hair Elixir',
    images: [p1m1, p1m2, p1m3, p1m4, p1m5, p1m6],
    videos: [bgvid, bgvid, bgvid],
    posters: [mark1, mark2, mark3],
    price: '€XX.XX',
    oldPrice: '€YY.YY',
    discount: '-ZZ%',
    description: [
      'Stronger, Healthier, Shinier Hair — Naturally',
      'Formulated with rosemary, peppermint, jojoba, and argan oils, this nutrient-rich elixir deeply nourishes the scalp and helps repair dry, damaged hair from root to tip.',
      'Reduces Breakage and Split Ends',
      'Strengthens each strand, seals split ends, and restores your hair’s natural softness and shine.',
      'Soothes the Scalp and Supports Growth',
      'Relieves itchiness, helps combat dandruff, and promotes circulation for visibly thicker, healthier hair.',
      'Suitable for All Hair Types',
      'Ideal for curly, braided, color-treated, or natural textures — whether high or low porosity.',
      'Compact and Travel-Friendly',
      'Comes in a convenient 50ml size, perfect for on-the-go use or bathroom storage.'
    ],
    features: [
      { title: 'Essai sans risque', content: '30 jours satisfait ou remboursé.' },
      { title: 'Livraison rapide, fiable et sécurisée', content: 'Expédition suivie en 1-3 jours ouvrés.' },
      { title: 'Service client 24h/24 et 7j/7', content: 'Notre équipe est disponible à tout moment.' },
      { title: 'Spécifications techniques', content: 'Voir la fiche technique complète du produit.' },
    ],
    paymentMethods: [
      { icon: visa, name: 'Visa' },
      { icon: mastercard, name: 'Mastercard' },
      { icon: paypal, name: 'PayPal' },
      { icon: applepay, name: 'Apple Pay' },
      { icon: amex, name: 'Amex' },
    ],
  },
  {
    id: 'heat-protection-spray',
    name: 'Hair Heat Protection Spray',
    images: [p3im1, p3im2, p3im3],
    videos: [bgvid, bgvid, bgvid],
    posters: [mark1, mark2, mark3],
    price: '€29.99',
    oldPrice: '€39.99',
    discount: '-25%',
    description: [
      'Protect and nourish your hair with our Hair Heat Protection Spray.',
      'Infused with deep hydration and nourishing repair properties, this 150ml formula helps prevent heat damage while enhancing natural waves and curls.',
      'Ideal for achieving soft, beachy textures, it adds volume to fine hair and boosts confidence with every use.',
      'Perfect for daily styling and thermal protection.'
    ],
    features: [
      { title: 'Deep Hydration', content: 'Nourishes and repairs hair while protecting from heat.' },
      { title: 'Enhances Texture', content: 'Helps create soft, beachy waves and adds volume.' },
      { title: 'Daily Use', content: 'Perfect for daily styling and thermal protection.' },
      { title: 'Large Size', content: '150ml bottle for long-lasting use.' },
    ],
    paymentMethods: [
      { icon: visa, name: 'Visa' },
      { icon: mastercard, name: 'Mastercard' },
      { icon: paypal, name: 'PayPal' },
      { icon: applepay, name: 'Apple Pay' },
      { icon: amex, name: 'Amex' },
    ],
  },
]; 