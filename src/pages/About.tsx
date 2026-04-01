import Timeline from '../components/Timeline';
import YouTubeSection from '../components/YouTubeSection';
import StatsBar from '../components/StatsBar';
import MapSection from '../components/MapSection';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function HeroBanner() {
  return (
    <section className="pt-24 section-padding bg-warm">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-title text-5xl md:text-6xl"
        >
          Our Story
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto text-lg"
        >
          From a village kitchen to a global heritage brand — driven by a love for nature and a commitment to community.
        </motion.p>
      </div>
    </section>
  );
}

function MissionSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-3xl">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            To honor ancestral wisdom by creating sustainable, ethically sourced natural products that nourish body, mind, and community.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We partner directly with smallholder farmers and artisan communities, ensuring fair trade practices and preserving traditional knowledge for future generations.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="section-title text-3xl">Who We Serve</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our community includes health-conscious families, wellness enthusiasts, eco-minded millennials, and anyone seeking authentic, natural alternatives.
          </p>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2"><span className="text-accent mt-1">●</span> Parents seeking safe, natural products for their families</li>
            <li className="flex items-start gap-2"><span className="text-accent mt-1">●</span> Wellness practitioners and holistic health advocates</li>
            <li className="flex items-start gap-2"><span className="text-accent mt-1">●</span> Eco-conscious consumers who value sustainability</li>
            <li className="flex items-start gap-2"><span className="text-accent mt-1">●</span> Cultural heritage enthusiasts and ethical shoppers</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <HeroBanner />
      <MissionSection />
      <StatsBar />
      <Timeline />
      <YouTubeSection
        title="The NatureMama Story"
        description="Hear from our founder about the inspiration behind NatureMama Heritage and our vision for a more sustainable, connected world."
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      />
      <MapSection />
    </>
  );
}
