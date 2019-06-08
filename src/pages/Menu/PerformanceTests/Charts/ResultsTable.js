import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Table } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

const columns = [
  {
    title: 'Transaction',
    dataIndex: 'transaction',
    key: 'transaction',
    sorter: (a, b) =>
      a.transaction === 'kandula-all' ? 1 : a.transaction.localeCompare(b.transaction),
    sortDirections: ['ascend'],
    render: text => (text === 'kandula-all' ? 'All' : text),
  },
  {
    title: 'Samples',
    dataIndex: 'samples',
    key: 'samples',
  },
  {
    title: 'Avg',
    dataIndex: 'average',
    key: 'average',
  },
  {
    title: 'Median',
    dataIndex: 'median',
    key: 'median',
  },
  {
    title: 'P90',
    dataIndex: 'p90Line',
    key: 'p90Line',
  },
  {
    title: 'P95',
    dataIndex: 'p95Line',
    key: 'p95Line',
  },
  {
    title: 'P99',
    dataIndex: 'p99Line',
    key: 'p99Line',
  },
  {
    title: 'Min',
    dataIndex: 'min',
    key: 'min',
  },
  {
    title: 'MAx',
    dataIndex: 'max',
    key: 'max',
  },
  {
    title: 'Errors',
    dataIndex: 'errorPer',
    key: 'errorPer',
    render: text => `${text * 100} %`,
  },
];

@connect(({ reportData: { results }, loading }) => ({
  results,
  fetching: loading.effects['reportData/fetchResults'],
}))
class ResultsTable extends PureComponent {

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { dispatch, execution : { id, startTime, endTime} } = this.props;
    dispatch({
      type: 'reportData/fetchResults',
      payload: {
        executionId : id,
        startTime : startTime && moment(startTime).valueOf(),
        endTime : endTime && moment(endTime).valueOf()
      },
    });
  };

  render() {
    const { results, fetching } = this.props;
    return (
      <Card
        title="Results"
        style={{ marginBottom: 16 }}
        bodyStyle={{ padding: 0 }}
        extra={
          <Button size="small" loading={fetching} onClick={() => this.fetchData()}>
            Refresh
          </Button>
        }
      >
        <Table
          rowClassName={record =>
            record.transaction === 'kandula-all' ? 'results-total' : undefined
          }
          rowKey="transaction"
          columns={columns}
          dataSource={results}
        />
      </Card>
    );
  }
}

ResultsTable.propTypes = {
  organizationId: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  executionId: PropTypes.string.isRequired,
};

export default ResultsTable;
