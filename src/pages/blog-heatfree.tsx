import { motion } from "framer-motion";

export default function BlogHeatFreePage() {
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
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
          alt="Heat-Free Styling Science Cover"
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
          <span className="font-bold">The Science Behind Heat-Free Styling</span>
        </motion.h1>
        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
        >
          <span className="font-bold">How to Protect Your Hair and Still Look Amazing</span>
        </motion.h2>

        {/* Author & Date */}
        <motion.div
          className="text-sm text-gray-500 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
        >
          By <span className="font-medium text-gray-700">Lea Dubois</span> • July 18, 2025
        </motion.div>

        {/* Article Body */}
        <motion.div
          className="prose max-w-none prose-p:leading-relaxed prose-h2:mt-10 prose-h2:mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        >
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            For years, we’ve relied on heat tools to curl, straighten, and smooth our hair into submission. But here's the truth: high temperatures, over time, break down the keratin proteins that keep hair strong and healthy. The result? Brittle strands, split ends, and dullness that no serum can truly fix. Enter heat-free styling — a science-backed, hair-friendly movement that’s rewriting the rules of modern beauty.
          </motion.p>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            But this isn’t about tossing out your tools and hoping for the best. It’s about smart alternatives that respect your hair’s structure while still giving you the control, polish, and versatility you want. Let’s dive into how heatless styling works — and why it’s more effective (and easier) than you think.
          </motion.p>

          <motion.h2 className="font-bold" whileHover={{ color: "#ea580c" }} transition={{ duration: 0.2 }}>
            1. Why Heat Damages Hair — Scientifically Speaking
          </motion.h2>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Hair is made of keratin proteins held together by hydrogen and disulfide bonds. When you apply heat, you’re temporarily breaking these bonds to force your hair into a new shape. The problem? At around 150°C (300°F) and above, you’re not just styling — you’re damaging the outer cuticle and inner cortex. That’s what leads to dryness, frizz, and long-term breakage.
          </motion.p>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Heatless styling avoids this entirely. Instead of breaking bonds with temperature, it reshapes the hair using moisture, tension, and time — working with your hair’s natural behavior, not against it.
          </motion.p>

          <motion.h2 className="font-bold" whileHover={{ color: "#ea580c" }} transition={{ duration: 0.2 }}>
            2. How Heat-Free Styling Actually Works
          </motion.h2>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Heatless techniques use the principle of wet setting — styling damp hair and letting it dry into the desired shape. This allows hydrogen bonds to reform in a new configuration without excessive heat.
          </motion.p>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            <strong>Common methods include:</strong>
          </motion.p>
          <ul>
            <li>Overnight braiding or twisting for waves or curls</li>
            <li>Flexi rods or soft rollers for defined spirals</li>
            <li>Sock buns and foam wraps for volume and bounce</li>
            <li>Hair wraps and tension styling for straight, smooth finishes</li>
          </ul>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            These approaches manipulate hair structure through gentle pressure and air-drying, maintaining the hair’s integrity while still offering flexibility in styling.
          </motion.p>

          <motion.h2 className="font-bold" whileHover={{ color: "#ea580c" }} transition={{ duration: 0.2 }}>
            3. The Role of Product Science in Heatless Styling
          </motion.h2>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Today’s products are smarter. Lightweight styling creams and botanical oils help define texture, lock in moisture, and prevent frizz without silicones or buildup. Look for ingredients like:
          </motion.p>
          <ul>
            <li><strong>Jojoba and argan oils</strong> – mimic scalp sebum and improve elasticity</li>
            <li><strong>Aloe vera and glycerin</strong> – retain moisture and enhance hold</li>
            <li><strong>Rosemary and peppermint</strong> – promote scalp circulation and boost growth</li>
          </ul>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            A few drops of a nutrient-rich hair elixir before styling can drastically improve your results — keeping hair smooth, shiny, and tangle-free as it sets.
          </motion.p>

          <motion.h2 className="font-bold" whileHover={{ color: "#ea580c" }} transition={{ duration: 0.2 }}>
            4. Technology Is Catching Up
          </motion.h2>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Brands are also innovating with infrared steam caps, ionic hair wraps, and programmable curlers that gently speed up air-drying without high temperatures. These tools maintain a safe thermal threshold while enhancing moisture retention and reducing static — ideal for anyone serious about long-term hair health.
          </motion.p>

          <motion.h2 className="font-bold" whileHover={{ color: "#ea580c" }} transition={{ duration: 0.2 }}>
            5. The Results Speak for Themselves
          </motion.h2>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Not only does heatless styling preserve the structural integrity of your hair, but it also encourages a more sustainable, low-maintenance routine. You get:
          </motion.p>
          <ul>
            <li>Longer-lasting styles</li>
            <li>Healthier, shinier hair</li>
            <li>Less product dependency</li>
            <li>Fewer salon visits for damage control</li>
          </ul>

          <motion.h2 className="font-bold" whileHover={{ color: "#ea580c" }} transition={{ duration: 0.2 }}>
            Final Thought: Beauty Meets Biology
          </motion.h2>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            Heat-free styling isn’t just a trend — it’s a smart evolution. It respects your hair’s natural chemistry, supports long-term health, and proves that you don’t need heat to shine. By embracing the science behind these techniques and using the right products, you can finally have it both ways: style and strength.
          </motion.p>
          <motion.p whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            So next time you reach for that flat iron, ask yourself: What if there’s a better way?
          </motion.p>
        </motion.div>
      </motion.article>
    </motion.div>
  );
} 