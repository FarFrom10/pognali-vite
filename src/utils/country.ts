export function translateArray(
  arr: string[],
  dict: Record<string, string>
): string[] {
  return arr.map((item) => {
    const name = dict[item] ?? item;
    return name.toUpperCase();
  });
}
