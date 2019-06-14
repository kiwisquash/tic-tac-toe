import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
	render() {
		return (<div className="square" onClick={this.props.onClick}>{this.props.value}</div>);
	}
}

class Board extends React.Component {

	renderSquare(i,j) {
		return <Square onClick={()=>this.props.onClick(i,j)} value={this.props.squares[i+3*j]}/>
	}
	render() {
		return (
			<div className="board">
				<div className="row">
					{ this.renderSquare(0,0) }
					{ this.renderSquare(0,1) }
					{ this.renderSquare(0,2) }
			</div>
				<div className="row">
					{ this.renderSquare(1,0) }
					{ this.renderSquare(1,1) }
					{ this.renderSquare(1,2) }
			</div>
				<div className="row">
					{ this.renderSquare(2,0) }
					{ this.renderSquare(2,1) }
					{ this.renderSquare(2,2) }
				</div>
			</div>
		);
	}
}

class Status extends React.Component {
	render() {
		let status;
		const	step = this.props.step;
		const victory = this.props.victory;

		if (victory) {
			status = currentTurn(step - 1) + " wins";
		} else if (step > 8 ) {
			status = "It is a draw"
		} else {
			status = "It is " + currentTurn(step) +"'s turn";
		}
		return (
			<div>
				<h1>Welcome to Tic-Tac-Toe</h1>
				<h2>{status}</h2>
			</div>
		)
	}
}

class Game extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			currentBoard: Array(9).fill(null),
			currentStep: 0,
		}
		// this.currentTurn = this.currentTurn.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	isFilled(i,j) {
		return Boolean(this.state.currentBoard[i+3*j])
	}

	arrIndex(i,j) {
		return i + 3*j
	}

	victoryCheck() {
		const currentBoard = this.state.currentBoard;
		let val;

		val = currentBoard[this.arrIndex(0,0)]
		if (val) {
			for (let i = 0; i < 3; i++) {
					if (val !== currentBoard[this.arrIndex(i,i)]) {
						break;
					} 
					if (i===2) {
						return true; 
					}
			}	
		}
		
		val = currentBoard[this.arrIndex(0,2)]
		if (val) {
			for (let i = 0; i < 3; i++) {
					if (val !== currentBoard[this.arrIndex(i,2-i)]) {
						break;
					}
					if (i===2) {
						return true; 
					}
		  }	
		}

		for (let i = 0; i < 3; i++) {
			val = currentBoard[this.arrIndex(i,0)]
			if (val) {
				for (let j = 0; j < 3; j++) {
					if (val !== currentBoard[this.arrIndex(i,j)]) {
						break;
					} 
					if (j===2) {
						return true;
					}
				}
			}
		}

		for (let i = 0; i < 3; i++) {
			val = currentBoard[this.arrIndex(0,i)]
			if (val) {
				for (let j = 0; j < 3; j++) {
					if (val !== currentBoard[this.arrIndex(j,i)]) {
						break;
					} 
					if (j===2) {
						return true;
					}
				}
			}
		}
		return false;
	}
	
	handleClick(i,j) {
		const currentStep = this.state.currentStep;
		const currentBoard = this.state.currentBoard.slice();
		if (this.isFilled(i,j)||this.victoryCheck()) {
			return
		}
		currentBoard[this.arrIndex(i,j)] = currentTurn(currentStep); 
		this.setState({
			currentBoard: currentBoard,
			currentStep: currentStep + 1
		})
	}

	render() {

		const currentStep = this.state.currentStep;
		const currentBoard = this.state.currentBoard;

		return (
			<div className="game">
				<Status step={this.state.currentStep} victory={this.victoryCheck()}/>
				<Board onClick={(i,j)=>this.handleClick(i,j)} squares={currentBoard}/>
			</div>
		)
	}
}

ReactDOM.render(
	<Game/>,
	document.getElementById("root")
)

function currentTurn(step) {
	return ((step % 2 === 0) ? "O":"X");
 }

