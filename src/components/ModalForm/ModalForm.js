import React, { PureComponent } from 'react';
import { Form, Modal } from 'antd';
import * as ReactDOM from 'react-dom';
import styles from './ModalForm.less';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

@Form.create()
class ModalForm extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const {
      onOk,
      form: { validateFields },
    } = this.props;
    if (onOk) {
      validateFields((err, values) => {
        if (!err) {
          onOk(values);
        }
      });
    }
  };

  render() {
    const {
      visible,
      form,
      close,
      content,
      title = 'Dummy title',
      okText = 'Ok',
      loading,
      data,
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        confirmLoading={loading}
        className={styles.modalForm}
        okText={okText}
        onOk={this.handleSubmit}
        title={title}
        onCancel={close}
        visible={visible}
      >
        <Form onSubmit={this.handleSubmit}>
          {content(FormItem, formItemLayout, getFieldDecorator, data)}
        </Form>
      </Modal>
    );
  }
}

export default function showModalForm(config) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  // eslint-disable-next-line no-use-before-define
  let currentConfig = { ...config, close, visible: true };

  function render(props) {
    ReactDOM.render(<ModalForm {...props} />, div);
  }

  function close() {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: () => {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
          div.parentNode.removeChild(div);
        }
      },
    };

    render(currentConfig);
  }

  function update(newConfig) {
    currentConfig = {
      ...currentConfig,
      ...newConfig,
    };
    render(currentConfig);
  }

  render(currentConfig);

  return {
    destroy: close,
    update,
  };
}

export function updateModalProgress(prevProps, newProps, propName, fn) {
  const preVal = prevProps[propName];
  const newVal = newProps[propName];

  if (fn) {
    if (preVal !== newVal) {
      if (newVal) {
        fn.update({ loading: newVal });
      } else {
        fn.destroy();
      }
    }
  }
}
