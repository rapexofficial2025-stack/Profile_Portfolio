/** CSS zoom applied to <html> (see globals.css). Pointer and viewport values are in screen px; divide by this to get page px. */
export function pageZoom() {
  if (typeof window === "undefined") return 1;
  return parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
}
