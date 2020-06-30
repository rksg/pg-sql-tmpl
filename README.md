# `typed-sql-query`

This library is partial rewrote of [sql-template-strings](https://github.com/felixfbecker/node-sql-template-strings) to add type support to the generate query config

This helper generates a `postgres`’s `QueryConfig` object for the given query

### Install:

```bash
npm install typed-sql-query
```

### Usage:

```ts
import { sql } from 'typed-sql-query'

interface IResult {
  id: number
  name: string
}

const filter = sql`WHERE id = ${1}`
const query = sql`SELECT id, name FROM table ${filter};`
const client = await pgPool.connect()
const result = await client.query<IResult>(query)

```

### License:

ISC License

Copyright (c) 2016, Felix Frederick Becker (original author)<br>
Copyright (c) 2020, Tan, Shiaw Uen
