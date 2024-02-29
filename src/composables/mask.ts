export function useMask(value: string, type?: string) {
  const maskStr = "*";
  let masked = maskStr.repeat(value.length);

  if (type === "email") {
    const parts = value.split("@");
    if (parts.length === 2) {
      const maskedUsername = parts[0];
      const domain = maskStr.repeat(3) + "." + maskStr.repeat(3);
      masked = maskedUsername + "@" + domain;
    } else {
      masked = value;
    }
  } else if (type === "phone") {
    let [countryCode, ...rest] = value.split(" ");
    let joined = rest.join(" ");
    const restLength = joined.length;
    const maskedRest = joined.replace(/\d/g, maskStr).replace(/\s/g, " ");
    masked = `${countryCode} ${maskedRest}${joined[restLength - 1]}`;
  } else if (value.length > 2 && value.length <= 5) {
    masked =
      value.slice(0, 1) +
      maskStr.repeat(value.length - 2) +
      value.slice(value.length - 1, value.length);
  } else if (value.length > 5) {
    masked =
      value.slice(0, 2) +
      maskStr.repeat(value.length - 4) +
      value.slice(value.length - 2, value.length);
  }

  return masked;
}
