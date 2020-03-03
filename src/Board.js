import React, { Component } from "react";
import Cell from "./Cell";

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightsStartsOn: 0.3,
    testBoard: [
      [false, true, false, false, false, false],
      [true, true, true, false, false, false],
      [false, true, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false]
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.generatePlayableBoard()
    };
    this.handleClick = this.handleClick.bind(this);
  }

  generateBoard() {
    return Array(this.props.nrows)
      .fill(undefined)
      .map(() =>
        Array(this.props.ncols)
          .fill(undefined)
          .map(() =>
            Math.random() < this.props.chanceLightsStartsOn ? true : false
          )
      );
  }

  isBoardCleared(board) {
    return board.every(row => row.every(cell => !cell));
  }

  generatePlayableBoard() {
    let initialBoard;
    do {
      initialBoard = this.generateBoard();
    } while (this.isBoardCleared(initialBoard));
    return initialBoard;
  }

  handleClick(e) {
    this.switchLights(e);
  }

  switchLights(e) {
    const y = Number(e.target.getAttribute("row"));
    const x = Number(e.target.getAttribute("col"));
    const { ncols, nrows } = this.props;
    const board = [...this.state.board];

    function switchLight(y, x) {
      if (y >= 0 && y < nrows && x >= 0 && x < ncols) {
        board[y][x] = !board[y][x];
      }
    }

    switchLight(y, x);
    switchLight(y - 1, x);
    switchLight(y, x - 1);
    switchLight(y + 1, x);
    switchLight(y, x + 1);

    this.setState(() => board);
    this.isBoardCleared(this.state.board) && this.setState({ hasWon: true });
  }

  componentDidMount() {
    document.documentElement.style.setProperty("--nrows", this.props.nrows);
    document.documentElement.style.setProperty("--ncols", this.props.ncols);
    this.generatePlayableBoard();
  }

  render() {
    const gameState = this.state.board.map((arr, arrIndex) =>
      arr.map((cell, cellIndex) => (
        <Cell
          key={`${arrIndex}x${cellIndex}`}
          row={arrIndex}
          col={cellIndex}
          handleClick={this.handleClick}
          isLit={cell}
        />
      ))
    );
    return (
      <div className="Board">
        {this.state.hasWon ? (
          <h1 className="Board__header">
            <span className="Board__header--orange">YOU</span>
            <span className="Board__header--blue">WON</span>
          </h1>
        ) : (
          <React.Fragment>
            <h1 className="Board__header">
              <span className="Board__header--orange">LIGHTS</span>
              <span className="Board__header--blue">OUT</span>
            </h1>
            <div className="Board__grid">{gameState}</div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Board;
