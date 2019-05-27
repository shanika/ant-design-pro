import React from 'react';
import { Input } from 'antd';

const AddWorkspace = (FormItem, formItemLayout, getFieldDecorator) => (
  <React.Fragment>
    <FormItem {...formItemLayout} label="Name">
      {getFieldDecorator('name', {
        rules: [{ required: true, message: 'Please new Workspace name.' }],
      })(<Input placeholder="Workspace name" />)}
    </FormItem>
  </React.Fragment>
);

export default AddWorkspace;
