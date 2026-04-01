import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { timelineEvents } from '../data/siteData';

function TimelineItem({ event, index }: { event: typeof timelineEvents[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`flex items-center gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex-1 hidden md:block"
      >
        {isLeft && (
          <div className="bg-white rounded-2xl p-6 shadow-sm text-right">
            <span className="text-accent font-heading text-2xl font-bold">{event.year}</span>
            <h3 className="text-xl font-semibold text-primary mt-1">{event.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{event.description}</p>
          </div>
        )}
      </motion.div>
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3 }}
          className="w-4 h-4 rounded-full bg-accent border-4 border-white shadow"
        />
        {index < timelineEvents.length - 1 && <div className="w-0.5 h-20 bg-accent/30" />}
      </div>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex-1"
      >
        {(!isLeft || true) && (
          <div className={`bg-white rounded-2xl p-6 shadow-sm ${isLeft ? 'md:hidden' : ''}`}>
            <span className="text-accent font-heading text-2xl font-bold">{event.year}</span>
            <h3 className="text-xl font-semibold text-primary mt-1">{event.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{event.description}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="section-title">Our Journey</h2>
        <p className="text-gray-600">From humble beginnings to a global heritage brand.</p>
      </div>
      <div className="max-w-4xl mx-auto">
        {timelineEvents.map((event, i) => (
          <TimelineItem key={i} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}
