import { Button, Icon } from 'antd';
import React from 'react';
import router from 'umi/router';
import StatusBadge from '../../../components/StatusBadge';

const columns = (dispatch) => [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Test Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Con. Status',
    dataIndex: 'configComplete',
    key: 'configComplete',
    render : (text) => (
      <StatusBadge type={text? 'success' : 'danger'} text={text ? 'Complete' : 'Incomplete'} />
    )
  },
  {
    title : 'Number of Executions',
    dataIndex : 'testCount',
    key : 'testCount',
  },
  {
    title: 'Actions',
    dataIndex: 'id',
    key: 'id',
    render: (text, record) => (
      <React.Fragment>
        <Button
          onClick={() => {
            router.push(`/menu/performanceTests/${record.id}`);
          }}
        >
          View
        </Button>

        <Icon
          style={{ marginLeft: 16 }}
          onClick={() => {
            dispatch({
              type: 'performanceTests/removePerformanceTest',
              payload: record.id,
            });
          }}
          twoToneColor="#eb2f96"
          type="delete"
          theme="twoTone"
        />
      </React.Fragment>
    ),
  },
];

export default columns;
