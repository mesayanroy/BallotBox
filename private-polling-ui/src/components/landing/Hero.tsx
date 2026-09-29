import React from 'react';
import { Box, Button, Typography, Chip } from '@mui/material';
import { keyframes } from '@emotion/react';
import CodeIcon from '@mui/icons-material/Code';
import FolderIcon from '@mui/icons-material/Folder';
import { LINKS, NETWORK_ID, TRACTION } from '../../config/product';
import { display, mono, tokens } from '../../config/theme';
import { VideoText } from '../../registry/magicui/video-text';
import { Highlighter } from '../../registry/magicui/highlighter';
import { Tree, type TreeViewElement } from '../../registry/magicui/file-tree';

export interface HeroProps {
  readonly primaryLabel: string;
  readonly onPrimary: () => void;
}

export const heroInk = {
  ground: '#070918',
  text: '#eef0ff',
  textSoft: '#a8aed3',
  textFaint: '#6f7598',
  line: 'rgba(238, 240, 255, 0.14)',
} as const;

const drift = keyframes`
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  33%  { transform: translate3d(5%, -3%, 0) scale(1.05); }
  66%  { transform: translate3d(-4%, 4%, 0) scale(0.96); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(95, 227, 200, 0.45); }
  50%      { box-shadow: 0 0 0 6px rgba(95, 227, 200, 0); }
`;

const ELEMENTS: TreeViewElement[] = [
  {
    id: 'src',
    type: 'folder',
    isSelectable: true,
    name: 'src',
    children: [
      {
        id: 'contract',
        type: 'folder',
        isSelectable: true,
        name: 'contract',
        children: [
          { id: 'ballot', isSelectable: true, name: 'ballotbox.compact' },
          { id: 'verifier', isSelectable: true, name: 'verifier.zk' },
        ],
      },
      {
        id: 'lib',
        type: 'folder',
        isSelectable: true,
        name: 'lib',
        children: [
          { id: 'utils', isSelectable: true, name: 'utils.ts' },
        ],
      },
      {
        id: 'app',
        type: 'folder',
        isSelectable: true,
        name: 'app',
        children: [
          { id: 'page', isSelectable: true, name: 'page.tsx' },
          { id: 'layout', isSelectable: true, name: 'layout.tsx' },
        ],
      },
      {
        id: 'components',
        type: 'folder',
        isSelectable: true,
        name: 'components',
        children: [
          { id: 'header', isSelectable: true, name: 'header.tsx' },
          {
            id: 'ui',
            type: 'folder',
            isSelectable: true,
            name: 'ui',
            children: [
              { id: 'button', isSelectable: true, name: 'button.tsx' },
            ],
          },
          { id: 'footer', isSelectable: true, name: 'footer.tsx' },
        ],
      },
    ],
  },
];

const pillSx = {
  borderRadius: 999,
  px: { xs: 3, sm: 4 },
  py: 1.6,
  fontFamily: mono,
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
} as const;

