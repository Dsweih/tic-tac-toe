import React, { Component } from 'react'
import classNames from 'classnames'
import './App.css'
import Grid from './components/Grid'
import Cell from './components/Cell'


let count = 0

class App extends Component {
  constructor() {
    super()
    this.state = {
      cells: [],
      turn: 1,
      winText: 'Player:'
    }

    this.handleRestart = this.handleRestart.bind(this)
    this.handleNextTurn = this.handlePlay.bind(this)
    this.handleWin = this.handleWin.bind(this)
  }

  handleRestart() {
    this.setState({
      cells: Array.from({length: 9}, () => {
        return {
          type: 0
        }
      }),
      turn: 1,
      winText: 'Player:'
    })
    count = 0
  }

  handlePlay(cell) {
    if (cell.type === 0 && this.state.winText === 'Player:') {
      cell.type = this.state.turn
      this.setState({
        turn: -this.state.turn
      })
      count += 1
      this.handleWin()
    }
  }

  handleWin() {
    const conditions = '123,456,789,147,258,369,159,357'
    const results = conditions.split(',').map((condition) => {
      let value = this.state.cells.filter((value, i) => {
        return condition.indexOf(i + 1) !== -1
      }).map((cell) => cell.type)
      .reduce((prev, curr) => (prev + curr), 0)
      return { pattern: condition, value}
    }).filter((obj) => Math.abs(obj.value) === 3)
    if (results.length > 0){
      this.setState({
        winText: `${(results[0].value > 0 ? "O" : "X")} Wins!`
      })
    } else if (count === 9) {
      
      this.setState({
        winText: 'Draw!'
      })
    }
  }

  componentDidMount() {
    this.handleRestart()
  }

  render() {
    return (
      <div className="container">
        <Grid>
          {
            this.state.cells.map((cell, index) => {
              return (
                <Cell 
                  key={index} 
                  dataIndex={index+1} 
                  type={cell.type} 
                  onPlay={(e) => {
                    this.handlePlay(cell)
                  }
                }/>
              )
            })
          }
        </Grid>
        <h1 className={classNames(
            'player',
            { 'circle--win': this.state.winText === 'O Wins!'},
            { 'cross--win': this.state.winText === 'X Wins!'},
            { 'draw': this.state.winText === 'Draw!'}
          )}>
          {this.state.winText}
        </h1>
        <Cell small type={this.state.turn} winText={this.state.winText}/>
        <span className="btn" onClick={this.handleRestart}>Restart</span>
      </div>
    )
  }
}

export default App
