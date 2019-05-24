import React from 'react';
import { Input } from 'antd';

const AddPerformanceTest = (FormItem, formItemLayout, getFieldDecorator) => (
  <React.Fragment>
    <FormItem {...formItemLayout} label="Name">
      {getFieldDecorator('name', {
        rules: [{ required: true, message: 'Please input Performance Test name.' }],
      })(<Input placeholder="Test name" />)}
    </FormItem>
  </React.Fragment>
);

export default AddPerformanceTest;
