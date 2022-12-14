export const Literal = Symbol()

export function stringify(schema: any, input: any): string {
  let s = ''
  let i: number, k: any, key: any

  if (schema.length === 1) {
    if (typeof (key = schema[0]) === 'object') {
      if (input?.length)
        for (i = 0; i < input.length; i++) {
          s += '>\n' + stringify(key, input[i])
        }
      s += '<\n'
      return s
    } else if (key === Literal) {
      if (input?.length)
        for (i = 0; i < input.length; i++) {
          s += input[i] + '\n'
        }
      s += '<\n'
      return s
    }
  }

  if (schema.length > 1 && schema.every((x: any) => typeof x !== 'string')) {
    for (i = 0; i < schema.length; i++) {
      key = schema[i]
      if (key === Literal) {
        s += input[i] + '\n'
      } else {
        s += stringify(key, input[i])
      }
    }
    return s
  }

  for (i = 0; i < schema.length; i++) {
    key = schema[i]
    if (typeof key === 'object') {
      s += stringify(key[1], input[key[0]])
    } else if (key === '*') {
      if (++i < schema.length) {
        key = schema[i]
        for (const k in input) {
          s += k + '\n' + stringify(key, input[k])
        }
        s += '<' + '\n'
      } else {
        for (k in input) {
          s += `${k},${input[k]}` + '\n'
        }
        s += '<' + '\n'
      }
    } else {
      s += (input[key] ?? '') + '\n'
    }
  }

  return s
}

export function parse(schema: any, input: string) {
  return parseLines(schema, Object.assign(input.split('\n'), { index: 0 }))
}

export function parseLines(schema: any, input: string[] & { index: number }): any {
  let key: any, out: any

  if (schema.length === 1) {
    if (typeof (key = schema[0]) === 'object') {
      out = []
      for (; input.index < input.length;) {
        if (input[input.index++] === '<') break
        out.push(parseLines(key, input))
      }
      return out
    } else if (key === Literal) {
      out = []
      for (let item; input.index < input.length;) {
        item = input[input.index++]
        if (item === '<') break
        out.push(item)
      }
      return out
    }
  }

  if (schema.length > 1 && schema.every((x: any) => typeof x !== 'string')) {
    out = Array.from({ length: schema.length })
    for (let key, i = 0; i < schema.length; i++) {
      key = schema[i]
      if (key === Literal) {
        out[i] = input[input.index++]
      } else {
        out[i] = parseLines(key, input)
      }
    }
    return out
  }

  out = {}
  for (let key, line, i = 0; i < schema.length; i++) {
    key = schema[i]
    if (typeof key === 'object') {
      out[key[0]] = parseLines(key[1], input)
    } else if (key === '*') {
      if (++i < schema.length) {
        key = schema[i]
        for (let k; input.index < input.length;) {
          k = input[input.index++]
          if (k === '<') break
          out[k] = parseLines(key, input)
        }
      } else {
        for (let kv; input.index < input.length;) {
          kv = input[input.index++]
          if (kv === '<') break
          const comma = kv.indexOf(',')
          out[kv.slice(0, comma)] = kv.slice(comma + 1)
        }
      }
    } else {
      line = input[input.index++]
      out[key] = line != '' ? line : void 0
    }
  }
  return out
}
