const fs = require('fs');
const path = require('path');
const https = require('https');

// List of technologies from the About.jsx file
const technologies = [
  // Frontend
  { name: 'HTML', slug: 'html5' },
  { name: 'CSS', slug: 'css3' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'React', slug: 'react' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'Angular', slug: 'angular' },
  { name: 'Vue', slug: 'vuedotjs' },
  { name: 'Tailwind', slug: 'tailwindcss' },
  { name: 'Bootstrap', slug: 'bootstrap' },
  { name: 'Material UI', slug: 'mui' },
  { name: 'Framer Motion', slug: 'framer' },
  { name: 'Three.js', slug: 'threedotjs' },

  // Backend
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Express', slug: 'express' },
  { name: 'FastAPI', slug: 'fastapi' },
  { name: 'Django', slug: 'django' },
  { name: 'Flask', slug: 'flask' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'MySQL', slug: 'mysql' },
  { name: 'Redis', slug: 'redis' },
  { name: 'GraphQL', slug: 'graphql' },
  { name: 'Apollo', slug: 'apollographql' },
  { name: 'Firebase', slug: 'firebase' },
  { name: 'Supabase', slug: 'supabase' },

  // Mobile
  { name: 'React Native', slug: 'react' },
  { name: 'Flutter', slug: 'flutter' },
  { name: 'Swift', slug: 'swift' },
  { name: 'Kotlin', slug: 'kotlin' },

  // DevOps
  { name: 'Git', slug: 'git' },
  { name: 'GitHub', slug: 'github' },
  { name: 'GitLab', slug: 'gitlab' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Kubernetes', slug: 'kubernetes' },
  { name: 'AWS', slug: 'amazonaws' },
  { name: 'Google Cloud', slug: 'googlecloud' },
  { name: 'Azure', slug: 'microsoftazure' },
  { name: 'Vercel', slug: 'vercel' },
  { name: 'Netlify', slug: 'netlify' },
  { name: 'Jenkins', slug: 'jenkins' },
  { name: 'CircleCI', slug: 'circleci' },
  { name: 'Travis CI', slug: 'travisci' },
  { name: 'GitHub Actions', slug: 'githubactions' },

  // AI/ML
  { name: 'Python', slug: 'python' },
  { name: 'TensorFlow', slug: 'tensorflow' },
  { name: 'PyTorch', slug: 'pytorch' },
  { name: 'Scikit-learn', slug: 'scikitlearn' },
  { name: 'Pandas', slug: 'pandas' },
  { name: 'NumPy', slug: 'numpy' },
  { name: 'Jupyter', slug: 'jupyter' },
];

const targetDir = path.resolve(__dirname, '../public/assets/skills');

// Create the directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Function to download an icon
function downloadIcon(technology) {
  return new Promise((resolve, reject) => {
    const url = `https://cdn.simpleicons.org/${technology.slug}/white`;
    const filePath = path.join(targetDir, `${technology.slug}.svg`);

    console.log(`Downloading ${technology.name} (${technology.slug}) from ${url}`);

    const file = fs.createWriteStream(filePath);

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          console.error(`Failed to download ${technology.name}: Status code ${response.statusCode}`);
          resolve({ name: technology.name, success: false });
          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${technology.name} successfully`);
          resolve({ name: technology.name, success: true, path: `/assets/skills/${technology.slug}.svg` });
        });
      })
      .on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete the file if there was an error
        console.error(`Error downloading ${technology.name}: ${err.message}`);
        resolve({ name: technology.name, success: false });
      });
  });
}

// Process all downloads and then update the mapping file
async function downloadAll() {
  console.log(`Downloading ${technologies.length} icons to ${targetDir}...`);

  const results = await Promise.all(technologies.map(downloadIcon));

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`Downloaded ${successful.length} icons successfully`);
  if (failed.length > 0) {
    console.log(`Failed to download ${failed.length} icons: ${failed.map((f) => f.name).join(', ')}`);
  }

  // Create a mapping file that can be imported
  const mapping = {};
  successful.forEach((item) => {
    mapping[item.name] = item.path;
  });

  fs.writeFileSync(
    path.join(__dirname, '../src/constants/iconMapping.js'),
    `// Auto-generated icon mapping\nexport const iconMapping = ${JSON.stringify(mapping, null, 2)};\n`,
  );

  console.log('Created icon mapping file at src/constants/iconMapping.js');
}

downloadAll().catch(console.error);
