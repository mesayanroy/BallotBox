import React, { useEffect, useState } from 'react';
import { Copy, Check, Terminal as TerminalIcon } from 'lucide-react';

export interface TerminalProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
}

export interface TypingAnimationProps {
  children: string;
  delay?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface AnimatedSpanProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Terminal component
 * Renders a dark, sleek CLI prompt window with window controls, copy action, and animated lines.
 */
export const Terminal: React.FC<TerminalProps> = ({
  children,
  className = '',
  title = 'midnight-zk-prover — bash',
  style = {},
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Collect text from children if possible
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-950/90 shadow-2xl overflow-hidden backdrop-blur-md ${className}`}
      style={{
        backgroundColor: '#090d16',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(95, 227, 200, 0.08)',
        fontFamily: '"JetBrains Mono", monospace',
        overflow: 'hidden',
        color: '#e2e8f0',
        ...style,
      }}
    >
      {/* Titlebar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            color: '#94a3b8',
            letterSpacing: '0.05em',
          }}
        >
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>{title}</span>
        </div>
        <button
          onClick={handleCopy}
          title="Copy console contents"
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Terminal Content */}
      <div
        style={{
          padding: '18px 20px',
          fontSize: '13px',
          lineHeight: 1.75,
          minHeight: '180px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * TypingAnimation component
 * Types out command strings character by character after specified delay.
 */
export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  children,
  delay = 0,
  speed = 40,
  className = '',
  style = {},
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < children.length) {
        setDisplayedText(children.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, children, speed]);

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        color: '#f8fafc',
        fontFamily: '"JetBrains Mono", monospace',
        ...style,
      }}
    >
      <span>{displayedText}</span>
      {started && displayedText.length < children.length && (
        <span
          style={{
            display: 'inline-block',
            width: '8px',
            height: '15px',
            backgroundColor: '#5fe3c8',
            marginLeft: '4px',
            animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
      )}
    </div>
  );
};

/**
 * AnimatedSpan component
 * Reveals terminal response logs with smooth fade-in after specified delay.
 */
export const AnimatedSpan: React.FC<AnimatedSpanProps> = ({ children, delay = 0, className = '', style = {} }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Color helper class mapper for common tailwind text color classes
  const getColorStyle = (cls: string): React.CSSProperties => {
    if (cls.includes('text-blue')) return { color: '#38bdf8' };
    if (cls.includes('text-green') || cls.includes('text-emerald')) return { color: '#4ade80' };
    if (cls.includes('text-purple') || cls.includes('text-indigo')) return { color: '#c084fc' };
    if (cls.includes('text-cyan') || cls.includes('text-teal')) return { color: '#5fe3c8' };
    if (cls.includes('text-amber') || cls.includes('text-yellow')) return { color: '#fbbf24' };
    if (cls.includes('text-red') || cls.includes('text-rose')) return { color: '#f87171' };
    return {};
  };

  if (!visible) return null;

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        fontFamily: '"JetBrains Mono", monospace',
        color: '#94a3b8',
        ...getColorStyle(className),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
