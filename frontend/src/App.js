import React, { Component } from 'react';
import { ReactiveBase, ResultCard, DataSearch } from '@appbaseio/reactivesearch';
class App extends Component {
  render() {
    return (
      <ReactiveBase
        url="http://localhost:8000"
        app="app-store-data"
        credentials="foo:bar"
      >
        <DataSearch
          componentId="mainSearch"
          iconPosition="left"
        />
        <ResultCard
          componentId="results"
          dataField="original_title"
          react={{
            "and": ["mainSearch"]
          }}
          onData={(res) => ({
            "image": res["Icon URL"],
            "title": res.Name,
            "description": res["Description"],
            "rating": res["Average User Rating"] + " ★ "
          })}
        />
      </ReactiveBase>
    );
  }
}
export default App;