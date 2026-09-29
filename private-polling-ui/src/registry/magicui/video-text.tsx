import React, { useRef } from 'react';

export interface VideoTextProps {
  /** Video source URL (e.g. mp4, webm) or dynamic canvas background */
  src?: string;
  /** Text content or node to display inside the video clip */
  children: React.ReactNode;
  /** Optional container CSS class */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Additional video element props */
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  overlayOpacity?: number;
}

/**
 * VideoText component
 * Renders bold, impactful text with a video playing seamlessly INSIDE the letters,
 * creating a mesmerizing glowing video texture effect.
 */
export const VideoText: React.FC<VideoTextProps> = ({
  src = 'https://cdn.magicui.design/ocean-small.webm',
  children,
  className = '',
  style = {},
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  overlayOpacity = 0.1,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className={`relative w-full flex items-center justify-center overflow-hidden ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      {/* Hidden/background video driving the background-clip text effect */}
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Background-clipped video text container */}
        <span
          style={{
            display: 'inline-block',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E")`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            position: 'relative',
            zIndex: 2,
            filter: 'drop-shadow(0 0 25px rgba(127, 227, 212, 0.35))',
          }}
        >
          {children}
        </span>

        {/* Video element mapped through CSS clip mask or background text rendering */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
            overflow: 'hidden',
            mixBlendMode: 'screen',
          }}
        >
          <video
            ref={videoRef}
            src={src}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(1.25) contrast(1.15) saturate(1.3)',
              opacity: 1 - overlayOpacity,
            }}
          />
        </div>
      </div>
    </div>
  );
};
