/**
 * The Bengan pixel mascot as a 16 x 17 grid, generated from brand/mascot.svg.
 * Each letter is an index into PALETTE; a space is an empty cell.
 */
export const PALETTE = ["#1A0A2E", "#3FA83A", "#4A1D6B", "#6A2C91", "#7BE04F", "#A66BFF", "#FF7AC8", "#FFFFFF"] as const;

export const MASCOT_ROWS = [
  "       aa       ",
  "      abba      ",
  "   aaaaeeaaaa   ",
  "  aeeeeeeeeeea  ",
  "  abbbeeeebbba  ",
  "   aaaaaaaaaa   ",
  "  adffddddddda  ",
  " adffddddddddda ",
  " adfdddddddddda ",
  " adddahdddahdda ",
  " adddaadddaadda ",
  " adgddddddddgda ",
  " acdddaddddadda ",
  " accdddaaaaddca ",
  "  acccdddddcca  ",
  "   aaccccccaa   ",
  "     aaaaaa     ",
];

/** Palette letters with special roles. */
export const OUTLINE = "a"; // #1A0A2E
export const BODY = "d"; // #6A2C91
export const EYE_WHITE = "h"; // #FFFFFF
