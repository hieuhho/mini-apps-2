import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Data from './data';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      fetchedData: null,
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
    const { search, limit,currentPage } = this.state;
    let totalCount;
    fetch(`/events?q=${search}&_page=${currentPage + 1}&_limit=${limit}`)
    .then((res) => {
      totalCount = res.headers.get('X-Total-Count')
      return res.json()
    })
    .then(data => this.setState({
      fetchedData: data,
      totalPages: Math.ceil(totalCount / limit)
    }))
    .then(() => this.loadPage())
    .catch((err) => console.log('There was an error: ', err))
  };

  loadPage() {
    const { fetchedData, offset, limit } = this.state;
    let current = fetchedData.map((event, i) =>
  (<div key={i}>
      <div>date: {event.date}</div>
      <div>description: {event.description}</div>
      <div>lang: {event.lang}</div>
      <div>category1: {event.category1}</div>
      <div>category2: {event.category2}</div>
      <div>granularity: {event.granularity}</div>
      <br/>
    </div>));
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
      currentData: current,
    }));
  };

  handlePageChange(e) {
    const { limit } = this.state;
    let selected = e.selected;
    let newOffset = Math.ceil(selected * limit);
    this.setState ({
      offset: newOffset,
      currentPage: selected,
    });
    this.handleSearch();
  }

  render() {
    const { currentData, totalPages } = this.state;
    return (
      <div>
        <div>
          <h1>Historical Events Finder</h1>
        </div>

          <form onSubmit={this.handleSearch}>
            <input type="text" id="search" onChange={this.handleChange} placeholder="search..."/>
            <button type="submit">Search</button>
          </form>

        <Data data={currentData} />

        {currentData.length !== 0 && (
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageChange}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
          )}

      </div>
    )
  }
}

export default App;
