import React, { Component } from 'react'
import Chart from 'chart.js';
Chart.defaults.global.responsive = true;



class Charts extends Component {

    state = {
        ctx: ''
    }

    componentDidMount(){
        var ctx = document.getElementById("myChart").getContext("2d");
        this.setState({
            ctx: new Chart(ctx).Line(this.props.chartData)
        })
    }

  render() {


    return (
      <div>
          <canvas id="myChart"></canvas>
      </div>
    )
  }
}


export default Charts;