const COLOR_KEYWORDS: { pattern: RegExp; hex: string }[] = [
  { pattern: /مشکی/, hex: "#2b2b2b" },
  { pattern: /نقره/, hex: "#c7c9cc" },
  { pattern: /طلایی/, hex: "#c9a24b" },
  { pattern: /برنز/, hex: "#8c6a4a" },
  { pattern: /سفید/, hex: "#f5f5f0" },
  { pattern: /قهوه/, hex: "#5b4636" },
  { pattern: /خاکستری/, hex: "#8a8a8a" },
  { pattern: /آبی/, hex: "#3b5b7a" },
];

export function resolveSwatchColor(label: string): string {
  const match = COLOR_KEYWORDS.find((entry) => entry.pattern.test(label));
  return match?.hex ?? "#a3a3a3";
}
