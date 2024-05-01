import React, { FC } from 'react';
import styles from './IFrameTestRoute.module.scss';
import { VStack } from '@chakra-ui/react';

interface IFrameTestRouteProps { }

const IFrameTestRoute: FC<IFrameTestRouteProps> = () => (
  <div className={styles.IFrameTest}>
    <VStack>
      <p>These are iFrames</p>
      <iframe src="https://www.w3sch1ools.com" title="W3Schools Free Online Web Tutorials">
      </iframe>
      <iframe src="https://youtube.com">
      </iframe>
    </VStack>

  </div>
);

export default IFrameTestRoute;
