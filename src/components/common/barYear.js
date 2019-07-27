//src/components/common/barCharts.js

import React, { Component } from 'react'
import {cvtNumToUserPref} from '../../utils/help_function'
import Chart from 'chart.js';
Chart.defaults.global.responsive = true;


class BarYear extends Component {

    state = {
        ctx: ''
    }

    componentDidMount(){
        var ctx = document.getElementById(this.props.id).getContext("2d");
        var currency  = this.props.currency
        this.setState({
            ctx: new Chart(ctx, {
              type: "horizontalBar",
              data: this.props.chartData,
              options: {
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem) {
                      return tooltipItem.yLabel + ' : ' + cvtNumToUserPref(tooltipItem.xLabel) + ' ' + currency ;
                    }
                  }
                },
                legend: {
                  display: false,
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
          <canvas id={this.props.id}></canvas>
      </div>
    )
  }
}

export default BarYear
