import React from 'react';

class DropDownMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {

        if (!this.dropdownMenu.contains(event.target)) {

            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });

        }
    }

    render() {
        return (
            <div>
                <button onClick={this.showMenu}>
                    Select difficulty
        </button>

                {
                    this.state.showMenu
                        ? (
                            <div
                                className="menu"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}
                            >
                                <button value={'Beginner'} onClick={(e) => {
                                    e.preventDefault();
                                    this.props.handleClick(e.target.value);
                                }}> Beginner </button>
                                <button value={'Intermediate'} onClick={(e) => {
                                    e.preventDefault();
                                    this.props.handleClick(e.target.value);
                                }}> Intermediate </button>
                                <button value={'Expert'} onClick={(e) => {
                                    e.preventDefault();
                                    this.props.handleClick(e.target.value);
                                }}> Expert </button>
                            </div>
                        )
                        : (
                            null
                        )
                }
            </div>
        );
    }
}

export default DropDownMenu;