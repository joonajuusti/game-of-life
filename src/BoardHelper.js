import _ from 'lodash'
import nextState from './Rule'

const getNeighboursOfCell = cell => {
  const neighboursOfCell = []
  for(let x = cell.x - 1; x <= cell.x + 1; x++) {
    for(let y = cell.y - 1; y <= cell.y + 1; y++) {
      if(x === cell.x && y === cell.y) {
        continue
      }
      neighboursOfCell.push({ x, y })
    }
  }
  return neighboursOfCell
}

const getPossibleNewCells = liveCells => {
  const possibleNewCells = []
  liveCells.forEach(liveCell => possibleNewCells.push(...getNeighboursOfCell(liveCell)))
  const possibleNewCellsWithoutDuplicates = _.uniqWith(possibleNewCells, _.isEqual)
  const possibleNewCellsWithoutDuplicatesAndLiveCells = _.differenceWith(
    possibleNewCellsWithoutDuplicates,
    liveCells,
    _.isEqual
  )
  return possibleNewCellsWithoutDuplicatesAndLiveCells
}

const calculateAmountOfLiveNeighbours = (cell, liveCells) => {
  const neighboursOfCell = getNeighboursOfCell(cell)
  const liveNeighboursOfCell = _.intersectionWith(neighboursOfCell, liveCells, _.isEqual)
  return liveNeighboursOfCell.length
}

const calculateNextGeneration = liveCells => {
  const nextGeneration = {
    liveCells: [],
    cellChanges: []
  }
  const possibleNewCells = getPossibleNewCells(liveCells)
  liveCells.forEach(liveCell => {
    const liveNeighbourAmount = calculateAmountOfLiveNeighbours(liveCell, liveCells)
    if (nextState(true, liveNeighbourAmount)) {
      nextGeneration.liveCells.push(liveCell)
    } else {
      nextGeneration.cellChanges.push(liveCell)
    }
  })
  possibleNewCells.forEach(deadCell => {
    const liveNeighbourAmount = calculateAmountOfLiveNeighbours(deadCell, liveCells)
    if (nextState(false, liveNeighbourAmount)) {
      nextGeneration.liveCells.push(deadCell)
      nextGeneration.cellChanges.push(deadCell)
    }
  })
  return nextGeneration
}

export { getNeighboursOfCell, getPossibleNewCells, calculateAmountOfLiveNeighbours, calculateNextGeneration }