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
