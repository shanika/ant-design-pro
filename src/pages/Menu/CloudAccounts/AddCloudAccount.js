import React from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

const AddCloudAccount = (FormItem, formItemLayout, getFieldDecorator) => (
  <React.Fragment>
    <FormItem {...formItemLayout} label="Provider">
      {getFieldDecorator('type', {
        rules: [{ required: true, message: 'Please select cloud provider.' }],
      })(
        <Select style={{ width: '100%' }} placeholder="Select cloud provider">
          <Option value="GCP">Google Cloud Platform</Option>
        </Select>
      )}
    </FormItem>
    <FormItem {...formItemLayout} label="Name">
      {getFieldDecorator('name', {
        rules: [{ required: true, message: 'Please input cloud account name.' }],
      })(<Input placeholder="Cloud account name" />)}
    </FormItem>
  </React.Fragment>
);

export default AddCloudAccount;
