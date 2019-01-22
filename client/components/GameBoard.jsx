import React from 'react';
import styles from '../styles.css';
import GameCell from './GameCell.jsx';

class GameBoard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            level: 'intermediate',
            beginner: [1, 2, 3, 4, 5, 6, 8, 9, 10],
            intermediate: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12],
            expert: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14]
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        //console.log(e);
        // var coordinates = e.split(',');
        //console.log(document.getElementById(e));
        if (e.split(',').length === 3) {
            console.log(e)
            document.getElementById(e).style.visibility = "visible";
        } else {
            document.getElementById(e + ',mine').style.visibility = "visible";
        }
    }

    render() {
        return (<div>
            <h1>Game Board!</h1>
            {this.state[this.state.level].map((x, i) => <div className={styles.row}>{this.state[this.state.level].map((x, j) => <GameCell handleClick={this.handleClick} coordinates={[i, j]}/>)}</div>)}
        </div>)
    }
}

export default GameBoard;