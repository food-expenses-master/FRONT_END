export function removeParentheses(str: string): string {
  return str.replace(/\([^)]*\)/g, '').trim();
}

export function normalize(str: string): string {
  return removeParentheses(str).replace(/\s+/g, '').toLowerCase();
}

export function getDisplayName(itemName: string, kindName: string): string {
  const item = itemName.trim();
  const kind = removeParentheses(kindName.trim());
  const normItem = normalize(item);
  const normKind = normalize(kind);

  if (normItem === normKind) return item;
  const suffix = kind.startsWith(item) ? kind.slice(item.length).trim() : kind;
  return suffix ? `${item} ${suffix}` : item;
}