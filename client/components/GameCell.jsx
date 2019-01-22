import React from 'react';
import styles from '../styles.css';

class GameCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: [props.coordinates[0], props.coordinates[1]],
            mine: [false, false, false, true][Math.floor(Math.random() * 4)]
        }
    }



    render () {
        if(this.state.mine === true ) {
            return (<div className={styles.cell} onClick={(e) => {
                e.preventDefault();
            }}>
                {this.state.coordinates}
                M
            </div>)
        }
        return (<div>
            <div className={styles.cell}>
            {this.state.coordinates}
            O
            </div>
            </div>);
    }
}

export default GameCell;