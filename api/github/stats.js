// Serverless function to fetch GitHub statistics with private repository access
// This should be deployed to a serverless platform (Vercel, Netlify, etc.)

// Imports the Octokit REST client to interact with GitHub's REST API
import { Octokit } from '@octokit/rest';

export default async function handler(req, res) {
  // CORS headers to allow requests from your frontend
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );

  // Handle OPTIONS request (preflight CORS check)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Your GitHub Personal Access Token should be set as an environment variable
    // NEVER hardcode this value in your code, especially for a public repository
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      throw new Error('GitHub token is not configured');
    }

    // Get username from query or use default
    const username = req.query.username || 'HermenySantos';

    // Initialize Octokit with your token
    const octokit = new Octokit({
      auth: token,
    });

    // Fetch user data
    const { data: userData } = await octokit.users.getByUsername({
      username,
    });

    // Fetch authenticated user data to get private repo count
    const { data: authUserData } = await octokit.users.getAuthenticated();

    // Check if authenticated user matches requested username
    // We can only access private repos for the authenticated user
    const isAuthUser = authUserData.login.toLowerCase() === username.toLowerCase();

    // Fetch all repositories (both public and private) using the correct endpoint
    const { data: repos } = isAuthUser
      ? await octokit.repos.listForAuthenticatedUser({
          per_page: 100,
          visibility: 'all',
        })
      : await octokit.repos.listForUser({
          username,
          per_page: 100,
          type: 'public',
        });

    // Calculate total stars across all repos
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

    // Count private repos
    const privateRepos = repos.filter((repo) => repo.private).length;
    const publicRepos = userData.public_repos;
    const totalRepos = isAuthUser ? publicRepos + privateRepos : publicRepos;

    // Calculate contributions if this is the authenticated user
    let totalContributions = 0;

    if (isAuthUser) {
      try {
        // Use GraphQL to get total contributions (includes private)
        const { data: contributionsData } = await octokit.graphql(`
          query {
            viewer {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                }
              }
            }
          }
        `);

        totalContributions = contributionsData.viewer.contributionsCollection.contributionCalendar.totalContributions;
      } catch (error) {
        console.error('Error fetching contribution data:', error);

        // Fallback: Estimate based on commit events
        try {
          const { data: events } = await octokit.activity.listEventsForAuthenticatedUser({
            username,
            per_page: 100,
          });

          // Roughly estimate contributions based on push events
          const pushEvents = events.filter((event) => event.type === 'PushEvent');
          totalContributions = pushEvents.length * 15; // Rough estimate
        } catch (fallbackError) {
          console.error('Error with fallback contribution calculation:', fallbackError);
          totalContributions = repos.length * 30; // Very rough estimate
        }
      }
    } else {
      // For non-authenticated users, we can only see public contributions
      try {
        const { data: events } = await octokit.activity.listPublicEventsForUser({
          username,
          per_page: 100,
        });

        // Roughly estimate contributions based on public activity
        const pushEvents = events.filter((event) => event.type === 'PushEvent');
        totalContributions = pushEvents.length * 10;
      } catch (error) {
        console.error('Error estimating public contributions:', error);
        totalContributions = publicRepos * 25; // Very rough estimate
      }
    }

    // Return stats in JSON format
    return res.status(200).json({
      repos: totalRepos,
      publicRepos: publicRepos,
      privateRepos: isAuthUser ? privateRepos : 0,
      stars: totalStars,
      followers: userData.followers,
      contributions: totalContributions,
      hasPrivateAccess: isAuthUser,
      avatar_url: userData.avatar_url,
      html_url: userData.html_url,
    });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);

    // Return error but don't expose sensitive details
    return res.status(500).json({
      error: 'Failed to fetch GitHub statistics',
      message: error.message,
    });
  }
}
