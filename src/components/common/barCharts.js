import React, { Component } from 'react'

import Chart from 'chart.js';
Chart.defaults.global.responsive = true;

var chartData = {
	labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	datasets: [
		{
			label: "CA HT",
			fillColor: "green",
			data: [65, 59, 80, 81, 56, 55, 40, 23, 89, 38, 32,13],
		},
		{
			label: "EXPENSES",
			fillColor: "red",
			data: [28, 48, 40, 19, 86, 27, 90, 90,24, 65, 37, 66]
		}
	],
	options: {
		legend: {
				display: true,
				labels: {
						fontColor: 'rgb(255, 99, 132)'
				}
		}
	}
};
class BarCharts extends Component {

    state = {
        ctx: ''
    }

    componentDidMount(){
        var ctx = document.getElementById("BarChart").getContext("2d");
        this.setState({
            ctx: new Chart(ctx).Bar(chartData)
        })
    }

  render() {
    return (
      <div  style={{ position: "relative" }}>
          <canvas id="BarChart"></canvas>
      </div>
    )
  }
}

export default BarCharts