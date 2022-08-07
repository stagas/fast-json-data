<h1>
fast-json-data <a href="https://npmjs.org/package/fast-json-data"><img src="https://img.shields.io/badge/npm-v1.0.0-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-119-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/fast-json-data@1.0.0/dist/fast-json-data.min.js"><img src="https://img.shields.io/badge/brotli-603b-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
</h1>

<p></p>

Fast JSON data disk read/write.

<h4>
<table><tr><td title="Triple click to select and copy paste">
<code>npm i fast-json-data </code>
</td><td title="Triple click to select and copy paste">
<code>pnpm add fast-json-data </code>
</td><td title="Triple click to select and copy paste">
<code>yarn add fast-json-data</code>
</td></tr></table>
</h4>

<p>Efficiently read and write well-formed JSON data to the disk. About x1.5-2 times as fast as JSON.parse/stringify.</p>
<pre><code class="language-ts">import { Literal, parse, stringify } from 'fast-json-data'

const schema = [[Literal, [
'_id',
'_rev',
'name',
'homepage',
['versions', ['_', [
'name',
'gitHead',
['os', [Literal]],
['cpu', [Literal]],
['engines', ['_']],
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

json = parse(schema, await fsp.readFile(options.packumentCachePath, 'utf-8'))</code></pre>

## API

<p>  <details id="Literal$15" title="Variable" ><summary><span><a href="#Literal$15">#</a></span>  <code><strong>Literal</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/fast-json-data.ts#L1">src/fast-json-data.ts#L1</a>  <ul><p>typeof   <a href="#Literal$15">Literal</a></p>        </ul></details><details id="parse$5" title="Function" ><summary><span><a href="#parse$5">#</a></span>  <code><strong>parse</strong></code><em>(schema, input)</em>    </summary>  <a href="src/fast-json-data.ts#L62">src/fast-json-data.ts#L62</a>  <ul>    <p>    <details id="schema$7" title="Parameter" ><summary><span><a href="#schema$7">#</a></span>  <code><strong>schema</strong></code>    </summary>    <ul><p>any</p>        </ul></details><details id="input$8" title="Parameter" ><summary><span><a href="#input$8">#</a></span>  <code><strong>input</strong></code>    </summary>    <ul><p>string</p>        </ul></details>  <p><strong>parse</strong><em>(schema, input)</em>  &nbsp;=&gt;  <ul>any</ul></p></p>    </ul></details><details id="parseLines$9" title="Function" ><summary><span><a href="#parseLines$9">#</a></span>  <code><strong>parseLines</strong></code><em>(schema, input)</em>    </summary>  <a href="src/fast-json-data.ts#L66">src/fast-json-data.ts#L66</a>  <ul>    <p>    <details id="schema$11" title="Parameter" ><summary><span><a href="#schema$11">#</a></span>  <code><strong>schema</strong></code>    </summary>    <ul><p>any</p>        </ul></details><details id="input$12" title="Parameter" ><summary><span><a href="#input$12">#</a></span>  <code><strong>input</strong></code>    </summary>    <ul><p>string  [] &amp; {<p>  <details id="index$14" title="Property" ><summary><span><a href="#index$14">#</a></span>  <code><strong>index</strong></code>    </summary>  <a href="src/fast-json-data.ts#L66">src/fast-json-data.ts#L66</a>  <ul><p>number</p>        </ul></details></p>}</p>        </ul></details>  <p><strong>parseLines</strong><em>(schema, input)</em>  &nbsp;=&gt;  <ul>any</ul></p></p>    </ul></details><details id="stringify$1" title="Function" ><summary><span><a href="#stringify$1">#</a></span>  <code><strong>stringify</strong></code><em>(schema, input)</em>    </summary>  <a href="src/fast-json-data.ts#L3">src/fast-json-data.ts#L3</a>  <ul>    <p>    <details id="schema$3" title="Parameter" ><summary><span><a href="#schema$3">#</a></span>  <code><strong>schema</strong></code>    </summary>    <ul><p>any</p>        </ul></details><details id="input$4" title="Parameter" ><summary><span><a href="#input$4">#</a></span>  <code><strong>input</strong></code>    </summary>    <ul><p>any</p>        </ul></details>  <p><strong>stringify</strong><em>(schema, input)</em>  &nbsp;=&gt;  <ul>string</ul></p></p>    </ul></details></p>

## Contributing

[Fork](https://github.com/stagas/fast-json-data/fork) or [edit](https://github.dev/stagas/fast-json-data) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
