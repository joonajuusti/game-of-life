import {
  getNeighboursOfCell,
  getPossibleNewCells,
  calculateAmountOfLiveNeighbours,
  calculateNextGeneration
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

  it('should return no live cells as next generation live cells for two adjacent cells', () => {
    const liveCells = [{ x: 0, y: 0 }, { x: 0, y: 1 }]
    expect(calculateNextGeneration(liveCells).liveCells.length).to.equal(0)
  })

  it('should return three live cells as next generation live cells for a line of three cells', () => {
    const liveCells = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }]
    expect(calculateNextGeneration(liveCells).liveCells.length).to.equal(3)
  })

  it('should return four live cells as next generation live cells for an l-shape of three cells', () => {
    const liveCells = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }]
    expect(calculateNextGeneration(liveCells).liveCells.length).to.equal(4)
  })

  it('should return two cells as cells to remove for two adjacent cells', () => {
    const liveCells = [{ x: 0, y: 0 }, { x: 0, y: 1 }]
    expect(calculateNextGeneration(liveCells).cellChanges.length).to.equal(2)
  })

  it('should return four cells as cells to remove for a line of three cells', () => {
    const liveCells = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }]
    expect(calculateNextGeneration(liveCells).cellChanges.length).to.equal(4)
  })

  it('should return one cell as cell to remove for an l-shape of three cells', () => {
    const liveCells = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }]
    expect(calculateNextGeneration(liveCells).cellChanges.length).to.equal(1)
  })
});