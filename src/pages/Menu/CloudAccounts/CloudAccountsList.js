import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { Button, Table } from 'antd';
import columns from './CloudAccountTable';
import showModalForm, { updateModalProgress } from '../../../components/ModalForm/ModalForm';
import AddCloudAccount from './AddCloudAccount';

@connect(({ cloudAccounts : { list }, loading}) => ({
  list,
  loading : loading.effects['cloudAccounts/fetchAll'],
  adding : loading.effects['cloudAccounts/add'],
}))
class CloudAccountsList extends PureComponent {

  extra = (
    <div>
      <Button
        icon="plus"
        type="primary"
        onClick={() => {
          this.addAccount = showModalForm({
            content: AddCloudAccount,
            title: 'Add New',
            okText: 'Add',
            onOk: values => {
              const { dispatch } = this.props;
              dispatch({
                type: 'cloudAccounts/add',
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

  componentDidUpdate(prevProps) {
    updateModalProgress(prevProps, this.props, 'adding', this.addAccount);
  }

  componentWillUnmount() {
    if (this.addAccount) {
      this.addAccount.destroy();
    }
  }

  render() {

    const {list, loading, dispatch} = this.props;

    return (
      <PageHeaderWrapper
        hiddenBreadcrumb
        title="Cloud Accounts"
        extra={this.extra}
      >
        <Table loading={loading} rowKey="id" dataSource={list} columns={columns(dispatch)} />
      </PageHeaderWrapper>
    );
  }
}

export default CloudAccountsList;
