import React from 'react';
import { motion } from 'framer-motion';

/**
 * ProblemAgitation - 3-card problem showcase for experienced operators
 * Revised copy: Calm, operational, no fear-mongering
 * Focus: Fragmented data architecture, lack of actionable insights, time drain
 */
export const ProblemAgitation: React.FC = () => {
  const problems = [
    {
      number: '01',
      title: 'Fragmented Attribution',
      headline: 'Your Tools Give You Different Numbers',
      description: 'Meta says ROAS is 3.2. Google says 2.4. Your dashboard says 2.8. Shopify shows something else entirely.',
      insight: 'Without connected data, you\'re making significant spending decisions based on incomplete information.',
      color: 'shopify'
    },
    {
      number: '02',
      title: 'Dashboards Without Direction',
      headline: 'You Can See the Problem. You Can\'t See the Fix.',
      description: 'Your analytics show conversion dropped 12% last month. They don\'t show which pages are causing drop-off or what to change first.',
      insight: 'More data isn\'t the answer. Diagnosis is.',
      color: 'electric'
    },
    {
      number: '03',
      title: 'The Hidden Cost: Your Time',
      headline: 'Every Week, You\'re Doing an Agency\'s Job',
      description: 'You spend 3-5 hours checking dashboards, cross-referencing data, and trying to figure out what\'s actually happening.',
      insight: 'That\'s 150-250 hours per year of your attention—spent on work that should be automated.',
      color: 'gold'
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-zilla-dark">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-zilla opacity-10" style={{ backgroundSize: '50px 50px' }} />

      {/* Radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-zilla-radial opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">The Real Problem Isn't Your Data.</span>
            <br />
            <span className="text-transparent bg-clip-text bg-zilla-gradient">It's Your Data Architecture.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            You're paying for 5-8 different tools. Each one shows you a piece of the picture.
            None of them shows you the full picture—or tells you what to do about it.
          </p>
        </motion.div>

        {/* 3-card problem showcase */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative h-full bg-zilla-surface rounded-2xl p-8 border border-zilla-muted hover:border-zilla-shopify/30 transition-all duration-300">
                {/* Number badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zilla-${problem.color}/10 border border-zilla-${problem.color}/20 mb-6`}>
                  <span className={`text-xs font-mono text-zilla-${problem.color}`}>{problem.number}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">{problem.title}</span>
                </div>

                {/* Headline */}
                <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                  {problem.headline}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                  {problem.description}
                </p>

                {/* Insight */}
                <div className="pt-4 border-t border-zilla-muted/30">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {problem.insight}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom insight */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 max-w-3xl mx-auto"
        >
          <p className="text-lg text-gray-400 leading-relaxed">
            You already have the data you need. It's scattered across tools that don't communicate.
            <span className="text-white"> The solution isn't more data—it's a system that connects what you already have.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemAgitation;
