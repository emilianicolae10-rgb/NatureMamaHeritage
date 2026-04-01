import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../data/siteData';
import { HiX } from 'react-icons/hi';

export default function ImageGallery() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="section-title">Our World</h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">A glimpse into the fields, workshops, and communities behind our products.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="cursor-pointer overflow-hidden rounded-xl aspect-square"
              onClick={() => setSelected(img)}
            >
              <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-6 right-6 text-white text-3xl" aria-label="Close" onClick={() => setSelected(null)}>
              <HiX />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selected}
              alt="Gallery full view"
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
