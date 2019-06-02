import React, { PureComponent } from 'react';
import { connect } from 'dva';

@connect(()=>({}))
class PerformanceTests extends PureComponent {

  state = {
    timer : null
  };

  componentWillMount = () => {
    const { dispatch} = this.props;
    dispatch({
      type: 'performanceTests/fetchAll'
    });
    dispatch({
      type : 'metaData/fetchLocations'
    });
    dispatch({
      type : 'metaData/fetchVmTypes'
    });
    const timer = setInterval(this.fetchStatus, 10000);
    this.setState({timer} );
  };

  componentWillUnmount = () => {
    const { dispatch} = this.props;
    const { timer } = this.state;
    clearInterval(timer);
    dispatch({
      type: 'performanceTests/clear'
    });
  };

  fetchStatus = () => {
    const { dispatch } = this.props;
    dispatch({
      type : 'performanceTests/updateStatus'
    });
  };

  render() {
    const {children} = this.props;
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }
}

export default PerformanceTests;
