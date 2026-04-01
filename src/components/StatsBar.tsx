import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { stats } from '../data/siteData';

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsBar() {
  return (
    <section className="bg-primary text-white py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <div className="text-4xl md:text-5xl font-heading font-bold mb-2">
              <AnimatedNumber target={s.value} suffix={s.suffix} />
            </div>
            <div className="text-white/70 text-sm uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
