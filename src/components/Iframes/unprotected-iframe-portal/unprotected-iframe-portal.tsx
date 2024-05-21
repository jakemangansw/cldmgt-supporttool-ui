import React, { FC } from 'react';
import styles from './unprotected-iframe-portal.module.scss';

interface UnprotectedIframePortalProps {}

const UnprotectedIframePortal: FC<UnprotectedIframePortalProps> = () => (
  <div className={styles.UnprotectedIframePortal}>
    UnprotectedIframePortal Component
  </div>
);

export default UnprotectedIframePortal;
