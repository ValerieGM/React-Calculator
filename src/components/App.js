import React, { Component } from 'react';

class KeyPad extends Component {
  render() {
    const btnArr = [
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

    const btnMap = btnArr.map((obj, v) => {
      return (
        <button
          id={obj.id}
          key={[v]}
          className="keypad"
          value={obj.val}
          onClick={this.props.onClick}
        >
          {obj.val}
        </button>
      );
    });

    return <div>{btnMap}</div>;
  }
}

const Equation = (props) => {
  return (
    <div id="equation" className="equation">
      {props.equation}
    </div>
  );
};

const Display = (props) => {
  if (props.input === "") {
    return (
      <div id="display" className="display">
        0
      </div>
    );
  } else {
    return (
      <div id="display" className="display">
        {props.input}
      </div>
    );
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      equation: "",
      previous: "",
      input: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClear() {
    this.setState({
      equation: "",
      previous: "",
      input: ""
    });
  }

  handleInput(event) {
    const equation = this.state.equation,
      previous = this.state.previous,
      input = this.state.input,
      value = event.target.value;
    const operator = /[/*\-+]/,
      endOperator = /[/*\-+]$/,
      negativeEndOperator = /[/*+]\-$/,
      zero = /([^.0-9]0|0)$/;

    switch (value) {
      case "AC":
        this.handleClear();
        break;
      case "DEL":
        this.setState({
          input: "0",
          equation: equation.slice(0, -1)
        });
        break;
      case ".":
        if (!input.includes(".")) {
          this.setState({
            input: input === "0" || operator.test(input) ? "." : input + ".",
            equation:
              input === "0" || operator.test(input)
                ? equation + "."
                : input + "."
          });
        }
        break;
      case "=":
        let form = equation;
        while (endOperator.test(form)) {
          form = form.slice(0, -1);
        }
        let result = Math.round(10000000000 * eval(form)) / 10000000000;
        this.setState({
          equation: form + "=" + result,
          input: result,
          previous: result
        });
        break;
      case "/":
      case "*":
      case "+":
        if (equation.includes("=")) {
          this.setState({
            equation: previous + value,
            input: value
          });
        } else if (!endOperator.test(equation)) {
          this.setState({
            equation: equation + value,
            input: value
          });
        } else {
          this.setState({
            equation: negativeEndOperator.test(equation)
              ? equation.slice(0, -2) + value
              : equation.slice(0, -1) + value,
            input: value
          });
        }
        break;
      case "-":
        if (equation.includes("=")) {
          this.setState({
            equation: previous + value,
            input: value
          });
        } else if (!negativeEndOperator.test(equation)) {
          this.setState({
            equation:
              (negativeEndOperator.test(equation + value)
                ? equation
                : endOperator.test(equation)
                ? equation.slice(0, -1)
                : equation) + value,
            input: value
          });
        }
        break;
      case "0":
        if (input.length < 16 && !input.includes("Max")) {
          if (input !== "0") {
            if (endOperator.test(input)) {
              this.setState({
                input: value,
                equation: equation + value
              });
            } else {
              this.setState({
                input: input + value,
                equation: equation + value
              });
            }
          }
        } else {
          this.setState({
            previous: input,
            input: "Maximum Numbers"
          });
          setTimeout(() => this.setState({ input: this.state.previous }), 1000);
        }
        break;
      default:
        if (input.length < 16 && !input.includes("Max")) {
          if (input === "0" || operator.test(input)) {
            this.setState({
              input: input + value,
              equation: zero.test(equation)
                ? equation.slice(0, -1) + value
                : equation + value
            });
          } else {
            this.setState({
              input: input + value,
              equation: equation + value
            });
          }
        } else {
          this.setState({
            previous: input,
            input: "Maximum Numbers"
          });
          setTimeout(() => this.setState({ input: this.state.previous }), 1000);
        }
    }
  }

  render() {
    return (
      <div className="calculator">
        <div className="main">
          <h1>JS Calculator</h1>

          <div className="col-11 mx-auto my-2">
            <Equation equation={this.state.equation} />
            <Display input={this.state.input} />
          </div>

          <div id="keypad">
            <KeyPad onClick={this.handleInput} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
