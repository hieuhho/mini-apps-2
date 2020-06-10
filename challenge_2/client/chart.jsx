import React from "react";
import { Line } from "react-chartjs-2";

const Chart = ( { time, cost} ) => {
  const data = {
    labels: time,
    datasets: [{
      label: 'BitCoin Prices in 2020',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'green',
      borderColor: 'darkgreen',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'darkgreen',
      pointBackGroundColor: 'white',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'green',
      pointHoverColor: 'darkgreen',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: cost
    }]
  };

  return (
    <div>
      <Line data={data} />
    </div>
)}

export default Chart;
