import { FC } from 'react';
import styles from './blank-route.module.scss';

interface BlankRouteProps { }

const BlankRoute: FC<BlankRouteProps> = () => (
  <div className={styles.BlankRoute}>
    This is a blank route.
  </div>
);

export default BlankRoute;
