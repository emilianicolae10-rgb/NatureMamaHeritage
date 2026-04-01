import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white/80">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-heading text-2xl text-white mb-4">NatureMama<span className="text-accent">Heritage</span></h3>
          <p className="text-sm leading-relaxed">Rooted in tradition, crafted for modern wellness. Bringing nature's finest heritage to your doorstep.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/products" className="hover:text-accent transition-colors">Products</Link>
            <Link to="/about" className="hover:text-accent transition-colors">Our Story</Link>
            <Link to="/quiz" className="hover:text-accent transition-colors">Product Quiz</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Our Mission</h4>
          <p className="text-sm leading-relaxed">Empowering communities through sustainable, ethically sourced natural products that honor ancestral wisdom.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <a href="#" aria-label="Instagram" className="hover:text-accent transition-colors"><FaInstagram /></a>
            <a href="#" aria-label="Facebook" className="hover:text-accent transition-colors"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter" className="hover:text-accent transition-colors"><FaTwitter /></a>
            <a href="#" aria-label="YouTube" className="hover:text-accent transition-colors"><FaYoutube /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-6 text-xs">
        &copy; {new Date().getFullYear()} NatureMama Heritage. All rights reserved.
      </div>
    </footer>
  );
}
