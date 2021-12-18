import { Injectable } from '@nestjs/common';
import parser from './processing/parsing/parser';
import { getRoads, getBuildings } from './processing/parsing/parsers';
import { getCanva } from './processing/buildCanva';
import { CanvaParams } from './interfaces';
import * as fs from 'fs';

const map = fs.readFileSync(__dirname+'/map.osm', 'utf8');

@Injectable()
export class MapsService {
  getMap() {
    return map;
  }

  async generate(body: any): Promise<string> {
    const parsedData = parser(body);
    const roads = getRoads(parsedData);
    const buildings = getBuildings(parsedData);
    const boundary = parsedData.boundary;
    const nodes = parsedData.nodes;

    const res: CanvaParams = {
      boundary: boundary,
      roads: roads,
      buildings: buildings,
      nodes: nodes,
    };

    // return res;
    return getCanva(res);
  }
}

