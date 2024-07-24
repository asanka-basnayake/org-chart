export default [
    {
      id: "1",
      data: { label: "Input Node", img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUYvpg87v8etLyXF_M2nv8Vle4fwzGrAi1EQ&s',       collapsed: true},
      position: { x: 250, y: 25 },
      style: { backgroundColor: "#6ede87", color: "white" },
      type: 'custom',
    },
  
    {
      id: "2",
      // you can also pass a React component as a label
      data: { label: "simon silva",  team: 'Human Resource',     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi-uWmGZzXDkNitp5ZYQV8bFhr7wkKdvEHBw&s', collapsed: true},
      position: { x: 100, y: 125 },
      style: { backgroundColor: "#ff0072", color: "white" },
      type: 'custom',

    },
    {
      id: "3",
      data: { label: "s3" },
      position: { x: 250, y: 250 },
      style: { backgroundColor: "#6865A5", color: "white" },
      type: 'custom',
      collapsed: true
    },
    {
        id: "4",
        data: { label: "s4" },
        position: { x: 300, y: 250 },
        style: { backgroundColor: "#6865A5", color: "white" }
    },
    {
        id: "5",
        data: { label: "s5" },
        position: { x: 350, y: 250 },
        type: "output",
        style: { backgroundColor: "#6865A5", color: "white" }
    },
    {
        id: "6",
        data: { label: "s6" },
        position: { x: 350, y: 250 },
        style: { backgroundColor: "#6865A5", color: "white" }
    }
  ];
  