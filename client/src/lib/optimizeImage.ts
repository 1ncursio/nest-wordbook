export default function optimizeImage(url: string, width?: number) {
  if (url.startsWith('https://')) return url;

  return `http://localhost:3095/${url}`;

  // TODO: optimize image on upload
}
