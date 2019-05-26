import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

const propTypes = {
  type: PropTypes.oneOf(['success', 'danger']).isRequired,
  text: PropTypes.string.isRequired,
};

function StatusBadge({ type, text }) {
  return <span className={`${styles.badge} ${styles[`badge-${type}`]}`}>{text}</span>;
}

StatusBadge.propTypes = propTypes;

export default StatusBadge;
