import { useState } from 'react';
import type { FolderSummary } from '../types';

interface TreeNode {
  name: string;
  fullPath: string;
  children: Map<string, TreeNode>;
  folder?: FolderSummary;
}

function buildTree(folders: FolderSummary[]): TreeNode {
  const root: TreeNode = { name: '', fullPath: '', children: new Map() };
  for (const f of folders) {
    const parts = f.filePath.replace(/\\/g, '/').split('/').filter(Boolean);
    let node = root;
    let path = '';
    for (const part of parts) {
      path = path ? path + '/' + part : part;
      if (!node.children.has(part)) {
        node.children.set(part, { name: part, fullPath: path, children: new Map() });
      }
      node = node.children.get(part)!;
    }
    node.folder = f;
  }
  return root;
}

function TreeNodeView({ node, depth, selectedFolder, onSelect }: {
  node: TreeNode; depth: number; selectedFolder: FolderSummary | null; onSelect: (f: FolderSummary) => void;
}) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children.size > 0;
  const isSelected = selectedFolder?.filePath === node.folder?.filePath && selectedFolder?.agentId === node.folder?.agentId;
  const isLeaf = node.folder != null;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '1px 2px', paddingLeft: depth * 16 + 2,
        cursor: isLeaf ? 'pointer' : hasChildren ? 'pointer' : 'default',
        backgroundColor: isSelected ? '#000080' : 'transparent', color: isSelected ? '#fff' : '#000' }}
        onClick={() => { if (isLeaf && node.folder) onSelect(node.folder); if (hasChildren) setExpanded(!expanded); }}>
        <span style={{ width: '14px', textAlign: 'center', fontSize: '10px', flexShrink: 0 }}>
          {hasChildren ? (expanded ? '-' : '+') : ' '}
        </span>
        <span style={{ marginRight: '4px', fontSize: '12px' }}>{isLeaf ? '\uD83D\uDCC1' : '\uD83D\uDCC2'}</span>
        <span style={{ flexGrow: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{node.name}</span>
        {isLeaf && node.folder && <span style={{ color: isSelected ? '#ccc' : '#888', marginLeft: '4px', flexShrink: 0, fontSize: '10px' }}>
          {node.folder.fileCount}
        </span>}
      </div>
      {expanded && Array.from(node.children.values()).map(child =>
        <TreeNodeView key={child.fullPath} node={child} depth={depth + 1} selectedFolder={selectedFolder} onSelect={onSelect} />
      )}
    </div>
  );
}

export default function FolderTree({ folders, selectedFolder, onSelect }: {
  folders: FolderSummary[]; selectedFolder: FolderSummary | null; onSelect: (f: FolderSummary) => void;
}) {
  const tree = buildTree(folders);
  if (tree.children.size === 0) return <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No folders found</div>;
  return <div style={{ padding: '2px' }}>{Array.from(tree.children.values()).map(n => <TreeNodeView key={n.fullPath} node={n} depth={0} selectedFolder={selectedFolder} onSelect={onSelect} />)}</div>;
}
