import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      data: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSearch(e) {
    e.preventDefault();
    const { text } = this.state;
    fetch(`/events?q=${text}`)
    .then(res => res.json())
    .then(data => this.setState({data: data}))
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <div>
          <input type="text" id="search" onChange={this.handleChange} placeholder="search..."/>
          <button type="button" onClick={this.handleSearch}>Search</button>
        </div>

        {data && (
          <div>{data}</div>
        )}

      </div>
    )
  }
}

export default App;
