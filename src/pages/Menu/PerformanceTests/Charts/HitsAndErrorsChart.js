import React, { PureComponent } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { connect } from 'dva';
import { Spin } from 'antd';
import chartsDots from '../../../../assets/chart_more.png';

const showYAxisBorder = true;

const options = {
  title: {
    text: 'Generated Load vs Errors',
    style: {
      fontSize: '14px',
      color: '#000000',
    },
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
    background: 'rgba(245, 166, 35, 0.04)',
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
        show: showYAxisBorder,
        color: '#008FFB',
      },
    },
    {
      seriesName: 'Hits',
      forceNiceScale: true,
      opposite: true,
      axisTicks: {
        show: true,
        color: '#feb019',
      },
      axisBorder: {
        show: showYAxisBorder,
        color: '#feb019',
      },
    },
    {
      seriesName: 'ErrorP',
      forceNiceScale: true,
      labels: {
        formatter: value => `${Math.round(value)}%`,
      },
      opposite: true,
      axisTicks: {
        show: true,
        color: '#dd1902',
      },
      max: 100,
      axisBorder: {
        show: showYAxisBorder,
        color: '#dd1902',
      },
    },
  ],
  stroke: {
    curve: 'smooth',
  },
  colors: ['#008FFB', '#feb019', '#dd1902'],
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
      formatter: val => moment(val * 1000).format('MMM do HH:mm:ss'),
    },
    y: [
      { formatter: value => value },
      {
        formatter: value => `${value}`,
        title: {
          formatter: () => 'Hits/s',
        },
      },
      {
        formatter: value => `${value} %`,
        title: {
          formatter: () => 'Error %',
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
  noData: {
    text: 'Awaiting sample data',
  },
};

@connect(({ reportData: { metricCharts: { users, hits, errorPer } } }) => ({
  users,
  hits,
  errorPer,
}))
class HitsAndErrorsChart extends PureComponent {
  render() {
    const { users, hits, errorPer, spinning } = this.props;
    const series = [
      {
        name: 'Users',
        data: users,
        type: 'area',
      },
      {
        name: 'Hits/s',
        data: hits,
        type: 'line',
      },
      {
        name: 'ErrorP',
        data: errorPer,
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

HitsAndErrorsChart.propTypes = {};

export default HitsAndErrorsChart;
