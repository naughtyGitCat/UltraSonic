export interface Capture {
  id: number;
  fileFullPath: string;
  filePath: string;
  fileName: string;
  cameraMaker?: string;
  cameraModel?: string;
  lensModel?: string;
  agentId?: string;
  latitude?: number;
  longitude?: number;
  fileSize?: number;
  fileMd5?: string;
  captureTime?: string;
}

export interface FilterOptions {
  cameraMakers: string[];
  cameraModels: string[];
  fileTypes: string[];
  agentIds: string[];
}

export interface Tag {
  id: number;
  name: string;
  category: string;
}

export interface FolderSummary {
  filePath: string;
  agentId: string;
  fileCount: number;
  totalSize: number;
}
