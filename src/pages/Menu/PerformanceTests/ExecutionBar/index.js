import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col } from 'antd';

import styles from './index.less';

const propTypes = {
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};

const ExecutionBar = ({ total, current, state, className }) => {
  function renderBar() {
    const elements = [];

    for (let i = 1; i <= total; i += 1) {
      elements.push(
        <div
          key={`key_${i}`}
          className={classNames(styles.barWrapper, { [styles.complete]: i <= current })}
        >
          {i > current ? (
            <div className={styles.point}>{i}</div>
          ) : (
            <div className={styles.point}> &#10003;</div>
          )}

          {i !== total && <div className={styles.line} />}
        </div>
      );
    }

    return <div className={styles.barWrapper}>{elements}</div>;
  }
  return (
    <div className={classNames(styles.executionBar, className)}>
      <Col offset={1} md={5}>
        <span className={styles.status}>
          Execution: <span>{state.replace('_', ' ').toLowerCase()}</span>{' '}
        </span>
      </Col>
      <Col sm={24} md={18}>
        {renderBar()}
      </Col>
    </div>
  );
};

ExecutionBar.propTypes = propTypes;

export default ExecutionBar;
