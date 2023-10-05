export function getString(str: string) {
  if (!str) return;

  const words = str.split("-");
  const outStr = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return outStr;
}
