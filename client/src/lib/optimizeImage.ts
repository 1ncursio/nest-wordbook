export default function optimizeImage(url: string, width?: number) {
  if (url.includes('https://')) return url;

  if (!url.match(/\.(jpe?g|png)$/i)) return url;

  return `http://localhost:3095/${url}`;

  // TODO: optimize image on upload
}
