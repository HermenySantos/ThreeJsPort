import { useState, useEffect } from 'react';

const GitHubContributions = ({ username }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState({
    repos: 0,
    publicRepos: 0,
    privateRepos: 0,
    stars: 0,
    followers: 0,
    contributions: 0,
  });
  const [contributionData, setContributionData] = useState(null);
  const [error, setError] = useState(null);
  const [useApiEndpoint, setUseApiEndpoint] = useState(false);
  const [hasPrivateAccess, setHasPrivateAccess] = useState(false);

  useEffect(() => {
    // Check if we're in development mode
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    // In development, check the API endpoint directly
    if (isDevelopment) {
      // Try to use our serverless API but fallback gracefully
      fetch('/api/github/stats?username=' + username, { method: 'HEAD' })
        .then((response) => {
          if (response.ok) {
            setUseApiEndpoint(true);
          } else {
            setUseApiEndpoint(false);
          }
        })
        .catch(() => {
          setUseApiEndpoint(false);
        })
        .finally(() => {
          fetchGitHubStats();
        });
    } else {
      // In production, just use the GitHub API directly for now
      // This can be updated once the serverless functions are deployed
      setUseApiEndpoint(false);
      fetchGitHubStats();
    }
  }, [username]);

  const fetchGitHubStats = async () => {
    setIsLoaded(false);
    setError(null);

    try {
      if (useApiEndpoint) {
        // Fetch from secure API endpoint (with private repo access)
        const statsResponse = await fetch(`/api/github/stats?username=${username}`);

        if (!statsResponse.ok) {
          throw new Error(`API returned ${statsResponse.status}: ${statsResponse.statusText}`);
        }

        const statsData = await statsResponse.json();

        // Check if we have access to private repositories
        setHasPrivateAccess(statsData.hasPrivateAccess);

        // Fetch contribution calendar for heatmap
        const calendarResponse = await fetch(`/api/github/contributions?username=${username}`);
        if (calendarResponse.ok) {
          const calendarData = await calendarResponse.json();
          setContributionData(calendarData.contributionCalendar);
        }

        setStats({
          repos: statsData.repos,
          publicRepos: statsData.publicRepos,
          privateRepos: statsData.privateRepos,
          stars: statsData.stars,
          followers: statsData.followers,
          contributions: statsData.contributions,
        });
      } else {
        // Fallback to public API (no private repo access)
        // Fetch user profile data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);

        if (!userResponse.ok) {
          throw new Error(`GitHub API returned ${userResponse.status}: ${userResponse.statusText}`);
        }

        const userData = await userResponse.json();

        // Fetch repositories to calculate stars
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await reposResponse.json();

        // Calculate total stars
        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

        // Estimate contributions (since we can't access private contributions without auth)
        const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
        const events = await eventsResponse.json();
        const estimatedContributions = events.filter((event) => event.type === 'PushEvent').length * 15;

        setStats({
          repos: userData.public_repos,
          publicRepos: userData.public_repos,
          privateRepos: 0,
          stars: totalStars,
          followers: userData.followers,
          contributions: estimatedContributions || userData.public_repos * 30, // Fallback estimation
        });

        setHasPrivateAccess(false);
      }

      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      setError(error.message);

      // Set fallback data in case of error
      setStats({
        repos: 35,
        publicRepos: 11,
        privateRepos: 24,
        stars: 183,
        followers: 59,
        contributions: 872,
      });
      setIsLoaded(true);
    }
  };

  return (
    <div className="github-contributions-container relative overflow-hidden rounded-lg">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black-300 bg-opacity-70 z-10">
          <div className="loading-spinner"></div>
        </div>
      )}

      <div className="p-4 bg-black-200 bg-opacity-70 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img
              src="/assets/github/github-icon.svg"
              alt="GitHub"
              className="w-8 h-8 mr-3 text-white"
              style={{ filter: 'invert(1)' }}
            />
            <h3 className="text-xl font-bold text-white">GitHub Contributions</h3>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 transition-colors flex items-center text-sm">
            <span>@{username}</span>
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
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
            <p className="text-red-400 text-sm">{error} - Showing estimated data instead.</p>
          </div>
        )}

        {!hasPrivateAccess && (
          <div className="mb-6 p-3 bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded-lg">
            <p className="text-yellow-400 text-sm">
              {useApiEndpoint
                ? 'Showing only public repositories (private access not available)'
                : 'Using public GitHub API - private repositories and contributions are not included.'}
            </p>
          </div>
        )}

        {/* GitHub Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-black-300 bg-opacity-40 rounded-lg">
            <div className="text-xl font-bold text-white">{stats.repos}</div>
            <div className="text-sm text-white-600">Repositories</div>
          </div>
          {hasPrivateAccess && stats.privateRepos > 0 && (
            <div className="text-center p-3 bg-black-300 bg-opacity-40 rounded-lg">
              <div className="text-xl font-bold text-white">{stats.privateRepos}</div>
              <div className="text-sm text-white-600">Private</div>
            </div>
          )}
          <div className="text-center p-3 bg-black-300 bg-opacity-40 rounded-lg">
            <div className="text-xl font-bold text-white">{stats.stars}</div>
            <div className="text-sm text-white-600">Stars</div>
          </div>
          <div className="text-center p-3 bg-black-300 bg-opacity-40 rounded-lg">
            <div className="text-xl font-bold text-white">{stats.followers}</div>
            <div className="text-sm text-white-600">Followers</div>
          </div>
          <div className="text-center p-3 bg-black-300 bg-opacity-40 rounded-lg col-span-2 md:col-span-1">
            <div className="text-xl font-bold text-white">{stats.contributions}</div>
            <div className="text-sm text-white-600">{hasPrivateAccess ? 'Contributions' : 'Est. Contributions'}</div>
          </div>
        </div>

        <div className="iframe-container bg-black-300 bg-opacity-50 p-3 rounded-lg overflow-hidden">
          {/* Render custom contribution graph if we have the data, otherwise fallback to external service */}
          {contributionData ? (
            <div className="custom-contribution-graph">
              {/* Custom graph rendering would go here */}
              <p className="text-center text-white-600 text-sm py-4">
                Custom contribution graph with {contributionData.totalContributions} contributions
              </p>
            </div>
          ) : (
            <iframe
              src={`https://ghchart.rshah.org/${username}`}
              width="100%"
              height="100"
              frameBorder="0"
              scrolling="no"
              className="block mx-auto github-chart"
              style={{ backgroundColor: 'transparent' }}
              onLoad={() => setIsLoaded(true)}
            />
          )}
        </div>

        <div className="flex justify-between text-xs text-white-600 mt-2 px-3">
          <span>Less</span>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="w-3 h-3 rounded"
                style={{
                  backgroundColor: `rgba(59, 130, 246, ${level * 0.25})`,
                }}
              />
            ))}
          </div>
          <span>More</span>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-white-600 text-sm">
            {hasPrivateAccess
              ? 'Visualizing my complete GitHub activity including private repositories.'
              : 'Visualizing my public GitHub activity.'}
          </p>
          <a
            href={`https://github.com/sponsors/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-full transition-colors duration-300 flex items-center">
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
              className="mr-1">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>Sponsor</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default GitHubContributions;
