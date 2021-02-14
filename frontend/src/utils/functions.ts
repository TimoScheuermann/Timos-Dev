import { SPECS } from './constants';

export function copyToClipboard(text: string) {
  const dummy = document.createElement('textarea');
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}

export function sortStringArray(array: string[]): string[] {
  return array.sort((a, b) => a.localeCompare(b));
}

export function convertFileSize(
  bytes: number,
  fixed = 1,
  spec = 'jedec'
): string {
  bytes = Math.abs(bytes);

  const { radix, unit } = SPECS[spec];

  let loop = 0;

  // calculate
  while (bytes >= radix) {
    bytes /= radix;
    ++loop;
  }
  return `${bytes.toFixed(fixed)} ${unit[loop]}`;
}
