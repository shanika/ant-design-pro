import React, { PureComponent } from 'react';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { Button } from 'antd';
import Configure from './TestConfigurations';

@connect(({ performanceTests : { performanceTest }, loading}) => ({
  performanceTest,
  loading : loading.effects['performanceTests/fetchOne'],
}))
class PerformanceTest extends PureComponent {

  componentWillMount() {
    const {dispatch, match : {params  : {id}}} = this.props;
    dispatch({
      type : 'performanceTests/fetchOne',
      payload : id
    });
    dispatch({
      type : 'performanceTests/setShowConfig',
      payload: false
    });
  }

  extra = () => {
    const { dispatch, performanceTest} = this.props;
    return (
      <div>
        <Button
          icon="setting"
          onClick={() => {
            dispatch({
              type : 'performanceTests/setShowConfig',
              payload: true
            });
          }}
        >
          Configure
        </Button>
        {
          performanceTest && performanceTest.configComplete &&
          <Button
            type="primary"
            icon="caret-right"
          >
            Run
          </Button>
        }
      </div>
    );
  };

  render() {

    const {performanceTest} = this.props;
    return (
      <PageHeaderWrapper
        onBack={() => router.push("/menu/performanceTests")}
        hiddenBreadcrumb
        title={performanceTest && performanceTest.name}
        extra={this.extra()}
      >
        <Configure />
        <div>
          Performance Test page
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default PerformanceTest;
