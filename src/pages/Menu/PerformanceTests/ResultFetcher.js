import { PureComponent } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import moment from 'moment';

@connect(({ reportData: { executionId } }) => ({
  executionId,
}))
class ResultFetcher extends PureComponent {
  componentWillMount() {
    this.fetchData();
    this.timer = setInterval(this.fetchData, 10 * 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  fetchData = () => {
    const {
      execution: { id, startTime, endTime },
      dispatch,
    } = this.props;

    dispatch({
      type: 'reportData/fetchMetric',
      payload: { executionId: id, startTime: moment(startTime).valueOf(), endTime : endTime && moment(endTime).valueOf() },
    });

    if (endTime) {
      clearInterval(this.timer);
    }
  };

  render() {
    return null;
  }
}

ResultFetcher.propTypes = {
  execution: PropTypes.object.isRequired,
};

export default ResultFetcher;
