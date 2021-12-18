import { CanvaParams, Bound, Way, Node } from "../interfaces"
let scriptBody = ``;

const init = (width, height) => {
  scriptBody = `
  // Initialize the canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.setAttribute('id', 'map');
    canvas.setAttribute('width', '${width}');
    canvas.setAttribute('height', '${height}');
    mapAnchor.appendChild(canvas);
    `;
}

// Takes the lat and lon of a node and returns the scaled
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
  // Draw the boundary
    ctx.beginPath();
    ctx.moveTo(${minX}, ${minY});
    ctx.lineTo(${maxX}, ${minY});
    ctx.lineTo(${maxX}, ${maxY});
    ctx.lineTo(${minX}, ${maxY});
    ctx.lineTo(${minX}, ${minY});
    ctx.stroke();
    `;
}

const getArea = (nodes: Node[]) => {
  const area = nodes.reduce((acc, node) => {
    const { lat, lon } = node;
    return acc + lat * lon;
  }, 0);
  return area;
}

const drawBuildings = (buildings: Way[], width: number, height: number, boundary: Bound, nodes: Node[]) => {
  let maxBuildingArea = 0
  let maxBuilding: Way
  // For each building, get its nodes and draw a polygon based on those nodes. Also, get the largest building. and console.log it.
  buildings.forEach((building: Way) => {
    const buildingNodes = building.nd.map((nodeId: string) => {
      const node = nodes.find(node => node.id === nodeId);
      return node;
    });
    const buildingArea = getArea(buildingNodes);
    if (buildingArea > maxBuildingArea) {
      maxBuildingArea = buildingArea;
      maxBuilding = building;
    }
    const buildingCoords = buildingNodes.map((node: Node) => {
      const { x, y } = convertToXY(node.lat, node.lon, width, height, boundary);
      return [x, y];
    });
    scriptBody += `
    // Draw building ${building.id}
    ctx.beginPath();
    ctx.moveTo(${buildingCoords[0][0]}, ${buildingCoords[0][1]});
    `;
    buildingCoords.forEach((coord: number[]) => {
      scriptBody += `
      ctx.lineTo(${coord[0]}, ${coord[1]});
      `;
    });
    scriptBody += `
    ctx.lineTo(${buildingCoords[0][0]}, ${buildingCoords[0][1]});
    ctx.stroke();
    `;
  }
  );
  console.log("maxBuildingArea", maxBuildingArea);
  console.log("maxBuilding", maxBuilding);
}
const drawRoads = (roads: Way[], width: number, height: number, boundary: Bound, nodes: Node[]) => {
  // For each road, draw a line based on its nodes.
  roads.forEach((road: Way) => {
    if (road.visible === "true") {
      const roadNodes = road.nd.map((id: string) => nodes.find((node: Node) => node.id === id));
      const roadPoints = roadNodes.map((node: Node) => {
        const { x, y } = convertToXY(node.lat, node.lon, width, height, boundary);
        return { x, y };
      });
      scriptBody += `
      // Draw the road
      ctx.beginPath();
      ctx.moveTo(${roadPoints[0].x}, ${roadPoints[0].y});
      `;
      roadPoints.slice(1).forEach((point: { x: number, y: number }, index: number) => {
        scriptBody += `
        ctx.lineTo(${point.x}, ${point.y});
        `;
      }
      );
      scriptBody += `
      ctx.stroke();
      `;
    }
  })
}


// const drawRoads = (roads: Way[], width: number, height: number, boundary: Bound, nodes: Node[]) => {
//   roads.forEach((road: Way) => {
//     const roadNodes = road.nd.map((nodeId: string) => nodes.find((node: Node) => node.id === nodeId));
//     const roadNodesXY = roadNodes.map((node: Node) => convertToXY(node.lat, node.lon, width, height, boundary));
//     scriptBody += `
//     // Draw the road
//     ctx.beginPath();
//     ctx.moveTo(${roadNodesXY[0].x}, ${roadNodesXY[0].y});
//     `;
//     roadNodesXY.slice(1).forEach((node: { x: number, y: number }, index: number) => {
//       scriptBody += `
//       ctx.lineTo(${node.x}, ${node.y});
//       `;
//     });
//     scriptBody += `
//     ctx.lineTo(${roadNodesXY[0].x}, ${roadNodesXY[0].y});
//     ctx.stroke();
//     `;
//   });
// }


export const getCanva = (params: CanvaParams) => {
  const { boundary, roads, buildings, nodes } = params;
  const [width, height] = [800, 800];

  init(width, height);
  drawBoundary(boundary, width, height);
  drawBuildings(buildings, width, height, boundary, nodes);
  drawRoads(roads, width, height, boundary, nodes);

  return scriptBody;
}
