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
		let status = "Hello world";
		return (
			<h1>{status}</h1>
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
	
	currentTurn() {
		return "0";
	}
	
	handleClick(i,j) {
		console.log(this.state.currentStep);
		const currentStep = this.state.currentStep;
		const currentBoard = this.state.currentBoard.slice();
		currentBoard[i+3*j] = 0; 
		this.setState({
			currentBoard: currentBoard,
			currentStep: currentStep + 1
		})
		console.log(this.state.currentStep);
	}

	render() {

		const currentStep = this.state.currentStep;
		const currentBoard = this.state.currentBoard;

		return (
			<div className="game">
				<Status/>
				<Board onClick={(i,j)=>this.handleClick(i,j)} squares={currentBoard}/>
			</div>
		)
	}
}

ReactDOM.render(
	<Game/>,
	document.getElementById("root")
)
