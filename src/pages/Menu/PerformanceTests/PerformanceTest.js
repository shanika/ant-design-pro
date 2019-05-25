import React, { PureComponent } from 'react';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';

@connect(({ performanceTests : { performanceTest }, loading}) => ({
  performanceTest,
  loading : loading.effects['performanceTests/fetchOne'],
}))
class PerformanceTest extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        onBack={() => router.push("/menu/performanceTests")}
        hiddenBreadcrumb
        title="Performance Test"
      >
        <div>
          Performance Test page
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default PerformanceTest;
