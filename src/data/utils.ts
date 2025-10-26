export function removeParentheses(str: string): string {
  return str.replace(/\([^)]*\)/g, '').trim()
}

export function normalize(str: string): string {
  return removeParentheses(str).replace(/\s+/g, '').toLowerCase()
}

export function getDisplayName(itemName: string, kindName: string): string {
  const item = itemName.trim()
  const kind = removeParentheses(kindName.trim())
  const normItem = normalize(item)
  const normKind = normalize(kind)

  if (normItem === normKind) return item
  const suffix = kind.startsWith(item) ? kind.slice(item.length).trim() : kind
  return suffix ? `${item} ${suffix}` : item
}

export function getFormattedTime() {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const formattedTime = `${pad(now.getMonth() + 1)}/${pad(now.getDate())} 13:00`

  return formattedTime
}
