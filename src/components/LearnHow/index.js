import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import YoutubeIcon from '../Icons/Youtube';

import styles from './index.less';

const propTypes = {
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
};

const LearnHow = ({ title, text }) => (
  <div className={styles.learnHow} style={{ backgroundColor: title ? '#f6f0df' : '#e5f3f3' }}>
    <div>
      <YoutubeIcon />
      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
    {title ? <Button>View Details</Button> : <a> Details</a>}
  </div>
);

LearnHow.propTypes = propTypes;
LearnHow.defaultProps = {
  title: '',
};

export default LearnHow;
