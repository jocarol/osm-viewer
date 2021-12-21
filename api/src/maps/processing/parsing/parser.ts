import { ParsedData } from '../../interfaces';
import {nodesParser, waysParser, boundsParser, relationParser} from './parsers';

const parser = (body: any): ParsedData => {
  const { osm: { bounds, node, way, relation } } = body;
  
  const nodes = nodesParser(node);
  const ways = waysParser(way);
  const boundary = boundsParser(bounds);
  const relations = relationParser(relation);

  return { boundary, ways, relations, nodes }
}

export default parser;
