const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Turns `*word*` into an italic accent. Escapes everything else. */
export const accent = (line: string) => esc(line).replace(/\*(.+?)\*/g, '<em>$1</em>');

/** Plain text version of a headline (for titles, aria). */
export const plain = (lines: string | string[]) =>
  (Array.isArray(lines) ? lines.join(' ') : lines).replace(/\*/g, '');
