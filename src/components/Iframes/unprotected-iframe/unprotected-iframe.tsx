import { FC } from 'react';
import styles from './unprotected-iframe.module.scss';

interface UnprotectedIframeProps { }

const UnprotectedIframe: FC<UnprotectedIframeProps> = () => (
  <div className={styles.UnprotectedIframe}>
    This is used when rendering an iframe inside an iframe.
    <iframe width="560" height="315" src="https://www.youtube.com/embed/RSuLFvalhnQ?si=ec8SAV2uCWnPW3N4" title="YouTube video player"></iframe>
  </div>
);

export default UnprotectedIframe;
