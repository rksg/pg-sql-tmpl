import type { QueryConfig } from 'pg'

export function sql <V extends any[] = any[]> (
  template: TemplateStringsArray,
  ...values: V
): QueryConfig<V> {
  const strings = Array.from(template)

  const text = strings.reduce((text, set, index) => {
    if (index < 1) return set
    return text + `$${index}` + set
  }, '')

  return { text, values }
}
