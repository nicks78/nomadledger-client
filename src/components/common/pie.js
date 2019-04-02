//src/components/common/barCharts.js

import React, { Component } from 'react'
import {cvtNumToUserPref} from '../../utils/help_function'
import Chart from 'chart.js';
import Chip from '@material-ui/core/Chip';

Chart.defaults.global.responsive = true;

class PieCharts extends Component {

    state = {
        ctx: ''
    }

    componentDidMount(){
        var ctx = document.getElementById("PieChart").getContext("2d");
        var that = this
        this.setState({
            ctx: new Chart(ctx, {
              type: "pie",
              data: this.props.chartData, 
              options: {
                // title: {
                //     display: true,
                //     fontsize: 14,
                //     text: 'Total de Pedidos por Situação'
                // },
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem, data) {
                        var label = that.props.locale.wording[data.labels[tooltipItem.index]]
                      return  cvtNumToUserPref(data.datasets[0].data[tooltipItem.index]) + ' %';
                    }
                  }
                },
                // legend: {
                //     labels: {
                //         generateLabels: function(chart) {
                //             console.log(chart)
                //              return {
                //                 // Instead of `text: label,`
                //                 // We add the value to the string
                //                 text: "popppp",
                //                 fillStyle: "red",
                //                 // strokeStyle: stroke,
                //                 // lineWidth: bw,
                //                 // hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                //                 // index: i
                //             }
                //         }
                //     }
                // }
              }
            })
        })
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

