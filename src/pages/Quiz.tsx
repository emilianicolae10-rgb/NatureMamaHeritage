import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions, products } from '../data/siteData';
import ProductCard from '../components/ProductCard';

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const handleAnswer = (tags: string[]) => {
    const newTags = [...selectedTags, ...tags];
    setSelectedTags(newTags);
    if (step + 1 < quizQuestions.length) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const getRecommendations = () => {
    const scored = products.map(p => ({
      ...p,
      score: p.tags.filter(t => selectedTags.includes(t)).length,
    }));
    return scored.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  const restart = () => {
    setStep(0);
    setSelectedTags([]);
    setDone(false);
  };

  return (
    <div className="pt-24 section-padding min-h-screen">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="section-title">Find Your Perfect Match</h1>
        <p className="text-gray-600 mb-12">Answer a few questions and we'll recommend the best NatureMama products for you.</p>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 text-sm text-gray-400">
                Question {step + 1} of {quizQuestions.length}
              </div>
              <div className="w-full bg-warm rounded-full h-2 mb-8">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((step + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl text-primary mb-8">
                {quizQuestions[step].question}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quizQuestions[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.tags)}
                    className="p-5 rounded-xl border-2 border-gray-200 text-left hover:border-primary hover:bg-primary/5 transition-all text-gray-700 font-medium"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-3xl text-primary mb-4">Your Recommendations 🌿</h2>
              <p className="text-gray-600 mb-10">Based on your answers, here are our top picks for you:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
                {getRecommendations().map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <button onClick={restart} className="btn-outline">Retake Quiz</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
