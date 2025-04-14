import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

const AIAgent = () => {
  // State to track if animation has played
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  // Function to handle animation completion
  const handleAnimationComplete = () => {
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black-200 to-black-300 border border-black-100 p-6 md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={handleAnimationComplete}
      ref={containerRef}>
      {/* Header */}
      <motion.div className="flex items-center justify-between mb-8" variants={itemVariants}>
        <div className="flex items-center">
          <div className="w-10 h-10 mr-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">AI Agent</h3>
        </div>
        <span className="px-3 py-1 text-xs bg-blue-500 text-white rounded-full">Coming Soon</span>
      </motion.div>

      {/* Main content */}
      <motion.div className="bg-black-300 bg-opacity-60 backdrop-blur-sm p-6 rounded-2xl mb-6" variants={itemVariants}>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 mb-6">
            <div className="w-full h-full rounded-full bg-black-300 flex items-center justify-center overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          <h4 className="text-xl font-bold text-white mb-3">Interactive AI Representative</h4>
          <p className="text-white-600 text-center mb-6">
            Soon, you'll be able to chat with my AI agent that knows all about my projects, experience, and skills. Ask
            specific questions about my work and get immediate responses as if you were talking directly with me.
          </p>

          {/* Simulated placeholder conversation */}
          <div className="w-full max-w-md bg-black-200 rounded-xl p-4 mb-4">
            <div className="flex items-start mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-700 mr-3 flex-shrink-0 flex items-center justify-center text-xs text-white">
                You
              </div>
              <div className="bg-gray-800 rounded-lg p-3 text-white-600 text-sm">
                Tell me about your experience with React and Next.js
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 mr-3 flex-shrink-0 flex items-center justify-center text-xs text-white">
                AI
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-3 text-white text-sm">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-75"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black-200 rounded-xl p-4 w-full max-w-md">
            <div className="text-white-600 text-xs text-center">Features coming soon:</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                'Project Inquiries',
                'Work Experience',
                'Technical Skills',
                'Education',
                'Personal Interests',
                'Availability',
              ].map((feature, i) => (
                <div key={i} className="flex items-center text-xs text-white-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div className="flex justify-between items-center" variants={itemVariants}>
        <p className="text-white-600 text-sm">Get immediate answers about my professional background</p>
        <div className="px-5 py-2.5 bg-gray-800 text-white-600 text-sm rounded-full">Coming in 2025</div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 opacity-20 rounded-full blur-2xl"></div>
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500 opacity-20 rounded-full blur-2xl"></div>
    </motion.div>
  );
};

export default AIAgent;
