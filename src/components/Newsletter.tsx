import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-accent/20 py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="section-title text-3xl md:text-4xl">Stay Connected</h2>
        <p className="text-gray-600 mb-8">Join our community for exclusive offers, wellness tips, and new product launches.</p>
        {submitted ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-primary font-medium text-lg">
            Welcome to the NatureMama family! 🌿
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-primary transition-colors"
              aria-label="Email address"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}
