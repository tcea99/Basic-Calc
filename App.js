import React, { Component } from 'react';
import CalculatorComponent from './CalculatorComponent'

class App extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div className="App">
          <CalculatorComponent />
      </div>
    );
  }
}

export default App;
