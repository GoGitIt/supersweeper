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
            expert: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14],
            zeros: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleZeros = this.handleZeros.bind(this);
        this.handleGameOver = this.handleGameOver.bind(this);
    }

    handleClick(e) {
        console.log(e);

        if (document.getElementById(e + ',mine').textContent !== 'M') {
            var coor = e.split(',');
            var top = [Number(coor[0]), Number(coor[1]) - 1].toString();
            var topRight = [Number(coor[0]) + 1, Number(coor[1]) - 1].toString();
            var right = [Number(coor[0]) + 1, Number(coor[1])].toString();
            var bottomRight = [Number(coor[0]) + 1, Number(coor[1]) + 1].toString();
            var bottom = [Number(coor[0]), Number(coor[1]) + 1].toString();
            var bottomLeft = [Number(coor[0]) - 1, Number(coor[1]) + 1].toString();
            var left = [Number(coor[0]) - 1, Number(coor[1])].toString();
            var topLeft = [Number(coor[0]) - 1, Number(coor[1]) - 1].toString();

            var mineCount = 0;


            console.log('?', coor, left, topLeft, bottom)
            if (document.getElementById(top) && document.getElementById(top + ',mine').textContent === 'M') {
                mineCount++;
                console.log('top')
            }
            if (document.getElementById(topRight) && document.getElementById(topRight + ',mine').textContent === 'M') {
                mineCount++;
                console.log('tr')
            }
            if (document.getElementById(right) && document.getElementById(right + ',mine').textContent === 'M') {
                mineCount++;
                console.log('r')
            }
            if (document.getElementById(bottomRight) && document.getElementById(bottomRight + ',mine').textContent === 'M') {
                mineCount++;
                console.log('br')
            }
            if (document.getElementById(bottom) && document.getElementById(bottom + ',mine').textContent === 'M') {
                mineCount++;
                console.log('b')
            }
            if (document.getElementById(bottomLeft) && document.getElementById(bottomLeft + ',mine').textContent === 'M') {
                mineCount++;
                console.log('bl')
            }
            if (document.getElementById(left) && document.getElementById(left + ',mine').textContent === 'M') {
                mineCount++;
                console.log('l')
            }
            if (document.getElementById(topLeft) && document.getElementById(topLeft + ',mine').textContent === 'M') {
                mineCount++;
                console.log('tl')
            }

            console.log(mineCount)

            if (mineCount === 0) {
                this.handleZeros(coor, top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft);
            }

            if (e.split(',').length === 3) {
                console.log(document.getElementById(e).textContent)
                if (document.getElementById(e).textContent !== "M") {
                    document.getElementById(e).textContent = mineCount;
                }
                document.getElementById(e).style.visibility = "visible";
            } else {
                console.log(document.getElementById(e + ',mine').textContent)
                if (document.getElementById(e).textContent !== "M") {
                    document.getElementById(e + ',mine').textContent = mineCount;
                }
                document.getElementById(e + ',mine').style.visibility = "visible";
            }
        } else {
            // alert('GAME OVA');
            this.handleGameOver();
        } 
    }

    handleGameOver () {
        console.log('Game over called')
        for (let i = 0; i < this.state[this.state.level].length; i++) {
            for(let j = 0; j < this.state[this.state.level].length; j++) {
                console.log('Game over coords:', [i, j].toString())
                if (document.getElementById([i, j].toString() + ',mine').textContent === 'M') {
                    document.getElementById([i, j].toString() + ',mine').style.visibility = "visible";
                }
            }
        }
    }

    handleZeros (coord, top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft) {
        let zerosArr = this.state.zeros;
        console.log('Accumulating found zeros:', this.state.zeros, 'what is ', top)
        if(this.state.zeros.includes(coord.join(',')) === false) {
            zerosArr.push(coord.join(','));
            console.log('Not seen zero coord')
            if (document.getElementById(top) && document.getElementById(top + ',mine').textContent !== 'M') {
                this.handleClick(top);
                console.log('1')
            }
            if (document.getElementById(topRight) && document.getElementById(topRight + ',mine').textContent !== 'M') {
                this.handleClick(topRight);
                console.log('2')
            }
            if (document.getElementById(right) && document.getElementById(right + ',mine').textContent !== 'M') {
                this.handleClick(right);
                console.log('3')
            }
            if (document.getElementById(bottomRight) && document.getElementById(bottomRight + ',mine').textContent !== 'M') {
                this.handleClick(bottomRight);
                console.log('4')
            }
            if (document.getElementById(bottom) && document.getElementById(bottom + ',mine').textContent !== 'M') {
                this.handleClick(bottom);
                console.log('5')
            }
            if (document.getElementById(bottomLeft) && document.getElementById(bottomLeft + ',mine').textContent !== 'M') {
                this.handleClick(bottomLeft);
                console.log('6')
            }
            if (document.getElementById(left) && document.getElementById(left + ',mine').textContent !== 'M') {
                this.handleClick(left);
                console.log('7')
            }
            if (document.getElementById(topLeft) && document.getElementById(topLeft + ',mine').textContent !== 'M') {
                this.handleClick(topLeft);
                console.log('8')
            }
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