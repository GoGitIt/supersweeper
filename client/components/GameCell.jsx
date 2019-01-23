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
            return (<div id={this.state.coordinates} className={styles.cell} onClick={(e) => {
                e.preventDefault();
                this.props.handleClick(e.target.id);
            }} onContextMenu={(e) => {
                e.preventDefault();
                this.props.placeFlag(e.target.id);
            }}><div id={this.state.coordinates + ',mine'} className={styles.mine}>
                M
            </div>
            </div>)
        }
        return (<div id={this.state.coordinates} className={styles.cell} onClick={(e) => {
            e.preventDefault();
            this.props.handleClick(e.target.id);
        }} onContextMenu={(e) => {
            e.preventDefault();
            this.props.placeFlag(e.target.id);
        }}>
            <div id={this.state.coordinates + ',mine'} className={styles.mine}>
            
                O
            </div>
            </div>);
    }
}

export default GameCell;