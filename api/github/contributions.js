// Serverless function to fetch GitHub contribution calendar data
// This should be deployed to a serverless platform (Vercel, Netlify, etc.)

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

    // First check if the authenticated user matches the requested username
    const { data: authUserData } = await octokit.users.getAuthenticated();
    const isAuthUser = authUserData.login.toLowerCase() === username.toLowerCase();

    // Fetch contribution calendar data using GraphQL API
    // For authenticated user we use 'viewer' to get private contributions
    // Otherwise use 'user' to get public contributions
    const query = isAuthUser
      ? `
        query {
          viewer {
            contributionsCollection {
              contributionCalendar {
                colors
                totalContributions
                weeks {
                  contributionDays {
                    color
                    contributionCount
                    date
                    weekday
                  }
                  firstDay
                }
              }
            }
          }
        }
      `
      : `
        query {
          user(login: "${username}") {
            contributionsCollection {
              contributionCalendar {
                colors
                totalContributions
                weeks {
                  contributionDays {
                    color
                    contributionCount
                    date
                    weekday
                  }
                  firstDay
                }
              }
            }
          }
        }
      `;

    const { data } = await octokit.graphql(query);

    // Extract the contribution calendar from the right path based on the query
    const contributionCalendar = isAuthUser
      ? data.viewer.contributionsCollection.contributionCalendar
      : data.user.contributionsCollection.contributionCalendar;

    // Return calendar data in JSON format with info about access level
    return res.status(200).json({
      contributionCalendar,
      hasPrivateAccess: isAuthUser,
      username,
      totalContributions: contributionCalendar.totalContributions,
    });
  } catch (error) {
    console.error('Error fetching GitHub contribution calendar:', error);

    // Return error but don't expose sensitive details
    return res.status(500).json({
      error: 'Failed to fetch GitHub contribution calendar',
      message: error.message,
    });
  }
}
