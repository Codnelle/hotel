import fs from 'node:fs';
import path from 'node:path';

const exts = ['avif', 'webp', 'jpg', 'jpeg', 'png'];
const root = path.join(process.cwd(), 'public', 'images');

/**
 * Looks for /public/images/<key>.(avif|webp|jpg|jpeg|png).
 * Returns the public URL if a real photo has been dropped in, otherwise null.
 */
export function findImage(key: string): string | null {
  for (const ext of exts) {
    if (fs.existsSync(path.join(root, `${key}.${ext}`))) return `/images/${key}.${ext}`;
  }
  return null;
}

export function publicFileExists(url: string): boolean {
  return fs.existsSync(path.join(process.cwd(), 'public', url.replace(/^\//, '')));
}

/** Stable placeholder tint per key, so the same slot always looks the same. */
export function tint(key: string): number {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 6;
}
