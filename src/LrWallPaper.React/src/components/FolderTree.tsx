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
      <div className={'tree-row' + (isSelected ? ' sel' : '')}
        style={{ paddingLeft: depth * 15 + 6 }}
        onClick={() => { if (isLeaf && node.folder) onSelect(node.folder); if (hasChildren) setExpanded(!expanded); }}>
        <span className="tree-caret">{hasChildren ? (expanded ? '▾' : '▸') : ''}</span>
        <span>{isLeaf ? '📁' : '📂'}</span>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{node.name}</span>
        {isLeaf && node.folder && <span className="tree-count">{node.folder.fileCount}</span>}
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
  if (tree.children.size === 0) return <div className="faint" style={{ padding: 20, textAlign: 'center' }}>No folders found</div>;
  return <div className="tree">{Array.from(tree.children.values()).map(n => <TreeNodeView key={n.fullPath} node={n} depth={0} selectedFolder={selectedFolder} onSelect={onSelect} />)}</div>;
}
