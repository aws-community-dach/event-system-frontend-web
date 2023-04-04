const { web } = require('projen');
const { GithubCredentials } = require('projen/lib/github');
const { NpmAccess, NodePackageManager } = require('projen/lib/javascript');

const project = new web.NextJsTypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'event-system-frontend-web',
  srcdir: '.',
  packageManager: NodePackageManager.NPM,
  githubOptions: {
    mergify: false,
    // projenCredentials: GithubCredentials.fromApp(),
  },
  gitignore: ['.env.local', '.vscode'],
  deps: [
    'swr',
    '@next/font',
    'next-auth',
    'axios',
    '@headlessui/react',
    '@heroicons/react',
  ],
  eslint: true,
  eslintOptions: {
    prettier: false,
  },
  workflowNodeVersion: '16.8.0',
  tsconfig: {
    compilerOptions: {
      rootDir: '.',
      outDir: '.',
      jsx: 'react-jsx',
      baseUrl: '.',
      paths: {
        '@/*': ['./*'],
      },
      plugins: [
        {
          name: 'next',
        },
      ],
    },
    include: ['**/*.tsx', '.next/types/**/*.ts'],
  },
});
project.tryFindFile('tailwind.config.json').obj = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
      },
    },
  },
  plugins: [],
};

project.synth();
