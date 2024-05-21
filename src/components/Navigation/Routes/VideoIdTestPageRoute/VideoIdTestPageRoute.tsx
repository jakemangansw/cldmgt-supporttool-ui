import { Box, Button, Center, Text, VStack } from '@chakra-ui/react';
import { FC, useState } from 'react';

interface VideoIdTestPageRouteProps { }

const VideoIdTestPageRoute: FC<VideoIdTestPageRouteProps> = () => {

  const [renderOption, setRenderOption] = useState<number>(0);
  const [title, setTitle] = useState<string>("");

  console.log(window.location.origin + "/unprotected-iframe");

  const iframeStyle: any = {
    scrollX: "visible",
    scrollY: "visible"
  }

  function nestIframes(iframe: any, levels: number) {
    if (levels === 0) {
      return;
    }

    const newIframe = document.createElement('iframe');
    newIframe.src = 'about:blank'; // Adjust src if needed for specific testing
    newIframe.height = "600px";
    newIframe.width = "100%";

    if (levels === 1) {
      newIframe.src = "https://www.youtube.com/embed/RSuLFvalhnQ?si=ec8SAV2uCWnPW3N4"
    }

    iframe.contentDocument.body.appendChild(newIframe);
    nestIframes(newIframe, levels - 1);
  }

  const createdNestedIframes = () => {
    const iframe1 = document.getElementById('parent-iframe-nest');
    nestIframes(iframe1, 5);
  }

  return <Center w="full" h="full">
    <VStack padding="4">
      <VStack>
        <Button onClick={() => {
          setRenderOption(1)
          setTitle("Youtube embed (Iframe)")
        }}>Render Youtube video embed (iframe)</Button>
        <Button onClick={() => {
          setRenderOption(2)
          setTitle("Iframe => Youtube embed (Iframe)")
        }}>Render Youtube video embed (iframe) inside iframe</Button>
        <Button onClick={() => {
          setRenderOption(3);
          createdNestedIframes();
          setTitle("Iframe => Iframe => Iframe => Iframe => Iframe => Iframe => Youtube embed (Iframe)")
        }}>Render Youtube video embed (iframe) inside nested iframe multiple layers deep (click twice)</Button>
      </VStack>

      <Box mt="8">
        <Text>{title}</Text>
      </Box>
      <Box border="1px" borderStyle="dashed" borderColor="3a3a3a" padding="4">
        {renderOption === 1 ? <>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/RSuLFvalhnQ?si=ec8SAV2uCWnPW3N4" title="YouTube video player"></iframe>
        </> : <></>}

        {renderOption === 2 ? <>
          <iframe style={iframeStyle} width="1000" height="400" src={window.location.origin + "/unprotected-iframe"}></iframe>
        </> : <></>}

        {renderOption === 3 ? <>
          <iframe id="parent-iframe-nest" style={iframeStyle} width="600" height="600" src={window.location.origin + "/blank-route"}></iframe>
        </> : <></>}
      </Box>

    </VStack>
  </Center>;
};

export default VideoIdTestPageRoute;
