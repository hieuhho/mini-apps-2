import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      allData: null,
      offset: 0,
      limit: 10,
      currentPage: 0,
      currentData: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.loadPage = this.loadPage.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSearch(e) {
    e.preventDefault();
    const { search, limit } = this.state;
    fetch(`/events?q=${search}`)
    .then(res => res.json())
    .then(data => this.setState({
      allData: data,
      totalPages: Math.ceil(data.length / limit)
    }))
    .then(() => this.loadPage())
    .catch((err) => console.log('There was an error: ', err))
  };

  loadPage() {
    const { allData, offset, limit } = this.state;
    let current = allData.slice(offset, offset + limit).map((event, i) =>
  (<div key={i}>
      <div>date: {event.date}</div>
      <div>description: {event.description}</div>
      <div>lang: {event.lang}</div>
      <div>category1: {event.category1}</div>
      <div>category2: {event.category2}</div>
      <div>granularity: {event.granularity}</div>
      <br/>
    </div>));
    this.setState({
      currentData: current
    });
  };

  handlePageChange(e) {
    const { limit} = this.state;
    let selected = e.selected;
    let newOffset = Math.ceil(selected * limit);

    this.setState ({
      offset: newOffset,
    });
    this.loadPage();
  }

  render() {
    const { currentData, totalPages } = this.state;
    return (
      <div>
        <div>
          <input type="text" id="search" onChange={this.handleChange} placeholder="search..."/>
          <button type="button" onClick={this.handleSearch}>Search</button>
        </div>

        {currentData.length !== 0 && (
          <div>{currentData}</div>
        )}

        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageChange}
          />

      </div>
    )
  }
}

export default App;
