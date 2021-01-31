import { sortStringArray } from './functions';

export const backendURL = 'https://api.timos.design:3002/';
// export const backendURL = 'http://localhost:3000/';

export const designTools: string[] = sortStringArray([
  'IcoMoon',
  'Adobe XD',
  'Photoshop',
  'Affinity Photo'
]);
export const frameworks: string[] = sortStringArray([
  'Nuxt.js',
  'Node JS',
  'Vue JS',
  'Angular',
  'Nest.js',
  'socket.io',
  'TensorFlow.js',
  'Telegram Bot API'
]);
export const development: string[] = sortStringArray([
  'Cassandra',
  'HTML 5',
  'CSS 3',
  'JavaScript',
  'TypeScript',
  'MongoDB',
  'MySQL',
  'Git',
  'NPM.js',
  'Yarn'
]);
