const { web } = require('projen');
const { GithubCredentials } = require('projen/lib/github');
const { NpmAccess, NodePackageManager } = require('projen/lib/javascript');
const colors = require('tailwindcss/colors');

const project = new web.NextJsTypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'event-system-frontend-web',
  srcdir: '.',
  packageManager: NodePackageManager.NPM,
  githubOptions: {
    mergify: false,
    // projenCredentials: GithubCredentials.fromApp(),
  },
  gitignore: ['.env.local', '.vscode', '.DS_Store'],
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
  mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#06b6d4',
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
        link: {
          DEFAULT: '#3273dc',
          100: '#ebf1fc',
          200: '#ccdcf6',
          300: '#adc7f1',
          400: '#709de7',
          500: '#3273dc',
          600: '#2d68c6',
          700: '#2656a5',
          800: '#1e4584',
          900: '#173463',
        },
        dark: {
          DEFAULT: '#363636',
          100: '#ebebeb',
          200: '#cdcdcd',
          300: '#afafaf',
          400: '#727272',
          500: '#363636',
          600: '#313131',
          700: '#292929',
          800: '#202020',
          900: '#181818',
        },
        light: {
          DEFAULT: '#f5f5f5',
          100: '#fefefe',
          200: '#fdfdfd',
          300: '#fbfbfb',
          400: '#f8f8f8',
          500: '#f5f5f5',
          600: '#dddddd',
          700: '#b8b8b8',
          800: '#939393',
          900: '#6e6e6e',
        },
        info: {
          DEFAULT: '#209cee',
          100: '#e9f5fd',
          200: '#c7e6fb',
          300: '#a6d7f8',
          400: '#63baf3',
          500: '#209cee',
          600: '#1d8cd6',
          700: '#1875b3',
          800: '#135e8f',
          900: '#0e466b',
        },
        success: {
          DEFAULT: '#48c774',
          100: '#edf9f1',
          200: '#d1f1dc',
          300: '#b6e9c7',
          400: '#7fd89e',
          500: '#48c774',
          600: '#41b368',
          700: '#369557',
          800: '#2b7746',
          900: '#205a34',
        },
        warning: {
          DEFAULT: '#ffdd57',
          100: '#fffcee',
          200: '#fff7d5',
          300: '#fff1bc',
          400: '#ffe789',
          500: '#ffdd57',
          600: '#e6c74e',
          700: '#bfa641',
          800: '#998534',
          900: '#736327',
        },
        danger: {
          DEFAULT: '#ff3860',
          100: '#ffebef',
          200: '#ffcdd7',
          300: '#ffafbf',
          400: '#ff7490',
          500: '#ff3860',
          600: '#e63256',
          700: '#bf2a48',
          800: '#99223a',
          900: '#73192b',
        },
      },
    },
  },
  plugins: [],
};

project.synth();
