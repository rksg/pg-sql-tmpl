import { sql } from '../src'

describe(sql, () => {
  it('should work with a simple query', () => {
    const query = sql`SELECT * FROM table`
    expect(query.text).toEqual('SELECT * FROM table')
    expect(query.values).toEqual([])
  })

  it('should work with a query with values', () => {
    const value = 1234
    const query = sql`SELECT * FROM table WHERE column = ${value}`
    expect(query.text).toEqual('SELECT * FROM table WHERE column = $1')
    expect(query.values).toEqual([value])
  })

  it('should work with falsy values', () => {
    const value1 = false
    const value2 = null
    const query = sql`SELECT * FROM table WHERE column1 = ${value1} AND column2 = ${value2}`
    expect(query.text).toEqual('SELECT * FROM table WHERE column1 = $1 AND column2 = $2')
    expect(query.values).toEqual([value1, value2])
  })
})
