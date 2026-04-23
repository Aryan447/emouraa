export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Our Story</p>
        <h1 className="text-5xl md:text-7xl font-serif mb-12">The Art of Subtlety</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Emouraa was born from a simple belief: that fashion should be an art form, 
            not just a necessity. We bridge the gap between runway innovation and 
            everyday elegance.
          </p>
          
          <p className="text-gray-600 leading-relaxed mb-8">
            Our curated collection represents the finest in contemporary fashion, 
            sourced from ateliers around the world who share our commitment to 
            craftsmanship, quality, and timeless design.
          </p>
          
          <p className="text-gray-600 leading-relaxed mb-8">
            Each piece in our collection is selected for its ability to transcend 
            seasonal trends, creating a wardrobe that endures beyond the fleeting 
            moments of fashion.
          </p>

          <h2 className="text-3xl font-serif mt-16 mb-6">Our Philosophy</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            We believe in the power of subtlety. The quiet confidence of a perfectly 
            tailored coat, the understated luxury of fine materials, the art of 
            making a statement without saying a word.
          </p>

          <h2 className="text-3xl font-serif mt-16 mb-6">Sustainability</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Quality over quantity is at the heart of everything we do. We partner 
            with makers who share our values of ethical production and sustainable 
            practices, ensuring that each piece is as responsible as it is beautiful.
          </p>
        </div>
      </div>
    </div>
  );
}