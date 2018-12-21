import nextState from './Rule';

describe('Rule', () => {
  it('should return false if live cell has less than two live neighbours', () => {
    expect(nextState(true, 1)).to.equal(false)
  })

  it('should return false if live cell has more than three live neighbours', () => {
    expect(nextState(true, 4)).to.equal(false)
  })

  it('should return true if live cell has two or three live neighbours', () => {
    expect(nextState(true, 2)).to.equal(true)
    expect(nextState(true, 3)).to.equal(true)
  })

  it('should return true if dead cell exactly three live neighbours', () => {
    expect(nextState(false, 3)).to.equal(true)
  })
});