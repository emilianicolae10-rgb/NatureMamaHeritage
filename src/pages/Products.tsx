import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { products } from '../data/siteData';

const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

export default function Products() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? products : products.filter(p => p.category === active);

  return (
    <div className="pt-24 section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="section-title">Our Products</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Each product is a tribute to nature's finest, crafted with care and rooted in heritage.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? 'bg-primary text-white'
                  : 'bg-warm text-gray-600 hover:bg-warm-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(p => (
            <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
