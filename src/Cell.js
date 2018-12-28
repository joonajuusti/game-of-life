import React from 'react'

const Cell = ({ isAlive, point, toggleCellStatus, cellSideLength }) => {
  const getColor = () => {
    return isAlive ? 'black' : 'white'
  }
  return (
    <rect
      onClick={() => toggleCellStatus(point.x, point.y)}
      x={ point.x * cellSideLength } 
      y={ point.y * cellSideLength } 
      width={ cellSideLength } 
      height={ cellSideLength } 
      fill={ getColor() } 
      stroke="black" 
      strokeWidth="1"
    />
  )
}

export default Cell
