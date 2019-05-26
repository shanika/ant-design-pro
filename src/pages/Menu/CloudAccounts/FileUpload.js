import React, { PureComponent } from 'react';
import { Icon, Upload } from 'antd';

const {Dragger} = Upload;

class FileUpload extends PureComponent {
  render() {
    const {fileName, title} = this.props;
    return (
      <Dragger {...this.props}>
        <p className="ant-upload-drag-icon">
          <Icon type="cloud-upload" />
        </p>
        <p className="ant-upload-text"> { title || 'Click or drag file to this area to upload' }</p>
        <p className="ant-upload-hint">
          Click or Drag File Here...
        </p>
        { fileName && <p className="ant-upload-hint"><Icon type="paper-clip" /> {fileName}</p>}
      </Dragger>
    );
  }
}

export default FileUpload;
