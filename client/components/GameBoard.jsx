import React from 'react';
import styles from '../styles.css';
import GameCell from './GameCell.jsx';
import DropDownMenu from './DropDownMenu.jsx';

class GameBoard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            level: 'beginner',
            beginner: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11],
            intermediate: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13],
            expert: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15],
            zeros: [],
            flags: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleZeros = this.handleZeros.bind(this);
        this.handleGameOver = this.handleGameOver.bind(this);
        this.changeDifficulty = this.changeDifficulty.bind(this);
        this.placeFlag = this.placeFlag.bind(this);
    }

    changeDifficulty(e) {
        console.log('Difficulty:', e)
        if (e === 'Beginner') {
            this.setState({level: 'beginner'});
        } else if (e === 'Intermediate') {
            this.setState({level: 'intermediate'});
        } else if (e === 'Expert') {
            this.setState({level: 'expert'});
        }
    }

    handleClick(e) {
        //Identify when the game has ended by checking div id and then do nothing. Disables handleClick.
        if (document.getElementById('gameover')) {
            return;
        }

        if (document.getElementById(e + ',mine').textContent !== 'M' && this.state.flags.includes(e) === false) {
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

            if (document.getElementById(top) && document.getElementById(top + ',mine').textContent === 'M') {
                mineCount++;
            }
            if (document.getElementById(topRight) && document.getElementById(topRight + ',mine').textContent === 'M') {
                mineCount++;
            }
            if (document.getElementById(right) && document.getElementById(right + ',mine').textContent === 'M') {
                mineCount++;
            }
            if (document.getElementById(bottomRight) && document.getElementById(bottomRight + ',mine').textContent === 'M') {
                mineCount++;
            }
            if (document.getElementById(bottom) && document.getElementById(bottom + ',mine').textContent === 'M') {
                mineCount++;
            }
            if (document.getElementById(bottomLeft) && document.getElementById(bottomLeft + ',mine').textContent === 'M') {
                mineCount++;
            }
            if (document.getElementById(left) && document.getElementById(left + ',mine').textContent === 'M') {
                mineCount++;
            }
            if (document.getElementById(topLeft) && document.getElementById(topLeft + ',mine').textContent === 'M') {
                mineCount++;
            }

            if (mineCount === 0) {
                this.handleZeros(coor, top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft);
            }

            if (e.split(',').length === 3) {
                if (document.getElementById(e).textContent !== "M") {
                    document.getElementById(e).textContent = mineCount;
                }
                document.getElementById(e).style.visibility = "visible";
            } else {
                if (document.getElementById(e).textContent !== "M") {
                    document.getElementById(e + ',mine').textContent = mineCount;
                }
                document.getElementById(e + ',mine').style.visibility = "visible";
            }
        } else if (document.getElementById(e + ',mine').textContent === 'M' && this.state.flags.includes(e) === false) {
            this.handleGameOver();
        }
    }

    placeFlag(coords) {
        if (this.state.flags.includes(coords) === true) {
            let flag = this.state.flags;
            let index = flag.indexOf(coords);
            flag.splice(index, 1);
            document.getElementById(coords).style.backgroundColor = 'transparent';
            this.setState({flags: flag});
        } else if (this.state.flags.includes(coords) === false) {
            let flag = this.state.flags;
            flag.push(coords);
            this.setState({ flags: flag });
            document.getElementById(coords).style.backgroundColor = 'red';
        }
    }

    handleGameOver () {
        for (let i = 0; i < this.state[this.state.level].length; i++) {
            for(let j = 0; j < this.state[this.state.level].length; j++) {
                if (document.getElementById([i, j].toString() + ',mine').textContent === 'M') {
                    document.getElementById([i, j].toString() + ',mine').style.visibility = "visible";
                    document.getElementById([i, j].toString() + ',mine').id = 'gameover';
                }
            }
        }
    }

    handleZeros (coord, top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft) {
        let zerosArr = this.state.zeros;
        if(this.state.zeros.includes(coord.join(',')) === false) {
            zerosArr.push(coord.join(','));

            if (document.getElementById(top) && document.getElementById(top + ',mine').textContent !== 'M') {
                this.handleClick(top);
            }
            if (document.getElementById(topRight) && document.getElementById(topRight + ',mine').textContent !== 'M') {
                this.handleClick(topRight);
            }
            if (document.getElementById(right) && document.getElementById(right + ',mine').textContent !== 'M') {
                this.handleClick(right);
            }
            if (document.getElementById(bottomRight) && document.getElementById(bottomRight + ',mine').textContent !== 'M') {
                this.handleClick(bottomRight);
            }
            if (document.getElementById(bottom) && document.getElementById(bottom + ',mine').textContent !== 'M') {
                this.handleClick(bottom);
            }
            if (document.getElementById(bottomLeft) && document.getElementById(bottomLeft + ',mine').textContent !== 'M') {
                this.handleClick(bottomLeft);
            }
            if (document.getElementById(left) && document.getElementById(left + ',mine').textContent !== 'M') {
                this.handleClick(left);
            }
            if (document.getElementById(topLeft) && document.getElementById(topLeft + ',mine').textContent !== 'M') {
                this.handleClick(topLeft);
            }
        }
    }

    render() {
        document.oncontextmenu = () => {return false;};
        return (<div>
            <DropDownMenu handleClick={this.changeDifficulty}></DropDownMenu>
            <h1>Game Board!</h1>
            {this.state[this.state.level].map((x, i) => <div className={styles.row}>{this.state[this.state.level].map((x, j) => <GameCell placeFlag={this.placeFlag} handleClick={this.handleClick} coordinates={[i, j]}/>)}</div>)}
        </div>)
    }
}

export default GameBoard;