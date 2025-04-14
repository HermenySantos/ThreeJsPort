// Simple test script to verify GitHub token works
// Run with: node test-github-token.js

import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const token = process.env.GITHUB_TOKEN;
const username = 'HermenySantos';

async function testGitHubToken() {
  console.log('Testing GitHub token...');

  if (!token) {
    console.error('❌ Error: GitHub token not found in environment variables');
    console.log('Make sure you have GITHUB_TOKEN set in your .env file');
    return;
  }

  console.log(`✅ Token found: ${token.substring(0, 4)}...${token.substring(token.length - 4)}`);

  try {
    // Initialize Octokit with your token
    const octokit = new Octokit({
      auth: token,
    });

    // Check token scopes
    console.log('\nChecking token scopes...');
    try {
      const { headers } = await octokit.request('GET /');
      const scopes = headers['x-oauth-scopes'] || 'none';
      console.log(`✅ Token scopes: ${scopes}`);

      // Check for repo scope which is required for private repo access
      if (scopes.includes('repo')) {
        console.log('✅ Token has "repo" scope - can access private repositories');
      } else {
        console.log('❌ Token lacks "repo" scope - cannot access private repositories');
        console.log('Please create a new token with the "repo" scope enabled.');
      }
    } catch (error) {
      console.error('❌ Error checking token scopes:', error.message);
    }

    // Test 1: Get user data
    console.log(`\nFetching user data for ${username}...`);
    const { data: userData } = await octokit.users.getByUsername({
      username,
    });

    console.log('✅ User data successfully fetched:');
    console.log(`  Name: ${userData.name || 'N/A'}`);
    console.log(`  Public repos: ${userData.public_repos}`);
    console.log(`  Private repos (if visible): ${userData.total_private_repos || 'Not accessible'}`);
    console.log(`  Followers: ${userData.followers}`);

    // Test 2: Try to fetch your own authenticated user info (includes private repos count)
    console.log('\nFetching authenticated user data (should include private repo count)...');
    try {
      const { data: authUserData } = await octokit.users.getAuthenticated();
      console.log('✅ Authenticated user data successfully fetched:');
      console.log(`  Login: ${authUserData.login}`);
      console.log(`  Total private repos: ${authUserData.total_private_repos || 0}`);

      if (authUserData.total_private_repos && authUserData.total_private_repos > 0) {
        console.log(`  ✅ Token can see that you have ${authUserData.total_private_repos} private repos`);
      } else {
        console.log('  ⚠️ No private repositories found or token cannot see private repo count');
      }
    } catch (error) {
      console.error('❌ Error fetching authenticated user data:', error.message);
    }

    // Test 3: Get repos including private ones
    console.log('\nFetching repositories...');

    // First try with type: 'all' which should include private repos
    const { data: repos } = await octokit.repos.listForUser({
      username,
      per_page: 100,
      sort: 'updated',
      type: 'all', // Should include private repos if token has access
    });

    const publicRepos = repos.filter((repo) => !repo.private);
    const privateRepos = repos.filter((repo) => repo.private);

    console.log(`✅ Repository data successfully fetched:`);
    console.log(`  Total repos: ${repos.length}`);
    console.log(`  Public repos: ${publicRepos.length}`);
    console.log(`  Private repos: ${privateRepos.length}`);

    if (privateRepos.length > 0) {
      console.log('  ✅ Token has access to private repositories!');
      console.log('  Private repos:');
      privateRepos.forEach((repo) => {
        console.log(`    - ${repo.name}`);
      });
    } else {
      console.log('  ⚠️ No private repositories found or token lacks permission');

      // If you know you have private repos but they aren't showing up
      console.log('\nTesting alternative approach to find private repos...');
      try {
        // Try with authenticated user endpoint to fetch repos
        const { data: authRepos } = await octokit.repos.listForAuthenticatedUser({
          per_page: 100,
          visibility: 'all',
        });

        const authPrivateRepos = authRepos.filter((repo) => repo.private);

        console.log(`✅ Repos via authenticated user endpoint:`);
        console.log(`  Total repos: ${authRepos.length}`);
        console.log(`  Private repos: ${authPrivateRepos.length}`);

        if (authPrivateRepos.length > 0) {
          console.log('  ✅ Found private repositories with auth user endpoint!');
          console.log('  Private repos:');
          authPrivateRepos.forEach((repo) => {
            console.log(`    - ${repo.name}`);
          });
        } else {
          console.log('  ⚠️ Still no private repositories found');
          console.log("  This likely means you don't have any private repositories or");
          console.log("  your token doesn't have the necessary permissions.");
        }
      } catch (error) {
        console.error('❌ Error fetching repos with auth endpoint:', error.message);
      }
    }

    // Test for contribution data (abbreviated)
    console.log('\nFetching contribution data...');
    try {
      const { data: events } = await octokit.activity.listPublicEventsForUser({
        username,
        per_page: 30,
      });

      const pushEvents = events.filter((event) => event.type === 'PushEvent');
      console.log(`✅ Recent push events: ${pushEvents.length}`);
    } catch (error) {
      console.error('❌ Error fetching contribution data:', error.message);
    }

    console.log('\n🎉 Token testing complete!');
    console.log('--------------------------');

    if (privateRepos.length === 0) {
      console.log('RESULT: Your token can access basic GitHub information but cannot see private repositories.');
      console.log('\nTo fix this:');
      console.log('1. Create a new Personal Access Token (Classic) at https://github.com/settings/tokens');
      console.log('2. Select the "repo" scope (full control of private repositories)');
      console.log('3. Update your .env file with the new token');
      console.log('4. Run this test again to verify');
    } else {
      console.log('RESULT: Your token is correctly configured to access private repositories!');
    }
  } catch (error) {
    console.error('❌ Error testing GitHub token:', error.message);
    if (error.message.includes('Bad credentials')) {
      console.log('Your token may be invalid or expired. Please check it on GitHub.');
    }
  }
}

testGitHubToken();
