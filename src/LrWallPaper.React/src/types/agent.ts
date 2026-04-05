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
