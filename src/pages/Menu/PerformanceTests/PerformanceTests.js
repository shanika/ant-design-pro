import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { Button, Table } from 'antd';
import columns from './PerformanceTestsTable';
import showModalForm, { updateModalProgress } from '../../../components/ModalForm/ModalForm';
import AddPerformanceTest from './AddPerformanceTest';

@connect(({ performanceTests : { list }, loading}) => ({
  list,
  loading : loading.effects['performanceTests/fetchAll'],
  adding : loading.effects['performanceTests/add'],
}))
class PerformanceTests extends PureComponent {

  extra = (
    <div>
      <Button
        icon="plus"
        type="primary"
        onClick={() => {
          this.addPerformanceTest = showModalForm({
            content: AddPerformanceTest,
            title: 'Add New',
            okText: 'Add',
            onOk: values => {
              const { dispatch } = this.props;
              dispatch({
                type: 'performanceTests/add',
                payload: values
              })
            },
          });
        }}
      >
        Add New
      </Button>
    </div>
  );

  componentWillMount(){
    const { dispatch} = this.props;
    dispatch({
      type: 'performanceTests/fetchAll'
    });
  }

  componentDidUpdate(prevProps) {
    updateModalProgress(prevProps, this.props, 'adding', this.addPerformanceTest);
  }

  componentWillUnmount() {
    if (this.addPerformanceTest) {
      this.addPerformanceTest.destroy();
    }
  }

  render() {

    const {list, loading, dispatch} = this.props;

    return (
      <PageHeaderWrapper
        extra={this.extra}
        hiddenBreadcrumb
        title="Performance Tests"
      >
        <Table loading={loading} rowKey="id" dataSource={list} columns={columns(dispatch)} />
      </PageHeaderWrapper>
    );
  }
}


export default PerformanceTests;
