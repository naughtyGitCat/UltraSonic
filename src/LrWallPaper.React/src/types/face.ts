export interface FaceInfo {
  id: number;
  regionX: number;
  regionY: number;
  regionW: number;
  regionH: number;
  confidence: number;
  personId?: number;
  personName?: string;
}

export interface Person {
  id: number;
  name: string;
}
