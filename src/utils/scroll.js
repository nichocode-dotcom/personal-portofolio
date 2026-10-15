/**
 * Utility for instant, native, butter-smooth section scrolling without JS timer fighting.
 */
export function scrollToSection(id) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth' });
}
