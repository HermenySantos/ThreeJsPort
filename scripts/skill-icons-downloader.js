import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the assets/skills directory if it doesn't exist
const assetsDir = path.join(__dirname, '../public/assets/skills');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// List of skills with their corresponding icon URLs
// Simple-icons github URLs: https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/{name}.svg
const skills = [
  { name: 'html', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'css', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'javascript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'typescript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'react', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'next', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'vue', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'nuxt', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg' },
  { name: 'svelte', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
  { name: 'angular', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { name: 'threejs', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
  { name: 'tailwind', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
  { name: 'bootstrap', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'mui', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg' },
  { name: 'sass', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
  { name: 'framer', url: 'https://www.vectorlogo.zone/logos/framer/framer-icon.svg' },
  { name: 'figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'photoshop', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
  { name: 'illustrator', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg' },
  { name: 'nodejs', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'express', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'flask', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
  { name: 'django', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: 'mongodb', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'postgresql', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'mysql', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'firebase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'redis', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  {
    name: 'aws',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
  },
  { name: 'gcp', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'azure', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'heroku', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg' },
  { name: 'vercel', url: 'https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg' },
  { name: 'netlify', url: 'https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg' },
  { name: 'docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'kubernetes', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'github', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'bitbucket', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg' },
  { name: 'gitlab', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
  { name: 'jest', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg' },
  { name: 'cypress', url: 'https://www.vectorlogo.zone/logos/cypress/cypress-icon.svg' },
  { name: 'python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'c', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'cpp', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'csharp', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'rust', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg' },
  { name: 'go', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
  { name: 'ruby', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg' },
  { name: 'php', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'redux', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
  { name: 'graphql', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  { name: 'flutter', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'dart', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
  { name: 'nestjs', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg' },
  { name: 'fastapi', url: 'https://cdn.worldvectorlogo.com/logos/fastapi.svg' },
  { name: 'prisma', url: 'https://cdn.worldvectorlogo.com/logos/prisma-2.svg' },
  { name: 'recoil', url: 'https://cdn.worldvectorlogo.com/logos/recoil-js.svg' },
  { name: 'reacttestinglibrary', url: 'https://testing-library.com/img/octopus-128x128.png' },
];

// Download function
function downloadIcon(skill) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(assetsDir, `${skill.name}.svg`);

    // Skip if the file already exists
    if (fs.existsSync(filePath)) {
      console.log(`✓ ${skill.name}.svg already exists`);
      return resolve();
    }

    const file = fs.createWriteStream(filePath);

    https
      .get(skill.url, (response) => {
        if (response.statusCode !== 200) {
          fs.unlink(filePath, () => {});
          reject(`Failed to download ${skill.name}: ${response.statusCode}`);
          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded ${skill.name}.svg`);
          resolve();
        });
      })
      .on('error', (err) => {
        fs.unlink(filePath, () => {});
        reject(`Error downloading ${skill.name}: ${err.message}`);
      });
  });
}

// Main function to download all icons
async function downloadAllIcons() {
  console.log(`Downloading ${skills.length} skill icons to ${assetsDir}...`);

  for (const skill of skills) {
    try {
      await downloadIcon(skill);
    } catch (error) {
      console.error(error);
    }
  }

  console.log('All downloads completed!');
}

// Execute the download function
downloadAllIcons();
