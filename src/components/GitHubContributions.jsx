import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Animation variants
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

const GitHubContributions = ({ username }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [hasPrivateAccess, setHasPrivateAccess] = useState(false);

  useEffect(() => {
    // Set a timeout to simulate loading and then show the contribution map
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [username]);

  return (
    <motion.div
      className="github-contributions-container relative overflow-hidden rounded-2xl bg-gradient-to-br from-black-200 to-black-300 border border-black-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black-300 bg-opacity-80 z-10 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-3 text-white-600">Loading GitHub data...</p>
          </div>
        </div>
      )}

      <div className="p-6">
        <motion.div className="flex items-center justify-between mb-6" variants={itemVariants}>
          <div className="flex items-center">
            <img
              src="/assets/github/github-icon.svg"
              alt="GitHub"
              className="w-10 h-10 mr-3"
              style={{ filter: 'invert(1)' }}
            />
            <h3 className="text-2xl font-bold text-white">GitHub Contributions</h3>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 transition-colors flex items-center text-sm bg-black-300 bg-opacity-60 py-2 px-4 rounded-full hover:bg-opacity-80">
            <span className="text-blue-400">@{username}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </motion.div>

        {/* GitHub Contribution Map */}
        <motion.div
          className="bg-black-300 bg-opacity-60 backdrop-blur-sm p-4 rounded-2xl overflow-hidden mb-4"
          variants={itemVariants}>
          <div className="relative">
            <iframe
              src={`https://ghchart.rshah.org/${username}`}
              width="100%"
              height="110"
              frameBorder="0"
              scrolling="no"
              className="block mx-auto github-chart"
              style={{ backgroundColor: 'transparent' }}
              onLoad={() => setIsLoaded(true)}
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black-300 to-transparent opacity-0"></div>
          </div>
        </motion.div>

        <motion.div className="flex justify-between text-xs text-white-600 px-4 mb-6" variants={itemVariants}>
          <span>Less</span>
          <div className="flex items-center space-x-1">
            {[0.2, 0.4, 0.6, 0.8].map((level, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded"
                style={{
                  backgroundColor: `rgba(59, 130, 246, ${level})`,
                }}
              />
            ))}
          </div>
          <span>More</span>
        </motion.div>

        <motion.div className="flex items-center justify-between gap-4" variants={itemVariants}>
          <p className="text-white-600 text-sm">Visualizing my GitHub activity</p>
          <a
            href={`https://github.com/sponsors/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-full transition-all duration-300 flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/20 whitespace-nowrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 group-hover:animate-pulse">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>Sponsor on GitHub</span>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GitHubContributions;
