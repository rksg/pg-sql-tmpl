import { QueryConfig, defaults } from 'pg'

function isQueryConfig (value: any): value is QueryConfig {
  const keys = ['text', 'values']
  if (!value) return false
  return keys.every(key => value.hasOwnProperty(key))
}

function splitQueryConfigText (text: string): string[] {
  return text.split(/\$\d+/gi)
}

export function sql <V extends any[] = (any | QueryConfig<any[]>)[]> (
  template: TemplateStringsArray,
  ...values: V
): QueryConfig<V> {
  const strings = Array.from(template)

  const defaults: {
    values: any[],
    strings: string[],
    indexes: number[][],
    accIndex: number
  } = { values: [], strings: [], indexes: [], accIndex: 0 }

  const acc = strings.reduce((acc, string, index) => {
    acc.strings.push(string)

    const value = values[index]

    if (isQueryConfig(value)) {
      const strings = splitQueryConfigText(value.text)

      // push to the start of the indexes
      acc.indexes.unshift([acc.accIndex, acc.accIndex + 1])
      acc.accIndex += strings.length
      acc.indexes.unshift([acc.accIndex, acc.accIndex + 1])

      acc.strings.push(...strings)
      acc.values.push(...value.values)
    } else if (values.hasOwnProperty(index)) {
      acc.values.push(value)
    }
    acc.accIndex += 1
    return acc
  }, defaults)

  acc.strings = acc.indexes.reduce((strings, [start, end]) => {
    strings.splice(start, 2, strings[start] + strings[end])
    return strings
  }, acc.strings)

  const text = acc.strings.reduce((text, set, index) => {
    if (index < 1) return set
    return text + `$${index}` + set
  }, '')

  return { text, values: acc.values as V }
}

sql.raw = function raw (value: any): QueryConfig {
  return sql([value] as unknown as TemplateStringsArray)
}

sql.join = function join (configs: QueryConfig[], delimeter: string): QueryConfig {
  return configs.reduce((a, b): QueryConfig<any> => sql`${a} ${sql.raw(delimeter)} ${b}`)
}
