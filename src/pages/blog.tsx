export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-12 sm:px-6 lg:px-24">
      <article className="max-w-4xl mx-auto">
        {/* Cover Image */}
        <img
          src="https://images.unsplash.com/photo-1522337660859-02fbefca4702"
          alt="Hair Styling Inspiration"
          className="w-full h-64 object-cover rounded-xl shadow-lg mb-8"
        />

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
          Unlock Effortless Style: Why the 5-in-1 PerleBrush Is a Game Changer
        </h1>

        {/* Author & Date */}
        <div className="text-sm text-gray-500 mb-8">
          By <span className="font-medium text-gray-700">Lea Dubois</span> • July 16, 2025
        </div>

        {/* Article Body */}
        <div className="prose max-w-none prose-p:leading-relaxed prose-h2:mt-10 prose-h2:mb-4">
          <p>
            In today’s fast-paced world, we all want to look great without spending hours in front of the mirror.
            That’s where the PerleBrush Styler 5-in-1 shines. Whether you’re rushing to a meeting or prepping for a
            night out, this sleek tool gets you ready in minutes.
          </p>

          <h2>What Makes It Special?</h2>
          <p>
            The PerleBrush combines drying, straightening, curling, volumizing, and scalp massage into one device.
            It’s gentle on your hair and delivers salon-quality results from the comfort of your home.
          </p>

          <p>
            Say goodbye to bulky tools cluttering your vanity — the PerleBrush simplifies your routine without
            sacrificing performance.
          </p>
        </div>
      </article>
    </div>
  );
}
