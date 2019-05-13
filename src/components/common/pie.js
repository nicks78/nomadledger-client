//src/components/common/barCharts.js

import React, { Component } from 'react'
import {cvtNumToUserPref} from '../../utils/help_function'
import Chart from 'chart.js';

Chart.defaults.global.responsive = true;

class PieCharts extends Component {

    state = {
        ctx: ''
    }

    componentDidMount(){
        var ctx = document.getElementById("PieChart").getContext("2d");
        this.setState({
            ctx: new Chart(ctx, {
              type: "doughnut",
              data: this.props.chartData,
              options: {
                legend: {
                  position: "left"
                },
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem, data) {
                      return  cvtNumToUserPref(data.datasets[0].data[tooltipItem.index]) + ' %';
                    }
                  }
                },
              }
            })
        })
    }

    componentWillReceiveProps(nextProps){
      var ctx = this.state.ctx;
      if(ctx.chart){
        ctx.chart.config.data = nextProps.chartData
        ctx.update()
        this.setState({
          ctx: ctx
        })
      }

    }

  render() {

    return (
      <div  style={{ position: "relative" }}>
          <canvas id="PieChart"></canvas>
      </div>
    )
  }
}

export default PieCharts
