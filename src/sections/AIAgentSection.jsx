import { motion } from 'framer-motion';
import AIAgent from '../components/AIAgent.jsx';

const AIAgentSection = () => {
  return (
    <section id="ai-agent" className="py-16 bg-black-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Representative</h2>
          <p className="text-white-600 max-w-2xl mx-auto">
            Experience a new way to learn about my professional journey. Soon, you'll be able to have interactive
            conversations with my AI representative.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AIAgent />
        </div>
      </div>
    </section>
  );
};

export default AIAgentSection;
