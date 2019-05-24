import { Button, Tag } from 'antd';
import React from 'react';
import router from 'umi/router';

const columns = (dispatch) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Con. Status',
    dataIndex: 'configComplete',
    key: 'configComplete',
    render : (text) => (
      <React.Fragment>{ text ? <Tag color="green">Complete</Tag> : <Tag color="red">Incomplete</Tag>}</React.Fragment>
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
          icon="setting"
          onClick={() => {
            router.push(`/menu/performanceTests/${record.id}`);
          }}
        >
          View
        </Button>
        <Button
          type="danger"
          icon="delete"
          onClick={() => {
            dispatch({
              type: 'performanceTests/removePerformanceTest',
              payload: record.id,
            });
          }}
        >
          Remove
        </Button>
      </React.Fragment>
    ),
  },
];

export default columns;
