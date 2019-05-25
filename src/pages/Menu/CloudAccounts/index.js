import React, { PureComponent } from 'react';
import { connect } from 'dva';

@connect(()=>({}))
class CloudAccounts extends PureComponent {

  componentWillMount(){
    const { dispatch} = this.props;
    dispatch({
      type: 'cloudAccounts/fetchAll'
    });
  }

  componentWillUnmount() {
    const { dispatch} = this.props;
    dispatch({
      type: 'cloudAccounts/clear'
    });
  }

  render() {
    const {children} = this.props;
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }
}

export default CloudAccounts;
