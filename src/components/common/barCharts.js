//src/components/common/barCharts.js

import React, { Component } from 'react'
import {cvtNumToUserPref} from '../../utils/help_function'
import Chart from 'chart.js';
Chart.defaults.global.responsive = true;


class BarCharts extends Component {

    state = {
        ctx: ''
    }

    componentDidMount(){
				var ctx = document.getElementById("BarChart").getContext("2d");
        this.setState({
            ctx: new Chart(ctx, {
              type: "bar",
              data: this.props.chartData, 
              options: {
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem, data) {
                      var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
                      return datasetLabel + ' : ' + cvtNumToUserPref(tooltipItem.yLabel) + ' €';
                    }
                  }
                },
                legend: {
                  display: true,
                  labels: {
                      fontColor: '#303030'
                  }
              }
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
          <canvas id="BarChart"></canvas>
      </div>
    )
  }
}

export default BarCharts

