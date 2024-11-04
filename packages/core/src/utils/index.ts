export function omit<T extends Record<string, any>, K extends keyof T>(source: T, keys: K[] = []): Omit<T, K> {
  if (!keys.length)
    return source
  const picks: any = {}
  for (const key in source) {
    if (!keys.includes(key as unknown as K))
      picks[key] = source[key]
  }
  return picks as Omit<T, K>
}
