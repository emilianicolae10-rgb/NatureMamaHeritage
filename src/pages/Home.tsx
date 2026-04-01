import HeroVideo from '../components/HeroVideo';
import StatsBar from '../components/StatsBar';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import ImageGallery from '../components/ImageGallery';
import YouTubeSection from '../components/YouTubeSection';
import Newsletter from '../components/Newsletter';
import ProductCard from '../components/ProductCard';
import { products } from '../data/siteData';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function FeaturedProducts() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="section-title">Featured Products</h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">Handpicked favorites from our heritage collection.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
        <Link to="/products" className="btn-outline mt-12">View All Products</Link>
      </div>
    </section>
  );
}

function MissionPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <section ref={ref} className="section-padding bg-warm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h2 className="section-title text-3xl md:text-4xl">Rooted in Nature,<br />Crafted with Love</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            At NatureMama Heritage, we believe in the power of ancestral wisdom combined with modern sustainability.
            Every product tells a story — of the land it comes from, the hands that crafted it, and the traditions that inspired it.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Our target? Conscious consumers who value authenticity, sustainability, and wellness.
            Families, health enthusiasts, and anyone seeking a deeper connection with nature.
          </p>
          <Link to="/about" className="btn-primary">Discover Our Story</Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1"
        >
          <img
            src="https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=800"
            alt="Nature and heritage"
            className="rounded-2xl shadow-lg w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroVideo />
      <StatsBar />
      <FeaturedProducts />
      <MissionPreview />
      <YouTubeSection
        title="Our Harvesting Process"
        description="Watch how we sustainably source our ingredients from heritage farms, working hand-in-hand with local communities to preserve traditional methods while meeting modern quality standards."
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      />
      <ImageGallery />
      <TestimonialsCarousel />
      <YouTubeSection
        title="Meet the Makers"
        description="Behind every NatureMama product is a community of artisans, farmers, and wellness experts dedicated to bringing you the finest natural goods."
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        reverse
      />
      <Newsletter />
    </>
  );
}
