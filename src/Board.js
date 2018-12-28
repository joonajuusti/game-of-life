import React from 'react'
import Cell from './Cell'

const Board = ({ cellAliveStatuses, toggleCellStatus, boardWidthInCells, boardHeightInCells, cellSideLength }) => {
  return (
    <svg width={boardWidthInCells * cellSideLength} height={boardHeightInCells * cellSideLength}>
      {cellAliveStatuses.map((isAlive, index) => {
        const x = index % boardWidthInCells
        const y = Math.floor(index / boardWidthInCells)
        return (
          <Cell
            isAlive={isAlive}
            point={ {x, y} }
            toggleCellStatus={toggleCellStatus(index)}
            cellSideLength={cellSideLength}
            key={`${y},${x}`}
          />
        )     
      })}
    </svg>
  )
}

export default Board