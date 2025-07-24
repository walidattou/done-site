import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <motion.div
      className="min-h-screen bg-white text-gray-800 px-4 py-12 sm:px-6 lg:px-24 pt-24 sm:pt-28"
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
          alt="Summer Hair Trends Cover"
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
          5 Summer Hair Trends That'll Make You Shine
        </motion.h1>

        {/* Author & Date */}
        <motion.div
          className="text-sm text-gray-500 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
        >
          By <span className="font-medium text-gray-700">Lea Dubois</span> • July 16, 2025
        </motion.div>

        {/* Article Body */}
        <motion.div
          className="prose max-w-none prose-p:leading-relaxed prose-h2:mt-10 prose-h2:mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        >
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Summer is here — and with it comes the perfect excuse to refresh your hair game. Whether you're heading to the beach, hitting the festival circuit, or just vibing in the sun, this season’s hair trends are all about looking effortlessly radiant. From breezy textures to bold statements, we’ve rounded up five of the hottest hair trends that will keep you glowing all summer long — plus how to pull them off without the stress.
          </motion.p>

          <motion.h2 whileHover={{ color: "#ea580c" }} transition={{ duration: 0.2 }}>
            1. Glossy, Healthy Hair
          </motion.h2>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Forget overly styled looks — this summer, natural shine is in. Think soft, light-reflecting strands that look healthy and full of life. The key? Focus on scalp care and hydration. Start with a nourishing elixir rich in ingredients like rosemary, peppermint, jojoba, and argan oils. These promote circulation, repair split ends, and bring back natural softness and shine — no flat iron required.
          </motion.p>
          <motion.p className="italic text-orange-700" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Tip: Use a few drops on damp hair after a wash or massage into the scalp as a weekly treatment.
          </motion.p>

          <motion.h2 whileHover={{ color: "#ea580c" }} transition={{ duration: 0.2 }}>
            2. Beachy Waves, Minus the Beach
          </motion.h2>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Beach waves have never gone out of style, but this summer they’re looser, more lived-in, and way less crunchy. Ditch the sea salt sprays that dry out your hair and opt for heatless methods like braiding damp hair overnight or using soft curlers.
          </motion.p>
          <motion.p className="italic text-orange-700" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Pro Move: Before braiding, apply a light oil blend to tame frizz and enhance shine. You'll wake up with soft, hydrated waves that scream “just got back from vacation.”
          </motion.p>

          <motion.h2 whileHover={{ color: "#ea580c" }} transition={{ duration: 0.2 }}>
            3. The Wet Look (But Make It Chic)
          </motion.h2>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Slicked-back styles are making a bold return — from runways to rooftop parties. This look works best on medium to long hair and gives major minimalist glam.
          </motion.p>
          <motion.p className="italic text-orange-700" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            How to Get It: Mix a lightweight gel with your go-to hair oil for hold without stiffness. Comb through damp hair and tuck behind your ears for a sleek finish. Set it with a blast of cool air from your dryer.
          </motion.p>

          <motion.h2 whileHover={{ color: "#ea580c" }} transition={{ duration: 0.2 }}>
            4. Bold Braids & Twists
          </motion.h2>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Protective styles like box braids, twists, and cornrows are not only practical in hot weather — they’re also a perfect canvas for creative expression. Add colored extensions, beads, or wrap sections in metallic thread for a trend-forward twist.
          </motion.p>
          <motion.p className="italic text-orange-700" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Care Tip: Keep your scalp nourished and itch-free by applying oil directly to the roots every few days. This helps avoid dryness while keeping your style fresh and long-lasting.
          </motion.p>

          <motion.h2 whileHover={{ color: "#ea580c" }} transition={{ duration: 0.2 }}>
            5. Face-Framing Layers and Curtain Bangs
          </motion.h2>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Light layering and curtain bangs are everywhere this season — and for good reason. They frame the face beautifully, add movement, and pair well with the carefree vibe of summer. They're also low-maintenance and grow out gracefully.
          </motion.p>
          <motion.p className="italic text-orange-700" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Styling Hack: Use a lightweight oil to define the ends and prevent frizz, especially in humid weather. This keeps your layers looking polished without weighing them down.
          </motion.p>

          <motion.h2 whileHover={{ color: "#ea580c" }} transition={{ duration: 0.2 }}>
            Final Thoughts
          </motion.h2>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            This summer, it's all about natural beauty, versatile styling, and taking care of your hair from root to tip. With the right products and techniques, you can effortlessly recreate these trends and keep your hair looking fresh, healthy, and radiant — no matter how high the temperature climbs.
          </motion.p>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            So grab your favorite hair elixir, try something new, and get ready to shine all season long.
          </motion.p>
        </motion.div>
      </motion.article>
    </motion.div>
  );
}
