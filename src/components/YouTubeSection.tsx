import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Props {
  title: string;
  description: string;
  videoUrl: string;
  reverse?: boolean;
}

function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default function YouTubeSection({ title, description, videoUrl, reverse }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="section-padding">
      <div className={`max-w-6xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
        <motion.div
          initial={{ opacity: 0, x: reverse ? 40 : -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h2 className="section-title text-3xl md:text-4xl">{title}</h2>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: reverse ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full aspect-video rounded-2xl overflow-hidden shadow-lg"
        >
          <iframe
            src={getYouTubeEmbedUrl(videoUrl)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </motion.div>
      </div>
    </section>
  );
}
