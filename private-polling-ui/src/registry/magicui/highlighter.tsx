import React from 'react';

export interface HighlighterProps {
  /** Highlight style action: 'underline' | 'highlight' | 'circle' | 'box' | 'strikethrough' */
  action?: 'underline' | 'highlight' | 'circle' | 'box' | 'strikethrough';
  /** Highlight color string (hex, rgb, etc.) */
  color?: string;
  /** Text content to be highlighted */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Inline style */
  style?: React.CSSProperties;
}

/**
 * Highlighter component
 * Renders playful animated SVG underline or marker highlight sweeps behind or around key text.
 */
export const Highlighter: React.FC<HighlighterProps> = ({
  action = 'underline',
  color = '#7fe3d4',
  children,
  className = '',
  style = {},
}) => {
  if (action === 'highlight') {
    return (
      <span
        className={`relative inline-block px-1.5 py-0.5 rounded transition-all duration-300 ${className}`}
        style={{
          position: 'relative',
          display: 'inline-block',
          backgroundImage: `linear-gradient(120deg, ${color}33 0%, ${color}66 100%)`,
          boxShadow: `0 0 12px ${color}22`,
          borderRadius: '4px',
          paddingLeft: '0.3em',
          paddingRight: '0.3em',
          margin: '0 0.1em',
          color: 'inherit',
          ...style,
        }}
      >
        <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
        <span
          style={{
            position: 'absolute',
            bottom: '0px',
            left: 0,
            right: 0,
            height: '40%',
            backgroundColor: `${color}44`,
            borderRadius: '2px',
            zIndex: 0,
          }}
        />
      </span>
    );
  }

  if (action === 'circle' || action === 'box') {
    return (
      <span
        className={`relative inline-block ${className}`}
        style={{
          position: 'relative',
          display: 'inline-block',
          padding: '0.15em 0.4em',
          borderRadius: action === 'circle' ? '999px' : '6px',
          border: `1.5px dashed ${color}`,
          backgroundColor: `${color}15`,
          boxShadow: `0 0 16px ${color}22`,
          ...style,
        }}
      >
        {children}
      </span>
    );
  }

  if (action === 'strikethrough') {
    return (
      <span
        className={`relative inline-block ${className}`}
        style={{
          position: 'relative',
          display: 'inline-block',
          ...style,
        }}
      >
        {children}
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: color,
            transform: 'translateY(-50%) rotate(-1.5deg)',
            borderRadius: '1px',
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </span>
    );
  }

  // Default: 'underline'
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        color: 'inherit',
        ...style,
      }}
    >
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: '-0.25em',
          left: '-2%',
          width: '104%',
          height: '0.45em',
          overflow: 'visible',
          pointerEvents: 'none',
        }}
      >
        <path
          d="M2 15 C 30 18, 70 12, 98 16"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 4px ${color}88)`,
          }}
        />
      </svg>
    </span>
  );
};
