import React, { PureComponent } from 'react';
import moment from 'moment';
import { Spin } from 'antd';

class ElapsedTime extends PureComponent {
  state = { elapsedTime: 0 };

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    const { endTime, startTime } = this.props;
    const currTime = new Date().getTime();
    this.setState({
      elapsedTime: moment
        .utc(moment(endTime || currTime).diff(moment(startTime || currTime)))
        .format('H:mm:ss'),
    });
    if (endTime) {
      clearInterval(this.interval);
    }
  };

  render() {
    const { elapsedTime } = this.state;
    const { className } = this.props;

    return (
      <span className={className}>
        <Spin spinning={!elapsedTime}>
         {elapsedTime}
        </Spin>
      </span>
    );
  }
}

export default ElapsedTime;
