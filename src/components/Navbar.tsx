import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiShoppingCart } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/quiz', label: 'Find Your Match' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { pathname } = useLocation();
  const { totalItems } = useCart();

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <Link to="/" className="font-heading text-2xl text-primary font-bold tracking-tight">
            NatureMama<span className="text-accent">Heritage</span>
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === l.to ? 'text-primary' : 'text-gray-600'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-xl text-primary hover:text-primary-light transition-colors"
              aria-label="Open cart"
            >
              <HiShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-xl text-primary"
              aria-label="Open cart"
            >
              <HiShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="text-2xl text-primary" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t overflow-hidden"
            >
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-3 text-gray-700 hover:bg-warm transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
