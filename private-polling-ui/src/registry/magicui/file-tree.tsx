import React, { useState } from 'react';
import { Folder, FolderOpen, FileCode, ShieldCheck, ChevronRight, ChevronDown, CheckCircle2 } from 'lucide-react';

export interface TreeViewElement {
  id: string;
  name: string;
  type?: 'folder' | 'file';
  isSelectable?: boolean;
  children?: TreeViewElement[];
}

export interface TreeProps {
  elements: TreeViewElement[];
  initialSelectedId?: string;
  initialExpandedItems?: string[];
  className?: string;
  indicator?: boolean;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  fileIcon?: React.ReactNode;
  onSelect?: (element: TreeViewElement) => void;
}

const TreeNode: React.FC<{
  element: TreeViewElement;
  level: number;
  expandedIds: Set<string>;
  selectedId: string | null;
  toggleExpand: (id: string) => void;
  selectItem: (element: TreeViewElement) => void;
}> = ({ element, level, expandedIds, selectedId, toggleExpand, selectItem }) => {
  const isFolder = element.type === 'folder' || Boolean(element.children && element.children.length > 0);
  const isExpanded = expandedIds.has(element.id);
  const isSelected = selectedId === element.id;

  const getFileIcon = (name: string) => {
    if (name.endsWith('.compact') || name.endsWith('.zk') || name.includes('circuit')) {
      return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    }
    if (name.endsWith('.ts') || name.endsWith('.tsx') || name.endsWith('.js')) {
      return <FileCode className="w-3.5 h-3.5 text-sky-400 shrink-0" />;
    }
    return <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />;
  };

  return (
    <div className="w-full select-none font-mono text-xs">
      <div
        onClick={() => {
          if (isFolder) {
            toggleExpand(element.id);
          }
          if (element.isSelectable !== false) {
            selectItem(element);
          }
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 8px',
          paddingLeft: `${Math.max(level * 14 + 8, 8)}px`,
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          backgroundColor: isSelected ? 'rgba(127, 227, 212, 0.16)' : 'transparent',
          color: isSelected ? '#5fe3c8' : '#cbd5e1',
          borderLeft: isSelected ? '2px solid #5fe3c8' : '2px solid transparent',
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.color = '#f8fafc';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#cbd5e1';
          }
        }}
      >
        {isFolder ? (
          <>
            <span style={{ display: 'inline-flex', alignItems: 'center', color: '#94a3b8' }}>
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', color: '#38bdf8' }}>
              {isExpanded ? <FolderOpen className="w-3.5 h-3.5" /> : <Folder className="w-3.5 h-3.5" />}
            </span>
          </>
        ) : (
          <span style={{ marginLeft: '16px', display: 'inline-flex', alignItems: 'center' }}>
            {getFileIcon(element.name)}
          </span>
        )}

        <span className="truncate" style={{ fontWeight: isSelected ? 600 : 400 }}>
          {element.name}
        </span>
      </div>

      {isFolder && isExpanded && element.children && (
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: `${level * 14 + 14}px`,
              top: 0,
              bottom: 0,
              width: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            }}
          />
          {element.children.map((child) => (
            <TreeNode
              key={child.id}
              element={child}
              level={level + 1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              toggleExpand={toggleExpand}
              selectItem={selectItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Tree: React.FC<TreeProps> = ({
  elements,
  initialSelectedId = '',
  initialExpandedItems = [],
  className = '',
  onSelect,
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(initialExpandedItems));
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId || null);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectItem = (element: TreeViewElement) => {
    setSelectedId(element.id);
    if (onSelect) onSelect(element);
  };

  return (
    <div
      className={`w-full overflow-y-auto ${className}`}
      style={{
        fontFamily: '"JetBrains Mono", monospace',
        userSelect: 'none',
      }}
    >
      {elements.map((element) => (
        <TreeNode
          key={element.id}
          element={element}
          level={0}
          expandedIds={expandedIds}
          selectedId={selectedId}
          toggleExpand={toggleExpand}
          selectItem={selectItem}
        />
      ))}
    </div>
  );
};
