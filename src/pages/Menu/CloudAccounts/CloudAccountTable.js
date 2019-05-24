import { Button } from 'antd';
import React from 'react';

const columns = (dispatch) => [
  {
    title: 'Cloud Type',
    dataIndex: 'cloudType',
    key: 'cloudType',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Actions',
    dataIndex: 'id',
    key: 'id',
    render: (text, record) => (
      <Button
        icon="delete"
        onClick={() => {
          dispatch({
            type: 'cloudAccounts/remove',
            payload: record.id,
          });
        }}
      >
        Remove
      </Button>
    ),
  },
];

export default columns;
