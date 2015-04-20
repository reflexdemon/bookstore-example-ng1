/**
 *  simple text to slug function
 */
export function slugify(text) {
  return text.trim()
          .toLowerCase()
          .replace(/[^\w ]+/g,'')
          .replace(/ +/g,'-');
}
