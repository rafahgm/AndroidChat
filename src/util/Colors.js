export const colors = {
  red: '#FF495C',
  black: '#1C1D21',
  grey: '#77878B',
  yellow: '#F2F230',
  white: '#FFFDFD',
  purple: '#924EA6',
  green: '#68A17A',
  blue: '#256EFF',
  red: '#FF495C',
};

/*
 * Colors.darken(colorCode : String, amount : Number)
 * colorCode : String -> Color code in hex
 * amount : Number    -> Percentage to darken 0.0 - 1.0
 */
export function darken(colorCode, amount) {
  let usePound = false;

  if (colorCode[0] == '#') {
    colorCode = colorCode.slice(1);
    usePound = true;
  }

  const num = parseInt(colorCode, 16);

  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;

  r -= amount * r;
  g -= amount * g;
  b -= amount * b;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

/*
 * Colors.lighten(colorCode : String, amount : Number)
 * colorCode : String -> Color code in hex
 * amount : Number    -> Percentage to lighten 0.0 - 1.0
 */
export function lighten(colorCode, amount) {
  let usePound = false;

  if (colorCode[0] == '#') {
    colorCode = colorCode.slice(1);
    usePound = true;
  }

  const num = parseInt(colorCode, 16);

  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;

  r += (255 - r) * amount;
  g += (255 - g) * amount;
  b += (255 - b) * amount;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}
