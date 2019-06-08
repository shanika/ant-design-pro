import React, { PureComponent } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { connect } from 'dva';
import { Spin } from 'antd';
import chartsDots from '../../../../assets/chart_more.png';

const options = {
  title: {
    text: 'Response Time',
  },

  chart: {
    toolbar: {
      show: true,
      tools: {
        download: `<img src=${chartsDots} alt="logo" />`,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
      },
    },
    type: 'line',
    stacked: false,
    background: 'rgba(55, 193, 107, 0.04)',
  },

  xaxis: {
    type: 'datetime',
    labels: {
      formatter: (val, timestamp) => moment(timestamp * 1000).format('HH:mm:ss'),
    },
    tooltip: {
      enabled: true,
    },
    tickPlacement: 'on',
    crosshairs: {
      show: false,
    },
  },

  yaxis: [
    {
      seriesName: 'Users',
      forceNiceScale: true,
      axisTicks: {
        show: true,
        color: '#008FFB',
      },
      axisBorder: {
        show: true,
        color: '#008FFB',
      },
    },
    {
      seriesName: 'Response Time',
      forceNiceScale: true,
      opposite: true,
      axisTicks: {
        show: true,
        color: '#00dd91',
      },
      axisBorder: {
        show: true,
        color: '#00dd91',
      },
    },
  ],
  stroke: {
    curve: 'smooth',
  },
  fill: {
    type: ['gradient', 'solid', 'solid'],
    gradient: {
      type: 'vertical',
      shadeIntensity: 0,
      opacityFrom: 0.7,
      opacityTo: 0.0,
      stops: [0, 30, 100],
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    x: {
      format: 'yyyy/MM/dd hh:mm:ss',
    },
    y: [
      { formatter: value => value },
      {
        formatter: value => `${value} ms`,
        title: {
          formatter: () => 'Avg Response Time',
        },
      },
    ],
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: 'top',
  },
};

@connect(({ reportData: { metricCharts: { users, responseTime } } }) => ({
  users,
  responseTime,
}))
class ResponseTimeChart extends PureComponent {
  render() {
    const { users, responseTime, spinning } = this.props;
    const series = [
      {
        name: 'Users',
        data: users,
        type: 'area',
      },
      {
        name: 'Response Time',
        data: responseTime,
        type: 'line',
      },
    ];

    return (
      <Spin spinning={spinning}>
        <Chart options={options} type="line" series={series} width="100%" height={320} />
      </Spin>
    );
  }
}

ResponseTimeChart.propTypes = {};

export default ResponseTimeChart;
