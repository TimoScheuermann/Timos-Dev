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

type SPEC = {
  readonly radix: number;
  readonly unit: string[];
};

const si = {
  radix: 1e3,
  unit: ['b', 'kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb']
};
const iec = {
  radix: 1024,
  unit: ['b', 'Kib', 'Mib', 'Gib', 'Tib', 'Pib', 'Eib', 'Zib', 'Yib']
};
const jedec = {
  radix: 1024,
  unit: ['b', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb']
};

export const SPECS: Record<string, SPEC> = {
  si,
  iec,
  jedec
};
