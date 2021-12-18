import { CanvaParams, Bound, Way, Node } from "../interfaces"
let scriptBody = ``;

const init = (width, height) => {
  scriptBody = `
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.setAttribute('id', 'map');
    canvas.setAttribute('width', '${width}');
    canvas.setAttribute('height', '${height}');
    document.body.appendChild(canvas);
    `;
}

// Create a function that takes he lat and lon of a node and returns the scaled
// x and y coordinates of the node.
const convertToXY = (lat: number, lon: number, width: number, height: number, boundary: Bound) => {
  const { minlat, minlon, maxlat, maxlon } = boundary;
  const x = (lon - minlon) / (maxlon - minlon) * width;
  const y = (lat - minlat) / (maxlat - minlat) * height;
  return { x, y };
};

const drawBoundary = (boundary: Bound, width: number, height: number) => {
  const { minlat, minlon, maxlat, maxlon } = boundary;
  const { x: minX, y: minY } = convertToXY(minlat, minlon, width, height, boundary);
  const { x: maxX, y: maxY } = convertToXY(maxlat, maxlon, width, height, boundary);

  console.log("minX, minY, maxX, maxY", minX, minY, maxX, maxY);

  scriptBody += `
    ctx.beginPath();
    ctx.moveTo(${minX}, ${minY});
    ctx.lineTo(${maxX}, ${minY});
    ctx.lineTo(${maxX}, ${maxY});
    ctx.lineTo(${minX}, ${maxY});
    ctx.lineTo(${minX}, ${minY});
    ctx.stroke();
    `;
}

const drawBuildings = (buildings: Way[], width: number, height: number, boundary: Bound, nodes: Node[]) => {
// Draw a red point on the canvas for each node in the node array.
  buildings.forEach(building => {
    const { nd: nodeList } = building;
    nodeList.forEach(node => {
      const { lat, lon } = nodes.find(n => n.id === node);
      const { x, y } = convertToXY(lat, lon, width, height, boundary);
      console.log("x, y", x, y);
      scriptBody += `
        ctx.beginPath();
        ctx.arc(${x}, ${y}, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        `;
    });
  });
}




export const getCanva = (params: CanvaParams) => {
  const { boundary, roads, buildings, nodes } = params;
  const [width, height] = [800, 800];
  
  init(width, height);
  drawBoundary(boundary, width, height);
  drawBuildings(buildings, width, height, boundary, nodes);


  return scriptBody;
}