export const Hero: React.FC<HeroProps> = ({ primaryLabel, onPrimary }) => {
  return (
    <Box
      component="section"
      data-testid="hero"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        minHeight: { xs: 'auto', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: heroInk.ground,
        color: heroInk.text,
        pt: { xs: 14, md: 16 },
        pb: { xs: 10, md: 12 },
      }}
    >
      {/* Background Images & Glows */}
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, zIndex: -2, pointerEvents: 'none' }}>
        {/* Cosmic Background Image overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/images/hero-cosmic.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.22,
            mixBlendMode: 'screen',
            animation: `${drift} 30s ease-in-out infinite`,
          }}
        />

        {/* Glowing Orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            left: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(91, 53, 201, 0.4) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '-5%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(31, 127, 184, 0.35) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </Box>

      {/* Main Grid: Title & Video Text (Left), File Tree (Right) */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1280,
          mx: 'auto',
          px: { xs: 2.5, sm: 4, md: 6 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.2fr 0.8fr' },
          gap: { xs: 6, lg: 5 },
          alignItems: 'center',
        }}
      >
        {/* Left Side: Hero Title, Video Text, Highlighter & Action Buttons */}
        <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
          {/* Live Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              px: 2,
              py: 0.9,
              mb: 3,
              border: `1px solid ${heroInk.line}`,
              borderRadius: 999,
              backgroundColor: 'rgba(238, 240, 255, 0.05)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: '#5fe3c8',
                animation: `${pulse} 2.4s ease-in-out infinite`,
              }}
            />
            <Typography
              component="span"
              sx={{
                fontFamily: mono,
                fontSize: 11.5,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: heroInk.textSoft,
              }}
            >
              Live on Midnight {NETWORK_ID === 'preprod' ? 'Preprod' : NETWORK_ID} · {TRACTION.testers} testers
            </Typography>
          </Box>

          {/* Magic UI VideoText Header Accent */}
          <Box sx={{ height: 45, width: '100%', maxWidth: 420, mx: { xs: 'auto', lg: 0 }, mb: 1.5, overflow: 'hidden' }}>
            <VideoText src="https://cdn.magicui.design/ocean-small.webm">
              <span style={{ fontSize: '1.8rem', letterSpacing: '0.1em', color: '#5fe3c8' }}>
                MIDNIGHT ZK PRIVACY
              </span>
            </VideoText>
          </Box>

          {/* Hero Main Headline with Highlighter */}
          <Typography
            component="h1"
            sx={{
              fontFamily: display,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: { xs: '3.2rem', sm: '4.8rem', md: '5.8rem', lg: '6.4rem' },
              lineHeight: 0.98,
              letterSpacing: '-0.025em',
              color: heroInk.text,
              mb: 3,
            }}
          >
            <Box component="span" sx={{ display: 'block' }}>
              Vote{' '}
              <Highlighter action="highlight" color="#5fe3c8">
                privately
              </Highlighter>
              .
            </Box>
            <Box component="span" sx={{ display: 'block', mt: 0.5 }}>
              Verify{' '}
              <Highlighter action="underline" color="#a9b4ff">
                publicly
              </Highlighter>
              .
            </Box>
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              fontFamily: mono,
              fontSize: { xs: 13.5, md: 15 },
              lineHeight: 1.8,
              color: heroInk.textSoft,
              maxWidth: 580,
              mx: { xs: 'auto', lg: 0 },
              mb: 4,
            }}
          >
            Anonymous, verifiable polls on the Midnight Network.
            <br />
            Ballots are encrypted, eligibility is proven in zero knowledge, and every result is checked on-chain.
          </Typography>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', lg: 'flex-start' },
              gap: 2,
              mb: 4,
            }}
          >
            <Button
              onClick={onPrimary}
              data-testid="hero-primary"
              sx={{
                ...pillSx,
                color: heroInk.ground,
                backgroundColor: '#ffffff',
                boxShadow: '0 0 25px rgba(255, 255, 255, 0.4)',
                '&:hover': { backgroundColor: '#5fe3c8', transform: 'translateY(-2px)' },
                transition: 'all 0.2s ease',
              }}
            >
              {primaryLabel}
            </Button>
            <Button
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<CodeIcon />}
              sx={{
                ...pillSx,
                color: heroInk.text,
                border: `1px solid ${heroInk.line}`,
                backgroundColor: 'rgba(238, 240, 255, 0.04)',
                backdropFilter: 'blur(8px)',
                '&:hover': { backgroundColor: 'rgba(238, 240, 255, 0.12)', borderColor: '#5fe3c8' },
              }}
            >
              View on GitHub
            </Button>
          </Box>

          {/* Feature Badges */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', lg: 'flex-start' },
              gap: 2.5,
            }}
          >
            {['Encrypted ballots', 'Zero-knowledge eligibility', 'On-chain tally'].map((item) => (
              <Typography
                key={item}
                component="span"
                sx={{
                  fontFamily: mono,
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: heroInk.textFaint,
                }}
              >
                ✦ {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Right Side: Magic UI FileTree Beside the Hero Title (Sleek Compact Size) */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 370,
              backgroundColor: 'rgba(9, 13, 26, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: 3.5,
              border: '1px solid rgba(95, 227, 200, 0.3)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(95, 227, 200, 0.12)',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                borderColor: 'rgba(95, 227, 200, 0.5)',
                transform: 'translateY(-3px)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(95, 227, 200, 0.2)',
              },
            }}
          >
            {/* Header bar of the FileTree card */}
            <Box
              sx={{
                px: 2,
                py: 1.25,
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <FolderIcon sx={{ color: '#38bdf8', fontSize: 16 }} />
                <Typography sx={{ fontFamily: mono, fontSize: 11.5, fontWeight: 700, color: '#f8fafc' }}>
                  BallotBox Architecture
                </Typography>
              </Box>
              <Chip
                label="Compact ZK"
                size="small"
                sx={{
                  backgroundColor: 'rgba(95, 227, 200, 0.15)',
                  color: '#5fe3c8',
                  fontFamily: mono,
                  fontSize: 9.5,
                  fontWeight: 700,
                  height: 20,
                }}
              />
            </Box>

            {/* Magic UI FileTree (Tree) Component */}
            <Box sx={{ p: 1.5, minHeight: 230, maxHeight: 260, overflowY: 'auto' }}>
              <Tree
                className="bg-transparent"
                initialSelectedId="button"
                initialExpandedItems={['src', 'app', 'components', 'ui', 'lib', 'contract']}
                elements={ELEMENTS}
              />
            </Box>

            {/* Footer of the FileTree card */}
            <Box
              sx={{
                px: 2,
                py: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{ fontFamily: mono, fontSize: 10, color: '#94a3b8' }}>
                ✦ ZK Contract Explorer
              </Typography>
              <Typography sx={{ fontFamily: mono, fontSize: 10, color: '#5fe3c8' }}>
                Midnight v4.1
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
