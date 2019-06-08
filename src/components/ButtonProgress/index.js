import React from 'react';
import PropTypes from 'prop-types';

import { Progress } from 'antd';

import styles from './index.less';

const propTypes = {
  persent: PropTypes.number.isRequired,
};

const ButtonProgress = ({ persent }) => (
  <div className={styles.progress}>
    <span>{persent === 100 ? 'Complete' : 'In Progress'}</span>

    <Progress percent={persent} showInfo={false} strokeColor="#36cfc9" />
  </div>
);

ButtonProgress.propTypes = propTypes;

export default ButtonProgress;
