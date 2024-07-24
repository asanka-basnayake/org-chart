import React from 'react';
import {
  Panel,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from '@xyflow/react';
import { toPng } from 'html-to-image';

function downloadImage(dataUrl) {
    console.log({dataUrl })
//   const a = document.createElement('a');

//   a.setAttribute('download', 'reactflow.png');
//   a.setAttribute('href', dataUrl);
//   a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton() {
  const { getNodes } = useReactFlow();
  const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
        nodesBounds,imageWidth,imageHeight,
        0.5,
        2,
    );

    const element = document.querySelector('.react-flow__viewport') 
    if (!element instanceof HTMLElement) {
        console.log(typeof element)
    }
    toPng(element,
    {
      backgroundColor: '#1a365d',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }
    ).then(downloadImage).catch(e => console.log('jjj'));
  };

  return (
    <Panel position="top-right">
      <button className="download-btn" onClick={onClick}>
        Download Image
      </button>
    </Panel>
  );
}

export default DownloadButton;