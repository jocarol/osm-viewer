import { Bound, Way, Road, Relation, Node, ParsedData } from '../../interfaces';

export const nodesParser = (node: any): Node[] => {

  return node.map((element: any) => {
    if (element.$) {
      const { id, lat, lon, visible } = element.$;
      if (element.tag) {
        const nodeTag = element.tag.map(tag => tag.$);
        return ({ id, lat, lon, nodeTag });
      }
      return ({ id, lat, lon, visible });
    }
  });
}

export const boundsParser = (bounds: any): Bound => {
  const { minlat, minlon, maxlat, maxlon } = bounds[0].$;

  return ({ minlat, minlon, maxlat, maxlon });
}

export const waysParser = (way: any): Way[] => {
  let nd = [];
  let tag = [];

  return way.map(element => {
    const { id, visible } = element.$;

    // if (id == "67056563") throw new Error("OK"); 
    if (element.nd) {
      nd = element.nd.map(nd => nd.$.ref);
    }
    if (element.tag) {
      tag = element.tag.map(tag => tag.$);
    }

    return ({ id, visible, nd, tag });
  }
  );
}

export const relationParser = (relation: any): Relation[] => {
  let relationTag = [];
  let member = [];

  const relations = relation.map(element => {
    if (element.$) {
      const { id, visible } = element.$;

      member = element.member?.map(member => member.$);
      relationTag = element.tag?.map(tag => tag.$);
      return ({ id, visible, relationTag, member });
    }
  });

  return relations;
}

export const getBuildingsNodesIds = (ways: Way[]): string[] => {
  const buildingsNodesIds = ways.filter(way => {
    if (way.tag) {
      const building = way.tag.find(tag => tag.k === "building");
      if (building) {
        return true;
      }
    }
  }).map(way => way.nd);

  return buildingsNodesIds.flat();
}

export const getBuildings = (parsedData: ParsedData) => {
  // get buildings from ways
  const buildings = parsedData.ways.filter(way => {
    if (way.tag) {
      const building = way.tag.find(tag => tag.k === "building");
      if (building) {
        return true;
      }
    }
  })
  return buildings;
}
//   const { relations } = parsedData;
//   const buildings = relations.map(relation => {
//     if (relation.relationTag?.find(tag => tag.k === 'building')) {
//       return relation;
//     }
//   });
//   // Strip the null values from the buildings array
//   return buildings.filter(building => building);
// }

export const getRoads = (parsedData: ParsedData): Way[] => {
  //@ts-ignore
  // console.log(parsedData.way)
  const getRoads = parsedData.ways.filter(
    (way) => {
      // console.log(way)
      return way.tag.find((tag) => tag.k === 'highway')
    },
  );

  return getRoads;
}

export const roadsNodesIds = (roads: Road[]): any => {
  const roadsNodesIds = roads.map((road) => {
    return road.nd.map((nd) => nd);
  });

  return roadsNodesIds;
}