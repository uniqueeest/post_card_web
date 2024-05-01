export function generateSixDigitNumber() {
  return Math.floor(Math.random() * 1000000 + 100000)
    .toString()
    .substring(1);
}
