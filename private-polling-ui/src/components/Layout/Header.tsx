import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppBar, Box, IconButton, Link, Tooltip, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { WalletConnectButton } from '../WalletConnectButton';
import { BrandMark } from './BrandMark';
import { heroInk } from '../landing/Hero';
import { LINKS, NETWORK_ID, PRODUCT } from '../../config/product';
import { display, mono, tokens } from '../../config/theme';

const accent = '#5fe3c8';

/** Sections in page order; the strip scrolls horizontally when they don't fit. */
const NAV: ReadonlyArray<{ label: string; id: string }> = [
  { label: 'Live App', id: 'app' },
  { label: 'Toolkit', id: 'toolkit' },
  { label: 'Features', id: 'features' },
  { label: 'Workflow', id: 'how-it-works' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Console', id: 'terminal' },
];

/** Tracks whether the header sits over the dark hero, which section is in view, and page scroll progress. */
const useScrollState = (): { overHero: boolean; activeId: string | undefined; progress: number } => {
  const [state, setState] = useState<{ overHero: boolean; activeId: string | undefined; progress: number }>({
    overHero: true,
    activeId: undefined,
    progress: 0,
  });
  useEffect(() => {
    const update = () => {
      const hero = document.querySelector('[data-testid="hero"]');
      const overHero = hero ? hero.getBoundingClientRect().bottom > 80 : false;
      let activeId: string | undefined;
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) activeId = id;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setState({ overHero, activeId, progress });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return state;
};

/** Horizontally scrollable section strip with edge arrows and an active-section pill. */
const NavStrip: React.FC<{ dark: boolean; activeId: string | undefined }> = ({ dark, activeId }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const soft = dark ? heroInk.textSoft : tokens.inkMuted;
  const ink = dark ? heroInk.text : tokens.ink;

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // Keep the active pill visible inside the strip as the page scrolls.
  useEffect(() => {
    const track = trackRef.current;
    const pill = activeId ? track?.querySelector<HTMLElement>(`[data-nav="${activeId}"]`) : null;
    if (track && pill) {
      const target = pill.offsetLeft - (track.clientWidth - pill.offsetWidth) / 2;
      track.scrollTo({ left: target, behavior: 'smooth' });
    }
  }, [activeId]);

  const nudge = (dir: 1 | -1) => trackRef.current?.scrollBy({ left: dir * 160, behavior: 'smooth' });

  const arrowSx = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    p: 0.25,
    color: ink,
    backgroundColor: dark ? 'rgba(7, 9, 24, 0.85)' : `${tokens.surface}f0`,
    border: `1px solid ${dark ? heroInk.line : tokens.rule}`,
    '&:hover': { color: accent, backgroundColor: dark ? 'rgba(7, 9, 24, 0.95)' : tokens.surface },
  } as const;

  return (
    <Box sx={{ position: 'relative', minWidth: 0, flex: 1 }}>
      {edges.left && (
        <IconButton
          aria-label="Scroll sections left"
          size="small"
          onClick={() => nudge(-1)}
          sx={{ ...arrowSx, left: 0 }}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
      )}
      <Box
        ref={trackRef}
        component="nav"
        aria-label="Sections"
        onScroll={measure}
        sx={{
          display: 'flex',
          gap: 0.5,
          overflowX: 'auto',
          scrollSnapType: 'x proximity',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          px: 0.5,
          py: 0.25,
          maskImage: `linear-gradient(to right, ${edges.left ? 'transparent' : '#000'} 0, #000 28px, #000 calc(100% - 28px), ${
            edges.right ? 'transparent' : '#000'
          } 100%)`,
        }}
      >
        {NAV.map(({ label, id }) => {
          const active = id === activeId;
          return (
            <Link
              key={id}
              href={`#${id}`}
              data-nav={id}
              underline="none"
              aria-current={active ? 'location' : undefined}
              sx={{
                flexShrink: 0,
                scrollSnapAlign: 'center',
                fontFamily: mono,
                fontSize: 11.5,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                px: 1.5,
                py: 0.75,
                borderRadius: 999,
                color: active ? (dark ? '#070918' : tokens.surface) : soft,
                backgroundColor: active ? (dark ? accent : tokens.ink) : 'transparent',
                transition: 'color 0.2s, background-color 0.25s',
                '&:hover': { color: active ? undefined : accent },
              }}
            >
              {label}
            </Link>
          );
        })}
      </Box>
      {edges.right && (
        <IconButton
          aria-label="Scroll sections right"
          size="small"
          onClick={() => nudge(1)}
          sx={{ ...arrowSx, right: 0 }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export const Header: React.FC = () => {
  const { overHero: dark, activeId, progress } = useScrollState();
  const ink = dark ? heroInk.text : tokens.ink;
  const soft = dark ? heroInk.textSoft : tokens.inkMuted;
  const line = dark ? heroInk.line : tokens.rule;

  const iconLinkSx = {
    color: soft,
    '&:hover': { color: ink, backgroundColor: 'transparent' },
    display: { xs: 'none', sm: 'inline-flex' },
  } as const;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      data-testid="header"
      sx={{
        top: { xs: 10, md: 16 },
        left: '50%',
        right: 'auto',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 24px)',
        maxWidth: 1180,
        zIndex: (theme) => theme.zIndex.appBar,
        backgroundColor: dark ? 'rgba(7, 9, 24, 0.55)' : `${tokens.surface}e6`,
        backdropFilter: 'saturate(1.4) blur(16px)',
        backgroundImage: 'none',
        border: `1px solid ${line}`,
        borderRadius: { xs: 4, md: 999 },
        boxShadow: dark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 6px 24px rgba(16, 19, 43, 0.06)',
        transition: 'background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr auto', md: 'auto minmax(0, 1fr) auto' },
        gridTemplateAreas: { xs: '"brand actions" "nav nav"', md: '"brand nav actions"' },
        alignItems: 'center',
        columnGap: 2,
        rowGap: 0.75,
        pl: { xs: 1.5, md: 2 },
        pr: { xs: 1, md: 1.25 },
        py: 1,
      }}
    >
      <Link href="#top" underline="none" sx={{ gridArea: 'brand', display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <BrandMark inverted={dark} />
        <Typography
          sx={{
            fontFamily: display,
            fontStyle: 'italic',
            fontSize: 24,
            letterSpacing: '-0.01em',
            color: ink,
            lineHeight: 1,
            transition: 'color 0.35s',
          }}
        >
          {PRODUCT.name}.
        </Typography>
      </Link>

      <Box sx={{ gridArea: 'nav', display: 'flex', minWidth: 0 }}>
        <NavStrip dark={dark} activeId={activeId} />
      </Box>

      <Box sx={{ gridArea: 'actions', display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography
          sx={{
            fontFamily: mono,
            fontSize: 10.5,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: accent,
            border: `1px solid ${line}`,
            borderRadius: 999,
            px: 1.25,
            py: 0.4,
            mr: 0.5,
            display: { xs: 'none', lg: 'block' },
          }}
        >
          {NETWORK_ID}
        </Typography>

        <Tooltip title="User guide">
          <IconButton component="a" href={LINKS.userGuide} target="_blank" rel="noopener noreferrer" sx={iconLinkSx}>
            <MenuBookIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {LINKS.x && (
          <Tooltip title={`${LINKS.xHandle} on X`}>
            <IconButton component="a" href={LINKS.x} target="_blank" rel="noopener noreferrer" sx={iconLinkSx}>
              <XIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Source code">
          <IconButton component="a" href={LINKS.github} target="_blank" rel="noopener noreferrer" sx={iconLinkSx}>
            <GitHubIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Box
          sx={{
            ml: 0.5,
            '& .MuiButton-root': {
              borderRadius: 999,
              ...(dark && {
                color: heroInk.text,
                borderColor: heroInk.line,
                backgroundColor: 'rgba(238, 240, 255, 0.08)',
                '&:hover': { backgroundColor: 'rgba(238, 240, 255, 0.16)', borderColor: accent },
              }),
            },
          }}
        >
          <WalletConnectButton networkId={NETWORK_ID} />
        </Box>
      </Box>

      {/* Page scroll progress */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: 2,
          width: '100%',
          transformOrigin: 'left',
          transform: `scaleX(${progress})`,
          background: `linear-gradient(90deg, ${accent}, #8b93ff)`,
          transition: 'transform 0.1s linear',
        }}
      />
    </AppBar>
  );
};
