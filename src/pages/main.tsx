import productImage from "../assets/Product_im.webp";
import blog1 from "../assets/blog1.jpg";
import blog2 from "../assets/blog2.avif";
import bgVideo from "../assets/bgvid.mp4";
import mark1 from "../assets/mark1.avif";
import mark2 from "../assets/mark2.avif";
import mark3 from "../assets/mark3.avif";
import mark4 from "../assets/mark4.avif";

export default function HeroSection() {
  const blogPosts = [
    {
      id: 1,
      title: "5 Summer Hair Trends That'll Make You Shine",
      excerpt:
        "Discover the hottest hair trends this summer and learn how to achieve them effortlessly with the right tools and techniques.",
      image: blog1,
      date: "July 15, 2024",
      readTime: "3 min read",
    },
    {
      id: 2,
      title: "The Science Behind Heat-Free Styling",
      excerpt:
        "Explore how modern styling technology protects your hair while delivering professional results without damaging heat.",
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

          <div className="max-w-2xl">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
              Sun's Out, Shine's On <span className="italic">Style</span>
              <br />
              <span className="italic">in 5 Minutes.</span>
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex text-green-400 text-lg mr-2">
                <span>★★★★★</span>
              </div>
              <span className="text-white text-sm underline">
                based on 4,210 reviews
              </span>
            </div>

            <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
              Beach-bar texture or sleek glass hair, all from the same tool. Summer-only savings end at midnight.
            </p>

            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <p className="text-gray-500 text-sm uppercase tracking-wider">
              Trusted by top brands
            </p>
          </div>
          <div className="flex justify-center items-center gap-6 flex-wrap px-4 sm:px-8">
            <img src={mark1} alt="Brand 1" className="h-10 sm:h-12 w-auto object-contain" />
            <img src={mark2} alt="Brand 2" className="h-10 sm:h-12 w-auto object-contain" />
            <img src={mark3} alt="Brand 3" className="h-10 sm:h-12 w-auto object-contain" />
            <img src={mark4} alt="Brand 4" className="h-10 sm:h-12 w-auto object-contain" />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Revolutionize Your Hair Routine
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                PerleBrush isn't just another styling tool – it's your gateway to effortless beauty. Our innovative
                technology combines the power of professional salon equipment with the convenience of at-home styling.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you're rushing to work or preparing for a special night out, achieve stunning results in just 5
                minutes. From beachy waves to sleek straight styles, one tool does it all.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="text-2xl font-bold text-orange-600">4.8/5</div>
                <div className="text-yellow-400 text-xl">★★★★★</div>
                <div className="text-gray-600 text-sm sm:text-base">Over 10,000 happy customers</div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div
                className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => (window.location.href = "/order")}
              >
                <div className="aspect-square rounded-xl mb-4 overflow-hidden">
                  <img
                    src={productImage}
                    alt="PerleBrush Product"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">PerleBrush Pro</h3>
                <p className="text-gray-600 mb-4">
                  Professional-grade styling tool with ceramic technology and ionic conditioning.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-orange-600">$89.99</div>
                  <div className="text-sm text-gray-500 line-through">$129.99</div>
                </div>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                  Order Now
                </button>
                <div className="text-center text-sm text-gray-500 mt-2">
                  Free shipping • 30-day guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Beauty Insights & Tips</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay ahead of the curve with expert styling tips, trend forecasts, and insider secrets from professional
              stylists around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100"
                onClick={() => (window.location.href = "/blog")}
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
                    <span>Read More</span>
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
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              onClick={() => (window.location.href = "/blog")}
            >
              View All Articles
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
