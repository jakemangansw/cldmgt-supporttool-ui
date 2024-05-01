import { FC } from 'react';
import styles from './IFrameTestRoute.module.scss';
import { Box, VStack } from '@chakra-ui/react';

interface IFrameTestRouteProps { }

const IFrameTestRoute: FC<IFrameTestRouteProps> = () => (
  <div className={styles.IFrameTest}>
    <VStack spacing="16">
      <p>These are iFrames</p>
      <Box>
      W3schools website embedding in iframe is likely disallowed due to website safety configuration
        <iframe src="https://www.w3schools.com" title="W3Schools Free Online Web Tutorials" />
      </Box>


      <Box>
        Same with Youtube
        <iframe src="https://www.youtube.com/embed/b4i7j6U7Ul8">
        </iframe>
      </Box>

      <Box>
        Website embedding allowed with Wikipedia
        <iframe src="https://en.wikipedia.org/wiki/Heuristic_(computer_science)">
        </iframe>
      </Box>
      

      <Box>
        Youtube video embedding is allowed however
        <iframe width="560" height="315" src="https://www.youtube.com/embed/mzOUgwsQ_hM?si=LkBVxKAILvdl4qX3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />
      </Box>

    </VStack>

  </div>
);

export default IFrameTestRoute;
