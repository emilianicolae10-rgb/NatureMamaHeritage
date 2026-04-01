import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
// @ts-expect-error swiper css imports
import 'swiper/css';
// @ts-expect-error swiper css imports
import 'swiper/css/pagination';
import { testimonials } from '../data/siteData';
import { FaStar } from 'react-icons/fa';

export default function TestimonialsCarousel() {
  return (
    <section className="section-padding bg-warm">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">Real stories from our community of wellness enthusiasts.</p>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 } }}
          className="pb-12"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-2xl p-8 shadow-sm text-left">
                <div className="flex gap-1 text-accent mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => <FaStar key={j} />)}
                </div>
                <p className="text-gray-700 italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <span className="font-medium text-primary">{t.name}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
