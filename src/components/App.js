import React, { Component } from 'react';
import KeyPad               from './KeyPad';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const characters = [
      { val: "7", id: "seven" },
      { val: "8", id: "eight" },
      { val: "9", id: "nine" },
      { val: "/", id: "divide" },
    
      { val: "4", id: "four" },
      { val: "5", id: "five" },
      { val: "6", id: "six" },
      { val: "*", id: "multiply" },
    
      { val: "1", id: "one" },
      { val: "2", id: "two" },
      { val: "3", id: "three" },
      { val: "-", id: "subtract" },
    
      { val: "0", id: "zero" },
      { val: ".", id: "decimal" },
      { val: "=", id: "equals" },
      { val: "+", id: "add" },
    
      { val: "AC", id: "clear" },
      { val: "DEL", id: "delete" }
    ];

    const pads = characters.map((pads, count, keys) => {
      return <KeyPad key={[count]} val={keys[count].val} id={keys[count].id}/>;
    });

    return (
      <div className="Calculator">
        <div id="main" className="main">
        <h1>Calculator</h1>

        <div id="display" className="display col-11 mx-auto my-2">
          0
        </div>

        <div id="keypad">{pads}</div>

        <footer>
          <nav
            id="footer"
            className="navbar navbar-expand-lg navbar-dark fixed-bottom text-center"
          >
            <ul className="navbar-nav mx-auto">
              <li>
                <a className="nav-link" href="www.codepen.io/valeriegm">
                  By ValerieGM
                </a>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    </div>
    );
  }
}

export default App;
