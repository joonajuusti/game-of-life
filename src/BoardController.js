import React from 'react'

const controllerStyle = {
  display: 'flex',
}

const buttonStyle = {
  margin: 5
}

const BoardController = ({ toggleSimulation, resetBoard, simulationOn }) => {
  return(
    <div>
      <button style={buttonStyle} onClick={toggleSimulation}>{simulationOn ? 'Stop' : 'Start'}</button>
      <button style={buttonStyle} onClick={resetBoard} disabled={simulationOn}>Reset</button>
    </div>
  )
}

export default BoardController