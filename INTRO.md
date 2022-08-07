Efficiently read and write well-formed JSON data to the disk. About x1.5-2 times as fast as JSON.parse/stringify.

```ts
import { Literal, parse, stringify } from 'fast-json-data'

const schema = [[Literal, [
  '_id',
  '_rev',
  'name',
  'homepage',
  ['versions', ['*', [
    'name',
    'gitHead',
    ['os', [Literal]],
    ['cpu', [Literal]],
    ['engines', ['*']],
    ['dist', [
      'shasum',
      'tarball',
      'unpackedSize',
    ]],
    ['dependencies', [
      '*',
    ]],
  ]]],

  ['time', ['*']],
]]]

...

// packumentCache is a Map<string, Packument>

await fsp.writeFile(
  options.packumentCachePath,
  stringify(schema, [...packumentCache]),
  'utf-8'
)

...

json = parse(schema, await fsp.readFile(options.packumentCachePath, 'utf-8'))
```
