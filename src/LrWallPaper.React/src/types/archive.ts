export interface ArchiveRecord {
  id: number;
  sourcePath: string;
  targetPath: string;
  fileName: string;
  fileSize: number;
  fileMD5?: string;
  transferMode: string;
  deviceName?: string;
  agentId?: string;
  agentName?: string;
  cameraModel?: string;
  captureTime?: string;
  archivedAt: string;
}

export interface ArchiveStats {
  total: number;
  totalSize: number;
  today: number;
  devices: Array<{ device_name: string; count: number }>;
  recentDays: Array<{ date: string; count: number }>;
}
