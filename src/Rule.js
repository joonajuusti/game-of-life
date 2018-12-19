const ALIVE = true
const DEAD = false

export class Rule{
  nextState(isAlive, liveNeighboursCount) {
    if(isAlive) {
      return this.nextStateOfLiveCell(liveNeighboursCount)
    }
    else {
      return this.nextStateOfDeadCell(liveNeighboursCount)
    }
  }

  nextStateOfLiveCell(liveNeighboursCount) {
    if(liveNeighboursCount < 2 || liveNeighboursCount > 3) {
      return DEAD
    } return ALIVE
  }

  nextStateOfDeadCell(liveNeighboursCount) {
    if(liveNeighboursCount === 3) {
      return ALIVE
    } return DEAD
  }
}