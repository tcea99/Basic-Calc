import React, { Component } from 'react'

import "./CalculatorComponent.css";
import CalculatorButtonComponent from './CalculatorButtonComponent'

class CalculatorComponent extends Component {

  constructor (props) {
  super(props);
  this.state = {
       displayValue: '', //this is a string
       value: null,   //number that we first entered & saved before operator was pressed, not a string
       waitingForOperator: false, //a pending state
       operator: null };  //operand is remembered in state b4 next button is pressed, a pending state
}

handleClearClick () {
  this.setState({
    displayValue: ''
  })
}

handleNumberClick(value) {
  const { displayValue, waitingForOperator } = this.state

  if (waitingForOperator) {  //we need to save off the old value
    this.setState({
      displayValue: String(value),    //we need to change the value of displayValue with the new string value
      waitingForOperator: false        //operator is still false, its still waiting
  })
} else
    this.setState({ displayValue: this.state.displayValue += value });
  }

handleOperatorClick(nextOperator) {
  const { displayValue, operator, value } = this.state  // we are grabbing these out of state
  const nextValue = parseFloat(displayValue)  // we grab the displayValue, parseFloat it to get the nextValue & save it off
                                              // this is currently our value IF there was an operator/previous value

  const operations = {  // here are a bunch of operation functions
    '/': (prevValue, nextValue) => prevValue / nextValue, // if its '/' & we have a prev & next value, we return both
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue   // if its '=' & we have a prev & next value, we return just nextValue
   }

  if (value == null) {  // if we did not have a previous value(ie. null) & then hit operator key
    this.setState({        // then save off that value otherwise....
      value: nextValue // we update our value with nextValue (ie. maybe there's some numbers in display & we'll save
  })                    // it off as our value
} else if (operator) {  // otherwise.... we have an operator from a previous computation
  const defaultValue = value || 0  // we'll have a default value
  const newComputedValue = operations[operator](defaultValue, nextValue) //we'll use that default value in our operations

  this.setState({
    value: newComputedValue,
    displayValue: String(newComputedValue)
  })
}

  this.setState({
    waitingForOperator: true,  // operator is true & has been pressed
    operator: nextOperator
  })
}

render() {
  return (
    <div className="container">
     <div className="col-sm">
      <div className="row">
        <div className="col-sm main-display">{this.state.displayValue}</div>
      </div>
      <div className="row">
        <div className="col-sm-9 number-button" onClick={() =>{this.handleClearClick('clear')}}>Clear</div>
        <div className="col-sm-3 operator-button" onClick={() =>{this.handleOperatorClick('/')}}>&divide;</div>
      </div>
      <div className="row">
             <div className="col-sm number-button" onClick={() =>{this.handleNumberClick('7')}}>7</div>
             <div className="col-sm number-button" onClick={() =>{this.handleNumberClick('8')}}>8</div>
             <div className="col-sm number-button" onClick={() =>{this.handleNumberClick('9')}}>9</div>
             <div className="col-sm operator-button" onClick={() =>{this.handleOperatorClick('-')}}>-</div>
      </div>
      <div className="row">
             <div className="col-sm number-button" onClick={() =>{this.handleNumberClick('4')}}>4</div>
             <div className="col-sm number-button" onClick={() =>{this.handleNumberClick('5')}}>5</div>
             <div className="col-sm number-button" onClick={() =>{this.handleNumberClick('6')}}>6</div>
           <div className="col-sm operator-button" onClick={() =>{this.handleOperatorClick('+')}}>+</div>
      </div>
      <div className="row">
             <div className="col-sm number-button" onClick={() =>{this.handleNumberClick('1')}}>1</div>
             <div className="col-sm number-button" onClick={() =>{this.handleNumberClick('2')}}>2</div>
             <div className="col-sm number-button" onClick={() =>{this.handleNumberClick('3')}}>3</div>
             <div className="col-sm operator-button" onClick={() =>{this.handleOperatorClick('=')}}>=</div>
      </div>
     </div>
    </div>

    );
  }
}

export default CalculatorComponent;
