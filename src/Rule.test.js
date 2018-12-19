import { Rule } from './Rule';

describe('Rule', () => {
  let rule
  before(() => {
    rule = new Rule()
  })

  it('should return false if live cell has less than two live neighbours', () => {
    expect(rule.nextState(true, 1)).to.equal(false)
  })

  it('should return false if live cell has more than three live neighbours', () => {
    expect(rule.nextState(true, 4)).to.equal(false)
  })

  it('should return true if live cell has two or three live neighbours', () => {
    expect(rule.nextState(true, 2)).to.equal(true)
    expect(rule.nextState(true, 3)).to.equal(true)
  })

  it('should return true if dead cell exactly three live neighbours', () => {
    expect(rule.nextState(false, 3)).to.equal(true)
  })
});