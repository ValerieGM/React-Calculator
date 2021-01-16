import React, { Component } from 'react';

class KeyPad extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () =>{
        console.log("momma");
      }
    
    render() {
        return (
            <button className="keypad" id={this.props.id} onClick={this.handleClick}>
                {this.props.val}
            </button>
        );
    }
}

export default KeyPad;