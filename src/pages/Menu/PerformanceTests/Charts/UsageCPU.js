import React, { PureComponent } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { connect } from 'dva';
import { Spin } from 'antd';
import chartsDots from '../../../../assets/chart_more.png';

const options = {
  title: {
    text: 'CPU Usage',
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

@connect(({ reportData: { usageCharts: { cpu } } }) => ({
  cpu,
}))
class UsageCPU extends PureComponent {
  render() {
    const { cpu, spinning } = this.props;

    return (
      <Spin spinning={spinning}>
        <Chart options={options} type="line" series={cpu} width="100%" height={320} />
      </Spin>
    );
  }
}

UsageCPU.propTypes = {};

export default UsageCPU;
