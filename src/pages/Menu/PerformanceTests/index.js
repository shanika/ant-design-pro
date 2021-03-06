import React, { PureComponent } from 'react';
import { connect } from 'dva';

@connect(()=>({}))
class PerformanceTests extends PureComponent {


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
  };

  componentWillUnmount = () => {
    const { dispatch} = this.props;
    dispatch({
      type: 'performanceTests/clear'
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
