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

export interface ScanStatus {
  isScanning?: boolean;
  currentFile?: string;
  filesProcessed?: number;
  lastScanStart?: string;
  lastScanEnd?: string;
  lastScanDurationSeconds?: number;
  nextScanTime?: string;
  lastError?: string;
}

export interface Agent {
  id: string;
  name: string;
  endpoint: string;
  version?: string;
  lastSeen?: string;
  scanStatus?: ScanStatus;
}

export interface FolderSummary {
  filePath: string;
  agentId: string;
  fileCount: number;
  totalSize: number;
}

export interface BackupStats {
  totalFiles: number;
  backedUp: number;
  pending: number;
  uploading: number;
  failed: number;
  notQueued: number;
}

export interface BackupTask {
  id: number;
  fileId: number;
  status: string;
  fileName?: string;
  remotePath?: string;
  errorMessage?: string;
  lastAttempt?: string;
  completedAt?: string;
}

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
