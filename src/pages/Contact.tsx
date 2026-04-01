import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import MapSection from '../components/MapSection';
import Newsletter from '../components/Newsletter';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <div className="pt-24 section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-title"
            >
              Get in Touch
            </motion.h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              We'd love to hear from you. Whether it's a question, feedback, or partnership inquiry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Email</h3>
                    <p className="text-gray-600">hello@naturemamaheritage.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FaPhone />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Headquarters</h3>
                    <p className="text-gray-600">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-primary/5 rounded-2xl p-10 text-center"
                >
                  <p className="text-primary font-heading text-2xl mb-2">Thank you! 🌿</p>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                    aria-label="Your name"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                    aria-label="Your email"
                  />
                  <textarea
                    required
                    rows={5}
                    placeholder="Your message"
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary transition-colors resize-none"
                    aria-label="Your message"
                  />
                  <button type="submit" className="btn-primary w-full">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <MapSection />
      <Newsletter />
    </>
  );
}
