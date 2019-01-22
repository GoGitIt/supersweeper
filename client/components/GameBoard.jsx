import React from 'react';
import styles from '../styles.css';
import GameCell from './GameCell.jsx';

class GameBoard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            level: 'beginner',
            beginner: [1, 2, 3, 4, 5, 6, 8, 9, 10],
            intermediate: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12],
            expert: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14]
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log(e);
        var coor = e.split(',');
        var top = [coor[0], coor[1] - 1].toString('');
        var topRight = [coor[0] + 1, coor[1] - 1].toString('');
        var right = [coor[0] + 1, coor[1]].toString('');
        var bottomRight = [coor[0] + 1, coor[1] + 1].toString('');
        var bottom = [coor[0], coor[1] + 1].toString('');
        var bottomLeft = [coor[0] - 1, coor[1] + 1].toString('');
        var left = [coor[0] - 1, coor[1]].toString('');
        var topLeft = [coor[0] - 1, coor[1] - 1].toString('');

        var mineCount = 0;

        if (document.getElementById(top) && document.getElementById(top +',mine').textContent === 'M') {
            mineCount++;
        }
        if (document.getElementById(topRight) && document.getElementById(topRight +',mine').textContent === 'M') {
            mineCount++;
        } 
        if (document.getElementById(right) && document.getElementById(right +',mine').textContent === 'M') {
            mineCount++;
        }
        if (document.getElementById(bottomRight) && document.getElementById(bottomRight +',mine').textContent === 'M') {
            mineCount++;
        }
        if (document.getElementById(bottom) && document.getElementById(bottom +',mine').textContent === 'M') {
            mineCount++;
        }
        if (document.getElementById(bottomLeft) && document.getElementById(bottomLeft +',mine').textContent === 'M') {
            mineCount++;
        }
        if (document.getElementById(left) && document.getElementById(left +',mine').textContent === 'M') {
            mineCount++;
        }
        if (document.getElementById(topLeft) && document.getElementById(topLeft +',mine').textContent === 'M') {
            mineCount++;
        }

        console.log(mineCount)

        if (e.split(',').length === 3) {
            console.log(document.getElementById(e).textContent)
            document.getElementById(e).style.visibility = "visible";
        } else {
            console.log(document.getElementById(e + ',mine').textContent)
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