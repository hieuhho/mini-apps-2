import React, { Component } from "react";
import Chart from './chart';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    }
    this.getCoin = this.getCoin.bind(this);
  }

  componentDidMount() {
    this.getCoin();
  }

  getCoin() {
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start=2020-01-01&end=2020-06-10')
      .then((response) => response.json())
      .then((data) => {
        const { bpi } = data;
        console.log('bpi: ', bpi);
        this.setState({
          time: Object.keys(bpi),
          cost: Object.values(bpi),
        })
      })
      .catch((err) => this.setState({ error: err }))
  };

  render() {
    const { time, cost } = this.state;
    return (
      <div>
        <div>
          <Chart time={time} cost={cost} />
        </div>
      </div>
    )
  }
}

export default App;
