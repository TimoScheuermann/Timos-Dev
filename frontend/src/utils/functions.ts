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
