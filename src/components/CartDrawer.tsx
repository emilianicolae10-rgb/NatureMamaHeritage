import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { HiX, HiPlus, HiMinus, HiTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-white shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-heading text-2xl text-primary">Your Cart ({totalItems})</h2>
              <button onClick={onClose} className="text-2xl text-gray-500 hover:text-primary" aria-label="Close cart">
                <HiX />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-4 bg-warm rounded-xl p-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-primary text-sm truncate">{item.product.name}</h3>
                        <p className="text-accent text-sm font-semibold">${item.product.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-white border flex items-center justify-center text-sm hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <HiMinus />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-white border flex items-center justify-center text-sm hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <HiPlus />
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="ml-auto text-red-400 hover:text-red-600"
                            aria-label="Remove item"
                          >
                            <HiTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t p-6 space-y-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">${totalPrice.toFixed(2)}</span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="btn-primary w-full text-center block"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
