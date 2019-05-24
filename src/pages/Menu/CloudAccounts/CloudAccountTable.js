import { Button } from 'antd';
import React from 'react';
import router from 'umi/router';

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
      <React.Fragment>
        <Button
          icon="setting"
          onClick={() => {
            router.push(`/menu/cloudAccounts/${record.id}`);
          }}
        >
          Configure
        </Button>
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
      </React.Fragment>
    ),
  },
];

export default columns;
