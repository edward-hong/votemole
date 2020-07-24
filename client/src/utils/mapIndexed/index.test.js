import mapIndexed from '.'

describe('mapIndexed', () => {
  it('maps an array with index values', () => {
    expect(mapIndexed((val, index) => index, [0, 0, 0])).toEqual([0, 1, 2])
  })
})
