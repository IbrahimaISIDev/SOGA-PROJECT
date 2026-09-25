/**
 * Think Tank section accent colors — single source of truth. Previously
 * redefined as local hex constants in ~10 files across this section; two of
 * the four values duplicate existing design tokens (--soga-transition,
 * --soga-graphite in globals.css) without referencing them, so the brand
 * color could drift out of sync here silently if it's ever changed there.
 */
export const TT_GREEN = "var(--soga-transition)"; // #1E6F5C
export const TT_GREEN_LIGHT = "#3ea08a"; // Think Tank–specific lighter accent, no equivalent global token
export const TT_BG = "var(--soga-graphite)"; // #16181C
export const TT_BORDER = "#2a2d33"; // Think Tank–specific border shade, no equivalent global token
