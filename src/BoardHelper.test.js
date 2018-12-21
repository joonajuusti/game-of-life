import {
  getNeighboursOfCell,
  getPossibleNewCells,
  calculateAmountOfLiveNeighbours,
  calculateNextGenerationLiveCells
} from './BoardHelper';

const neighboursOfOrigo = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
]

describe.only('BoardHelper', () => {
  it('should return correct neighbours for cell at (0,0)', () => {
    const cell = { x: 0, y: 0 }
    expect(getNeighboursOfCell(cell)).to.eql(neighboursOfOrigo)
  })

  it('should return 13 possible new cells for cells with one dead cell between them', () => {
    const cells = [{ x: 0, y: 0 }, { x: 2, y: 0 }]
    expect(getPossibleNewCells(cells).length).to.equal(13)
  })

  it('should return 10 possible new cells for two adjacent cells', () => {
    const cells = [{ x: 0, y: 0 }, { x: 1, y: 0 }]
    expect(getPossibleNewCells(cells).length).to.equal(10)
  })

  it('should return one as the amount of live neighbour cells for a cell with one live neighbour', () => {
    const liveCells = [{ x: 0, y: 0 }]
    const cell = { x: 1, y: 1 }
    expect(calculateAmountOfLiveNeighbours(cell, liveCells)).to.equal(1)
  })

  it('should return zero as the amount of live neighbour cells for a cell with no neighbours', () => {
    const liveCells = [{ x: 0, y: 0 }]
    const cell = { x: 2, y: 2 }
    expect(calculateAmountOfLiveNeighbours(cell, liveCells)).to.equal(0)
  })

  it('should return two as the amount of live neighbour cells for a cell with two neighbours', () => {
    const liveCells = [{ x: 0, y: 0 }, { x: 1, y: 1 }]
    const cell = { x: 0, y: 1 }
    expect(calculateAmountOfLiveNeighbours(cell, liveCells)).to.equal(2)
  })

  it('should return no live cells for next generation for two adjacent cells', () => {
    const liveCells = [{ x: 0, y: 0 }, { x: 0, y: 1 }]
    expect(calculateNextGenerationLiveCells(liveCells).length).to.equal(0)
  })

  it('should return three live cells for next generation for a line of three cells', () => {
    const liveCells = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }]
    expect(calculateNextGenerationLiveCells(liveCells).length).to.equal(3)
  })

  it('should return four live cells for next generation for an l-shape of three cells', () => {
    const liveCells = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }]
    expect(calculateNextGenerationLiveCells(liveCells).length).to.equal(4)
  })
});