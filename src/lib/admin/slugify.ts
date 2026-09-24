export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
