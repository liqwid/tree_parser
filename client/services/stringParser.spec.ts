import parseStringTree from './stringParser'

const text = '\
page 1\n\
  page 1.1\n\
  page 1.2\n\
    page 1.2.1\n\
page 2\n\
page 3\n\
  page 3.1\n\
  page 3.2\n\
page 4\n\
  page 4.1\n\
    page 4.1.1\n\
      page 4.1.1.1\n\
page 5\
'
// Expected results are made one-liners for compactness, use jsonlint.com for formatting
const expectedResult = {"title":"Root","isRoot":true,"children":[{"title":"page 1","isRoot":false,"children":[{"title":"page 1.1","isRoot":false,"children":[],"dfsId":2},{"title":"page 1.2","isRoot":false,"children":[{"title":"page 1.2.1","isRoot":false,"children":[],"dfsId":4}],"dfsId":3}],"dfsId":1},{"title":"page 2","isRoot":false,"children":[],"dfsId":5},{"title":"page 3","isRoot":false,"children":[{"title":"page 3.1","isRoot":false,"children":[],"dfsId":7},{"title":"page 3.2","isRoot":false,"children":[],"dfsId":8}],"dfsId":6},{"title":"page 4","isRoot":false,"children":[{"title":"page 4.1","isRoot":false,"children":[{"title":"page 4.1.1","isRoot":false,"children":[{"title":"page 4.1.1.1","isRoot":false,"children":[],"dfsId":12}],"dfsId":11}],"dfsId":10}],"dfsId":9},{"title":"page 5","isRoot":false,"children":[],"dfsId":13}],"dfsId":0}

const newLineText = '\
page 1\n\
  page 1.1\n\
    page 1.1.1\n\
      page 1.1.1.1\n\
    page 1.1.2\
'
const newLineResult = {"title":"Root","isRoot":true,"children":[{"title":"page 1","isRoot":false,"children":[{"title":"page 1.1","isRoot":false,"children":[{"title":"page 1.1.1","isRoot":false,"children":[{"title":"page 1.1.1.1","isRoot":false,"children":[],"dfsId":4}],"dfsId":3},{"title":"page 1.1.2","isRoot":false,"children":[],"dfsId":5}],"dfsId":2}],"dfsId":1}],"dfsId":0}

const mixedIndent = '\
page 1\n\
     page 1.1\n\
  page 1.2\
'
const mixedIndentResult = {"title":"Root","isRoot":true,"children":[{"title":"page 1","isRoot":false,"children":[{"title":"page 1.1","isRoot":false,"children":[],"dfsId":2},{"title":"page 1.2","isRoot":false,"children":[],"dfsId":3}],"dfsId":1}],"dfsId":0}

const reversedIndent = '\
    page 1\n\
  page 2\n\
page 3\
'
const reversedIndentResult = {"title":"Root","isRoot":true,"children":[{"title":"page 1","isRoot":false,"children":[],"dfsId":1},{"title":"page 2","isRoot":false,"children":[],"dfsId":2},{"title":"page 3","isRoot":false,"children":[],"dfsId":3}],"dfsId":0}


describe('string parser', () => {
  it('should parse trees correctly', () => {
    expect(parseStringTree(text)).toEqual(expectedResult)
  })

  it('should handle coming back not to the root level', () => {
    expect(parseStringTree(newLineText)).toEqual(newLineResult)
  })

  it('should handle mixed indent', () => {
    expect(parseStringTree(mixedIndent)).toEqual(mixedIndentResult)
  })

  it('should handle reversed indent', () => {
    expect(parseStringTree(reversedIndent)).toEqual(reversedIndentResult)
  })
})
