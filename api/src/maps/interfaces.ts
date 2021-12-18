export interface ParsedData {
    boundary: any;
    ways: Way[];
    relations: Relation[];
    nodes: Node[];
}

export interface Road {
    id: string;
    visible: boolean;
    nd: string[];
    tag: Tag[];
}

export interface Tag {
    k: string;
    v: string;
}

export interface Building {
    id: string;
    visible: boolean;
    nd: string[];
    tag: Tag[];
}

export interface CanvaParams {
    boundary: Bound;
    roads: Way[];
    buildings: Way[];
    nodes: Node[];
}

export interface Bound {
    minlat: number;
    minlon: number;
    maxlat: number;
    maxlon: number;
}

export interface Node {
    id: string;
    lat: number;
    lon: number;
    nodeTag: NodeTag[];
    visible: boolean;
}

export interface Relation {
    member: any;
    id: string;
    visible: boolean;
    relationTag: RelationTag[];
}

export interface NodeTag {
    k: string;
    v: string;
}

export interface RelationTag {
    k: string;
    v: string;
}

export interface Way {
    id: string;
    visible: string;
    nd: string[];
    tag: Tag[];
}
