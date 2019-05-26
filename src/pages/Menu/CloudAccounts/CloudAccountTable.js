import { Button, Icon, Tag } from 'antd';
import React from 'react';
import router from 'umi/router';
import gcpLogo from '../../../assets/gcp_logo.svg';
import StatusBadge from '../../../components/StatusBadge';

const columns = (dispatch) => [
  {
    title: 'Provider',
    dataIndex: 'cloudType',
    key: 'cloudType',
    render : () => (
      <span><img style={{ width: 24, height: 24, margin: 8 }} src={gcpLogo} alt="gcp" /> <b>Google</b></span>
    )
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title : 'Con. Status',
    dataIndex : 'complete',
    key : 'complete',
    render : (text) => (
      <StatusBadge type={text? 'success' : 'danger'} text={text ? 'Complete' : 'Incomplete'} />
    )
  },
  {
    title: 'Actions',
    dataIndex: 'id',
    key: 'id',
    render: (text, record) => (
      <React.Fragment>
        <Button
          icon="edit"
          onClick={() => {
            router.push(`/menu/cloudAccounts/${record.id}`);
          }}
        >
          Configure
        </Button>
        <Icon
          style={{ marginLeft: 16 }}
          onClick={() => {
            dispatch({
              type: 'cloudAccounts/removeAccount',
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
