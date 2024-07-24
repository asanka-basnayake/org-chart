import { ReactFlow, MiniMap, Controls, Background, Handle, getSmoothStepPath,
  useOnViewportChange, ViewportPortal } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from 'dagre';
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import "./custom-styles.css"
// import defaultNodes from "./nodes.js";
// import defaultEdges from "./edges.js";
import { convertTreeToReactFlow, treeData } from "../utils/convertTreeToReactFlow.js"
import DownloadButton from "./DownloadButton.jsx";
import DataLayersController from "./DataLayersController.jsx";

const nodeWidth = 120;
const nodeHeight = 180;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
dagreGraph.setGraph({ rankdir: 'TB' }); // Top to Bottom layout

const getLayoutedElements = (nodes, edges) => {
  dagreGraph.setGraph({});

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  let i = 0;
  nodes.forEach((node) => {
    i++;
    const nodeWithPosition = dagreGraph.node(node.id);

    // node.targetPosition = 'left';
    // node.sourcePosition = 'bottom';

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

  });

  return { nodes, edges };
}

const nodeColor = (node) => {
  switch (node.type) {
    case "input":
      return "#6ede87";
    case "output":
      return "black";
    default:
      return "#ff0072";
  }
};

const CustomNode = ({ data, id, toggleCollapse, ...rest }) => {
  return (
    <div style={{ padding: '10px' }} className="node_box">
      <div className="node_header">
        <p>{data.team}</p>
        <div className="edit_icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        </div>
      </div>
      <div className="avatar_wrapper">
        <div className="avatar_render" style={{ backgroundImage: `url('${data.img}')`}}>
          {/* <img src={data.img} alt="" width={40} height={40} className="avatar" /> */}
        </div>
        <div className="details">
          <p className="name"> {data.label} </p>
          <p className="team"> {data.team} </p>
        </div>
      </div>
      <div className="custom_details">
        <p>Mission</p>
        <p>...</p>
        {/* <p>aintain financial health while supporting innovative safety initiatives</p>

        <p>Responsibilities</p>
        <p>Care and feeding of cats. And by “cats” we mean engineers and technology people of similar ilk.</p>

        <p>KPIs</p>
        <ul>
          <li>90% of all cats arrived at destination.</li>
          <li>8 new cats added.</li>
          <li>48 litter boxes changes /week.</li>
        </ul> */}
      </div>

      
      <div onClick={() => toggleCollapse(id)} className="collaps_btn">
        {data.collapsed ? <CaretDownOutlined /> : <CaretUpOutlined />}
      </div>
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
      <div className="node_footer"></div>
    </div>
  );
};

function Flow() {
  const { nodes: treeNodes, edges: treeEdges } = convertTreeToReactFlow(treeData)
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(treeNodes, treeEdges);

  console.log({ layoutedNodes, layoutedEdges });
  const [flowNodes, setFlowNodes] = useState(layoutedNodes);
  const [flowEdges, setFlowEdges] = useState(layoutedEdges);

  const reactFlowWrapper = useRef(null);

  const toggleCollapse = (nodeId) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, collapsed: !node.data.collapsed } } : node
      )
    );
  };

  const ref = useRef();

  useEffect(() => {
    // const canvas = document.createElement('canvas');
    // const scale = window.devicePixelRatio;
    // const width = ref.current.offsetWidth;
    // const height = ref.current.offsetHeight;

    // canvas.width = width * scale;
    // canvas.height = height * scale;
    // const ctx = canvas.getContext('2d');
    // ctx.scale(scale, scale);

    // html2canvas(ref.current, canvas).then(() => {
    //   // Do something with the canvas, like converting it to an image
    //   const imgData = canvas.toDataURL('image/png');
    //   console.log(imgData);
    // });
  }, []);

  const exportToPdf = async () => {
    const element = reactFlowWrapper.current;

    // const canvas = await html2canvas(ref.current);
    // const imgData = canvas.toDataURL('image/png');

    // console.log({ imgData })
    // const pdf = new jsPDF('p', 'mm', 'a4');
    // pdf.addImage(imgData, 'PNG', 0, 0);
    // pdf.save('flowchart.pdf');

    const opt = {
      margin: [10, 10, 10, 10],
      filename: 'tree-structure.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { useCORS: true, scale: 5 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // not working yet
    element.attributes.style.overflow = 'visible';
    const sourceNodeId = flowEdges[0].source;
    const targetNodeId = flowEdges[0].target;


    await new Promise((resolve, reject) => {

      const [sourceNode] = flowNodes.filter(({ id }) => id === sourceNodeId)
      const [targetNode] = flowNodes.filter(({ id }) => id === targetNodeId)

      console.log({ sourceNode, targetNode })
      const sourceX = sourceNode.position.x
      const sourceY = sourceNode.position.y
      const targetX = targetNode.position.x
      const targetY = targetNode.position.y

      // const { sourceX, sourceY, targetX, targetY } = params;
      const [path, waypoints] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        borderRadius: 5, // Adjust border radius as needed
      });

      console.log({ path, waypoints });
      
      html2canvas(element, opt.html2canvas)
        .then(canvas => {
          const pdf = new jsPDF(opt.jsPDF);
          const imgData = canvas.toDataURL('image/png');
          const svgImgData = `data:image/png;base64,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`

          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();

          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          let heightLeft = imgProps.height;
          let position = 0;

          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
          // pdf.addImage(svgImgData, 'PNG', 0, position, pdfWidth, pdfHeight);
          // pdf.addImage(svgImgData, 0,  0, 50, 10)
          // pdf.addImage(svgImgData, (sourceX - 80 )* 0.415,  0, Math.abs(sourceX - targetX), 10)
          heightLeft -= pdf.internal.pageSize.getHeight();

          // while (heightLeft >= 0) {
          //   position = heightLeft - pdfHeight;
          //   pdf.addPage();
          //   pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
          //   heightLeft -= pdf.internal.pageSize.getHeight();
          // }

          pdf.save(opt.filename);
          resolve("ok")
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });

    });
  };

  const viewportChangeLogger = () => {
    useOnViewportChange({
      onStart: (viewport) => console.log('start', viewport),
      onChange: (viewport) => console.log('change', viewport),
      onEnd: (viewport) => console.log('end', viewport),
    });
   
    return null;
  }
  const nodeTypes = {
    custom: (node) => <CustomNode {...node} toggleCollapse={toggleCollapse} />,
  };

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      <button onClick={exportToPdf}>Export to PDF</button>
      <ReactFlow ref={reactFlowWrapper} defaultNodes={layoutedNodes} defaultEdges={layoutedEdges} nodeTypes={nodeTypes} fitView
        // onViewportChange={viewportChangeLogger}
      >
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Background variant="dots" gap={12} size={1} bgColor='whitesmoke' />
        <Controls />
        {/* <ViewportPortal>
          <div
            style={{ transform: 'translate(px, 0px)', position: 'absolute' }}
          >
            [0, 0]
          </div>
        </ViewportPortal> */}
        {/* <DownloadButton /> */}
        <DataLayersController />
      </ReactFlow>
    </div>


  );
}

export default Flow;