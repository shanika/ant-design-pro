import React, { PureComponent } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { connect } from 'dva';
import { Spin } from 'antd';
import chartsDots from '../../../../assets/chart_more.png';

const options = {
  title: {
    text: 'Memory Usage',
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

  yaxis: {
    max: 100,
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

@connect(({ reportData: { usageCharts: { memory } } }) => ({
  memory,
}))
class UsageMemory extends PureComponent {
  render() {
    const { memory, spinning } = this.props;

    return (
      <Spin spinning={spinning}>
        <Chart options={options} type="line" series={memory} width="100%" height={320} />
      </Spin>
    );
  }
}

UsageMemory.propTypes = {};

export default UsageMemory;
