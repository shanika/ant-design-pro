import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Chart from 'react-apexcharts';
import { Spin } from 'antd';
import chartsDots from '../../../../assets/chart_more.png';

const options = {
  title: {
    text: 'Response Times',
  },

  chart: {
    toolbar: {
      show: true,
      tools: {
        download: `<img class="response-more-icon" src=${chartsDots} alt="logo" />`,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
    type: 'line',
    stacked: false,
    background: 'rgba(0, 143, 251, 0.04)',
  },

  xaxis: {
    type: 'datetime',
    labels: {
      formatter: (val, timestamp) => moment(timestamp).format('HH:mm:ss'),
    },
    tooltip: {
      enabled: true,
    },
    tickPlacement: 'on',
  },

  stroke: {
    curve: 'smooth',
    width: 4,
  },

  tooltip: {
    shared: true,
    intersect: false,
    x: {
      format: 'yyyy/MM/dd hh:mm:ss',
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: 'top',
  },
};

@connect(({ reportData: { metricCharts: { responseTimes } } }) => ({
  responseTimes,
}))
class SampleDataChart extends PureComponent {
  render() {
    const { responseTimes, spinning } = this.props;
    return (
      <Spin spinning={spinning}>
        <Chart options={options} type="line" series={responseTimes} width="100%" height={320} />
      </Spin>
    );
  }
}

SampleDataChart.propTypes = {};

export default SampleDataChart;
