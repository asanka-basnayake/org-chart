const imgURl = 'https://i.pinimg.com/736x/4c/30/b9/4c30b9de7fe46ffb20d4ee4229509541.jpg';
const imgUrl2 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUYvpg87v8etLyXF_M2nv8Vle4fwzGrAi1EQ&s';
const imgUrl3 = 'https://static.vecteezy.com/system/resources/previews/024/959/971/original/businessman-portrait-elegant-man-in-business-suit-employee-of-business-institution-in-uniform-man-office-worker-business-avatar-profile-picture-illustration-vector.jpg'
const nodeStyle = { backgroundColor: 'white',boxShadow: 'whitesmoke 1px 1px 12px 2px' };

export const treeData = {
  id: '1',
  name: 'Root',
  style: { backgroundColor: 'white',boxShadow: 'whitesmoke 1px 1px 12px 2px' },
  team: "CEO",
  img: imgURl,
  type: 'custom',
  children: [
    {
      id: '2',
      name: 'Child 1',
      img: imgURl,
      style: { backgroundColor: 'white',boxShadow: 'whitesmoke 1px 1px 12px 2px' },
      type: 'custom',
      team: "Marketing",
      collapsed: false,
      children: [
        { id: '4', name: 'Grandchild 1', img: imgUrl2, team: "Marketing", type: 'custom', style: nodeStyle},
        { id: '5', name: 'Grandchild 2', img: imgUrl3, team: "Finance", type: 'custom', style: nodeStyle  }
      ]
    },
    {
      id: '3',
      name: 'Child 2',
      img: imgURl,
      style: { backgroundColor: 'white',boxShadow: 'whitesmoke 1px 1px 12px 2px' },
      team: "Human resource",
      type: 'custom', 
      children: [
        { id: '6', name: 'Grandchild 3', img: imgURl,
          style: { backgroundColor: 'white',boxShadow: 'whitesmoke 1px 1px 12px 2px' },
          type: 'custom', 
        }
      ]
    }
  ]
};

export const convertTreeToReactFlow = (tree, parentNode = null) => {
    const nodes = [];
    const edges = [];
  
    const traverse = (node, parent) => {
      nodes.push({
        id: node.id,
        data: { label: node.name, img: node.img, team: node.team, collapsed: node.collapsed },
        style: node.style,
        type: node.type,
        position: { x: Math.random() * 400, y: Math.random() * 400 }, // example positions
      });
  
      if (parent) {
        edges.push({
          id: `e${parent.id}-${node.id}`,
          source: parent.id,
          target: node.id,
          type: 'smoothstep',
        });
      }
  
      if (node.children) {
        node.children.forEach(child => {
          if (!node.collapsed)  {
            traverse(child, node)
          }
          
      });
      }
    };
  
    traverse(tree, parentNode);
    return { nodes, edges };
  };

