import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

interface FormData {
  fullName: string;
  email: string;
  street: string;
  postalCode: string;
  city: string;
  phone: string;
}

interface FormErrors {
  [key: string]: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s\-().]{7,20}$/;

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<FormData>({
    fullName: '', email: '', street: '', postalCode: '', city: '', phone: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!EMAIL_REGEX.test(form.email)) errs.email = 'Invalid email format';
    if (!form.street.trim()) errs.street = 'Street and house number are required';
    if (!form.postalCode.trim()) errs.postalCode = 'Postal code is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!PHONE_REGEX.test(form.phone)) errs.phone = 'Invalid phone format (e.g. +1 555 123 4567)';
    return errs;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) throw new Error('API URL not configured');

      const orderItems = items.map(i => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
      }));

      const res = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: form,
          items: orderItems,
          totalPrice: totalPrice,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Order failed');
      }

      const data = await res.json();
      setOrderNumber(data.orderNumber);
      clearCart();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (orderNumber) {
    return (
      <div className="pt-24 section-padding min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
          <h1 className="font-heading text-4xl text-primary mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">Your order number is:</p>
          <p className="text-2xl font-mono font-bold text-primary mb-6">{orderNumber}</p>
          <p className="text-gray-600 mb-8">
            A confirmation email with your order summary has been sent to <span className="font-medium">{form.email || 'your email'}</span>.
          </p>
          <Link to="/products" className="btn-primary">Continue Shopping</Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-24 section-padding min-h-screen">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="font-heading text-4xl text-primary mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products before checking out.</p>
          <Link to="/products" className="btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 section-padding min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="section-title text-center mb-12">Checkout</h1>
        <div className="grid md:grid-cols-5 gap-12">
          {/* Order form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
            <h2 className="font-heading text-2xl text-primary mb-2">Shipping Information</h2>
            {([
              { key: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
              { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
              { key: 'street', label: 'Street & House Number', type: 'text', placeholder: '123 Main Street' },
              { key: 'postalCode', label: 'Postal Code', type: 'text', placeholder: '10001' },
              { key: 'city', label: 'City', type: 'text', placeholder: 'New York' },
              { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 555 123 4567' },
            ] as const).map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => handleChange(f.key, e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none ${
                    errors[f.key] ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-primary'
                  }`}
                />
                {errors[f.key] && <p className="text-red-500 text-xs mt-1">{errors[f.key]}</p>}
              </div>
            ))}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Placing Order...' : `Place Order — $${totalPrice.toFixed(2)}`}
            </button>
          </form>

          {/* Order summary */}
          <div className="md:col-span-2">
            <div className="bg-warm rounded-2xl p-6 sticky top-24">
              <h2 className="font-heading text-2xl text-primary mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.product.name} <span className="text-gray-400">x{item.quantity}</span>
                    </span>
                    <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
