import React, { Component } from 'react';
import { ReactiveBase } from '@appbaseio/reactivesearch';
class App extends Component {
  render() {
    return (
      <ReactiveBase
        app="good-books-ds"
        credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
      >
        Hello from Reactive Search!
      </ReactiveBase>
    );
  }
}
export default App;