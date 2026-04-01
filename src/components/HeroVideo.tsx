import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroVideo() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-green-leaves-in-sunlight-1584/1080p.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight"
        >
          Nature's Heritage,<br />Your Wellness
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl max-w-2xl mb-10 text-white/90"
        >
          Ethically sourced, ancestrally inspired natural products for modern living.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <Link to="/products" className="btn-primary text-lg">Shop Now</Link>
          <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg">Our Story</Link>
        </motion.div>
      </div>
    </section>
  );
}
