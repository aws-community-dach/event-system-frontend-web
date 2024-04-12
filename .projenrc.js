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
  gitignore: ['.env.local', '.vscode', '.DS_Store', '.sentryclirc'],
  deps: [
    'swr',
    '@next/font',
    'next-auth',
    'axios',
    '@headlessui/react',
    '@heroicons/react',
    '@sentry/nextjs',
    'next-qrcode',
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
      moduleResolution: 'node',
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
        'polar': '#fbfefe',
        'borderColor': {
          DEFAULT: '#f1f3f3',
        },
        'accent-dark': '#ec7211',
        'accent': {
          DEFAULT: '#FF9900',
          50: '#fffbea',
          100: '#fff2c5',
          200: '#ffe685',
          300: '#ffd246',
          400: '#ffbd1b',
          500: '#ff9900',
          600: '#e27200',
          700: '#bb4d02',
          800: '#983b08',
          900: '#7c310b',
          950: '#481700',
        },
        'dark': {
          DEFAULT: '#232F3E',
          50: '#f5f7fa',
          100: '#eaeef4',
          200: '#d0dbe7',
          300: '#a6bdd3',
          400: '#779bb9',
          500: '#567ea1',
          600: '#426487',
          700: '#37526d',
          800: '#30465c',
          900: '#2c3d4e',
          950: '#232f3e',
        },
        'link': {
          DEFAULT: '#0972D3',
          50: '#edfbff',
          100: '#d6f5ff',
          200: '#b6efff',
          300: '#83e7ff',
          400: '#49d7ff',
          500: '#1fbbff',
          600: '#079fff',
          700: '#0186f4',
          800: '#0972d3',
          900: '#0e5a9a',
          950: '#0e375d',
        },
        'info': {
          DEFAULT: '#3184C2',
          50: '#f2f8fd',
          100: '#e5eff9',
          200: '#c5def2',
          300: '#92c2e7',
          400: '#57a2d9',
          500: '#3184c2',
          600: '#226aa7',
          700: '#1d5587',
          800: '#1c4970',
          900: '#1c3e5e',
          950: '#13283e',
        },
        'success': {
          DEFAULT: '#1D8102',
          50: '#fafff9',
          100: '#d9ffc5',
          200: '#b5ff92',
          300: '#85ff53',
          400: '#5afb20',
          500: '#37e200',
          600: '#28b500',
          700: '#1d8102',
          800: '#1d6b09',
          900: '#1c5a0d',
          950: '#083300',
        },
        'danger': {
          DEFAULT: '#D13212',
          50: '#fef8f7',
          100: '#fee6d6',
          200: '#fbc9ad',
          300: '#f8a479',
          400: '#f57442',
          500: '#f14f1e',
          600: '#d13212',
          700: '#bc2612',
          800: '#952017',
          900: '#781e16',
          950: '#410b09',
        },
      },
    },
  },
  plugins: [],
};

project.synth();
