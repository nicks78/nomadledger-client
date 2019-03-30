import React, { Component } from 'react'

import Chart from 'chart.js';
Chart.defaults.global.responsive = true;



class BarCharts extends Component {

    state = {
        ctx: ''
    }

    componentDidMount(){
				var ctx = document.getElementById("BarChart").getContext("2d");
				console.log("DATA", this.props.chartData)
        this.setState({
            ctx: new Chart(ctx).Bar(this.props.chartData)
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