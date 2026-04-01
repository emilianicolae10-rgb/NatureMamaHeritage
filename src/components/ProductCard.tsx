import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import type { products } from '../data/siteData';
import { FaCheck } from 'react-icons/fa';
import { useState } from 'react';

type Product = (typeof products)[number];

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <span className="text-xs uppercase tracking-wider text-accent font-medium">{product.category}</span>
        <h3 className="font-heading text-xl text-primary mt-1 mb-2">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-primary text-white hover:bg-primary-light'
            }`}
          >
            {added ? <><FaCheck /> Added</> : 'Add to Cart'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
