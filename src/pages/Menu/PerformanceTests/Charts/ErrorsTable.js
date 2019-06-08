import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';

const columns = [
  {
    title: 'Transaction',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Response Code',
    dataIndex: 'responseCode',
    key: 'responseCode',
  },
  {
    title: 'Response Message',
    dataIndex: 'responseMessage',
    key: 'responseMessage',
  },
  {
    title: 'Failure Message',
    dataIndex: 'failureMessage',
    key: 'failureMessage',
  },
];

@connect(({ reportData: { errors } }) => ({
  errors,
}))
class ErrorsTable extends PureComponent {
  render() {
    const { errors } = this.props;
    return <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={errors} />;
  }
}

ErrorsTable.propTypes = {};

export default ErrorsTable;
