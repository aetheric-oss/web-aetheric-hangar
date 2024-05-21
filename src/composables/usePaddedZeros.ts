export function usePaddedZeros(value: number | string, amount?: number) {
  let targetNumbers = 2;
  if (amount) {
    targetNumbers = amount;
  }
  return ("0" + value).slice(-targetNumbers);
}
