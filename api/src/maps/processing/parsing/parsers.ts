import { Bound, Way, Road, Relation, Node, ParsedData } from '../../interfaces';

export const nodesParser = (node: any): Node[] => {

  return node.map((element: any) => {
    if (element.$) {
      const { id, lat, lon, visible } = element.$;
      if (element.tag) {
        const nodeTag = element.tag.map((tag: { $: any; }) => tag.$);
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

  return way.map((element: { $: { id: any; visible: any; }; nd: any[]; tag: any[]; }) => {
    const { id, visible } = element.$;

    if (element.nd) {
      nd = element.nd.map((nd: { $: { ref: any; }; }) => nd.$.ref);
    }
    if (element.tag) {
      tag = element.tag.map((tag: { $: any; }) => tag.$);
    }

    return ({ id, visible, nd, tag });
  }
  );
}

export const relationParser = (relation: any): Relation[] => {
  let relationTag = [];
  let member = [];

  const relations = relation.map((element: { $: { id: any; visible: any; }; member: any[]; tag: any[]; }) => {
    if (element.$) {
      const { id, visible } = element.$;

      member = element.member?.map((member: { $: any; }) => member.$);
      relationTag = element.tag?.map((tag: { $: any; }) => tag.$);
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

export const getRoads = (parsedData: ParsedData): Way[] => {
  const getRoads = parsedData.ways.filter(
    (way) => {
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