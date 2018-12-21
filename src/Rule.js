const ALIVE = true
const DEAD = false

export default (isAlive, liveNeighboursCount) => {
  if(isAlive) {
    return nextStateOfLiveCell(liveNeighboursCount)
  }
  else {
    return nextStateOfDeadCell(liveNeighboursCount)
  }
}

function nextStateOfLiveCell(liveNeighboursCount) {
  if(liveNeighboursCount < 2 || liveNeighboursCount > 3) {
    return DEAD
  } return ALIVE
}

function nextStateOfDeadCell(liveNeighboursCount) {
  if(liveNeighboursCount === 3) {
    return ALIVE
  } return DEAD
}