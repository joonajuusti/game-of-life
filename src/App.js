import React from 'react'
import Board from './Board'
import BoardController from './BoardController'
import { calculateNextGeneration } from './BoardHelper'
import _ from 'lodash'

const boardWidthInCells = 35
const boardHeightInCells = 15
const cellSideLength = 25

const divStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      liveCellPoints: [],
      cellAliveStatuses: Array(boardWidthInCells * boardHeightInCells).fill(false),
      simulationOn: false,
      generation: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { simulationOn, liveCellPoints } = this.state
    if ((!prevState.simulationOn && simulationOn) 
      || (prevState.simulationOn && simulationOn && !_.isEqual(prevState.liveCellPoints, liveCellPoints)))
    {
      setTimeout(this.simulate, 25)
    }
    if ((prevState.simulationOn && simulationOn && _.isEqual(prevState.liveCellPoints, liveCellPoints))) {
      this.toggleSimulation()
    }
  }

  toggleCellStatus = index => (x, y) => {
    const { cellAliveStatuses, simulationOn } = this.state
    if (simulationOn) return
    const newCellAliveStatuses = [...cellAliveStatuses]
    const isAlive = cellAliveStatuses[index]
    newCellAliveStatuses[index] = !isAlive
    const liveCellPoints = this.updateLiveCellPoints(isAlive, { x, y })
    this.setState({ cellAliveStatuses: newCellAliveStatuses, liveCellPoints })
  }

  updateLiveCellPoints = (isAlive, point) => {
    const { liveCellPoints } = this.state
    if (!isAlive) {
      return [...liveCellPoints, point]
    }
    return liveCellPoints.filter(liveCellPoint => !(liveCellPoint.x === point.x && liveCellPoint.y === point.y))
  }

  toggleSimulation = () => {
    const { simulationOn } = this.state
    this.setState({ simulationOn: !simulationOn })
  }

  simulate = () => {
    const { liveCellPoints, cellAliveStatuses, generation } = this.state
    const newCellAliveStatuses = [...cellAliveStatuses]
    const nextGeneration = calculateNextGeneration(liveCellPoints)

    const nextGenerationFiltered = {
      liveCells: nextGeneration.liveCells.filter(point => this.filterPoint(point)),
      cellChanges: nextGeneration.cellChanges.filter(point => this.filterPoint(point))
    }

    nextGenerationFiltered.cellChanges.forEach(point => {
      const index = point.y * boardWidthInCells + point.x
      newCellAliveStatuses[index] = !cellAliveStatuses[index]
    })
    this.setState({
      liveCellPoints: nextGenerationFiltered.liveCells,
      cellAliveStatuses: newCellAliveStatuses,
      generation: generation + 1,
    })
  }

  filterPoint = point => {
    if (point.x < 0 || point.x >= boardWidthInCells || point.y < 0 || point.y >= boardHeightInCells) {
      return false
    }
    return true
  }

  resetBoard = () => {
    const { cellAliveStatuses, simulationOn } = this.state
    this.setState({
      liveCellPoints: [],
      cellAliveStatuses: cellAliveStatuses.map(isAlive => false),
      simulationOn: false,
      generation: 0
    })
  }

  render() {
    const { cellAliveStatuses, simulationOn, generation } = this.state
    return(
      <div style={divStyle}>
        <h1>Conway's Game of Life</h1>
        <p>{`Generation: ${generation}`}</p>
        <Board
          cellAliveStatuses={cellAliveStatuses}
          toggleCellStatus={this.toggleCellStatus}
          boardWidthInCells={boardWidthInCells}
          boardHeightInCells={boardHeightInCells}
          cellSideLength={cellSideLength}
        />
        <BoardController
          toggleSimulation={this.toggleSimulation}
          resetBoard={this.resetBoard}
          simulationOn={simulationOn}
        />
      </div>
    )
  }
}

export default App