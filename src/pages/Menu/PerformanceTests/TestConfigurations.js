import React, { PureComponent } from 'react';
import { Button, Drawer, Form, Icon, InputNumber, message, Modal, Select, Spin } from 'antd';
import { connect } from 'dva';
import { getAuthHeader } from '../../../utils/request';
import FileUpload from '../CloudAccounts/FileUpload';

const { confirm } = Modal;

@connect(({ performanceTests : { performanceTest, showConfig }, metaData : {locations, vmTypes, cloudAccounts }, loading}) => ({
  performanceTest,
  showConfig,
  cloudAccounts,
  locations,
  vmTypes,
  saving : loading.effects['performanceTests/update'],
}))
@Form.create()
class Configure extends PureComponent {

  state = {
    uploading : false
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type : 'metaData/fetchCloudAccounts'
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type : 'metaData/clearCloudAccounts'
    });
  }

  cancel = () => {
    const {
      form: { isFieldsTouched },
      dispatch,
    } = this.props;
    if (isFieldsTouched(['cloudAccountId', 'locationId', 'machineTypeId', 'engines'])) {
      confirm({
        title: 'Unsaved Changes',
        content:
          'There are unsaved configuration changes. Do you want to save before closing configurations pane?',
        onOk: () => {
          this.save();
        },
        onCancel: () => {
          dispatch({
            type : 'performanceTests/setShowConfig',
            payload: false
          });
        },
        okText: 'Save',
        cancelText: 'Discard',
      });
    } else {
      dispatch({
        type : 'performanceTests/setShowConfig',
        payload: false
      });
    }
  };

  onFileUploadChange = (info) => {
    const {dispatch} = this.props;
    const {status, response} = info.file;

    if (status === 'done') {
      dispatch({
        type : 'performanceTests/setOne',
        payload : response
      });
      this.setState({ uploading : false});
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.setState({ uploading : false});
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  save = () => {
    const {
      form: { validateFields },
      dispatch,
      performanceTest
    } = this.props;
    validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type : 'performanceTests/update',
          payload : {
            id : performanceTest.id,
            values
          }
        })
      }
    });
  };

  render() {

    const {
      performanceTest,
      form: { getFieldDecorator },
      cloudAccounts,
      locations,
      vmTypes,
      saving,
      showConfig
    } = this.props;

    const scriptFile = performanceTest.scriptFile && performanceTest.scriptFile.name;
    const cloudAccountId = performanceTest.cloudAccount? performanceTest.cloudAccount.id : undefined;
    const locationId = performanceTest.location? performanceTest.location.key : undefined;
    const vmTypeId = performanceTest.vmType? performanceTest.vmType.key : undefined;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 16 },
      },
    };

    const { uploading } = this.state;

    return (
      <Drawer
        title={
          <span>
            <b>Configure Test - </b>
            <b style={{ color: '#36CFC9' }}>{performanceTest.name}</b>
          </span>
        }
        placement="right"
        onClose={this.cancel}
        visible={showConfig}
        width={535}
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px',
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
        }}
        destroyOnClose
      >

        <Spin spinning={uploading} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
          <FileUpload
            title="Upload JMeter Script File (.jmx)"
            name="file"
            multiple={false}
            accept=".jmx"
            action={`/api/workspaces/1/tests/${performanceTest.id}/uploadScript`}
            onChange={this.onFileUploadChange}
            headers={getAuthHeader()}
            showUploadList={false}
            beforeUpload={() => this.setState({ uploading : true })}
            fileName={scriptFile}
          />
        </Spin>

        <div style={{ fontSize: 16, color: '#7a8187', marginBottom: '14px' }}>
          Environment Configurations
        </div>

        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="Cloud Account" {...formItemLayout}>
            {getFieldDecorator('cloudAccountId', {
              rules: [
                {
                  required: true,
                  message: 'Please select a cloud account!',
                },
              ],
              initialValue: cloudAccountId,
            })(
              <Select placeholder="Please select a country">
                { cloudAccounts && cloudAccounts.map( a => (
                  <Select.Option key={`kay_${a.id}`} value={a.id}>
                    {a.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Location" {...formItemLayout}>
            {getFieldDecorator('locationId', {
              rules: [
                {
                  required: true,
                  message: 'Please select Location',
                },
              ],
              initialValue: locationId,
            })(
              <Select placeholder="Select Location">
                {locations &&
                  Object.keys(locations).map(lg => (
                    <Select.OptGroup key={lg} label={lg}>
                      {locations[lg].map(zone => (
                        <Select.Option key={zone.key} value={zone.key}>
                          {zone.value}
                        </Select.Option>
                      ))}
                    </Select.OptGroup>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Machine Type" {...formItemLayout}>
            {getFieldDecorator('vmTypeId', {
              rules: [
                {
                  required: true,
                  message: 'Please select Machine type',
                },
              ],
              initialValue: vmTypeId,
            })(
              <Select placeholder="Select Machine Type">
                {vmTypes &&
                  Object.keys(vmTypes).map(g => (
                    <Select.OptGroup key={g} label={g}>
                      {vmTypes[g].map(vmType => (
                        <Select.Option key={vmType.key} value={vmType.key}>
                          {vmType.value}
                        </Select.Option>
                        ))}
                    </Select.OptGroup>
                    ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Engines" {...formItemLayout}>
            {getFieldDecorator('nodes', {
              rules: [
                {
                  required: true,
                  message: 'Please input number of engines',
                },
              ],
              initialValue: performanceTest.nodes,
            })(<InputNumber min={1} max={100} />)}
          </Form.Item>
        </Form>

        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '21px 31px',
            background: '#fff',
            textAlign: 'right',
          }}
        >
          <Button onClick={this.cancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button loading={saving} onClick={this.save} type="primary">
            Save
          </Button>
        </div>
      </Drawer>
    );
  }
}

export default Configure;
