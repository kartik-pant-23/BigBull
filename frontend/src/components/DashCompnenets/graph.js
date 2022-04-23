import React from 'react'
import * as ReactDOM from 'react-dom'
import ReactApexCharts from 'react-apexcharts'

const ApexChart = ({ data }) => {
  let options = {
    chart: {
      type: 'candlestick',
      height: 450,
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      tickAmount: 15,
    },
  }
  return (
    <div id='chart'>
      <ReactApexCharts
        options={options}
        series={[{ data: data }]}
        type='candlestick'
        height={450}
      />
    </div>
  )
}

export default ApexChart

const domContainer = document.getElementById('root')
ReactDOM.render(React.createElement(ApexChart), domContainer)
