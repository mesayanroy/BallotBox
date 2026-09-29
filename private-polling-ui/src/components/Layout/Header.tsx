import React, { useEffect, useState } from 'react';
import { AppBar, Box, IconButton, Link, Tooltip, Typography, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { WalletConnectButton } from '../WalletConnectButton';
import { BrandMark } from './BrandMark';
import { heroInk } from '../landing/Hero';
import { LINKS, NETWORK_ID, PRODUCT } from '../../config/product';
import { display, mono, tokens } from '../../config/theme';

const NAV: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#how-it-works' },
  { label: 'Console', href: '#terminal' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Live Poll', href: '#app' },
];

const useOverHero = (): boolean => {
  const [over, setOver] = useState(true);
  useEffect(() => {
    const update = () => {
      const hero = document.querySelector('[data-testid="hero"]');
      setOver(hero ? hero.getBoundingClientRect().bottom > 80 : false);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return over;
};

export const Header: React.FC = () => {
  const dark = useOverHero();
  const ink = dark ? heroInk.text : tokens.ink;
  const soft = dark ? heroInk.textSoft : tokens.inkMuted;
  const line = dark ? heroInk.line : tokens.rule;
  const [mobileOpen, setMobileOpen] = useState(false);

  const iconLinkSx = {
    color: soft,
    '&:hover': { color: ink, backgroundColor: 'transparent' },
    display: { xs: 'none', sm: 'inline-flex' },
  } as const;

  return (
    <>
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
          maxWidth: 1140,
          zIndex: (theme) => theme.zIndex.appBar,
          backgroundColor: dark ? 'rgba(7, 9, 24, 0.45)' : `${tokens.surface}e0`,
          backdropFilter: 'saturate(1.4) blur(16px)',
          backgroundImage: 'none',
          border: `1px solid ${line}`,
          borderRadius: 999,
          boxShadow: dark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 6px 24px rgba(16, 19, 43, 0.06)',
          transition: 'all 0.35s ease',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          pl: { xs: 2, md: 3 },
          pr: { xs: 1, md: 1.25 },
          py: 1,
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, minWidth: 0 }}>
          <Link href="#top" underline="none" sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
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
        </Box>

        <Box
          component="nav"
          aria-label="Sections"
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 3.5,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {NAV.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              underline="none"
              sx={{
                fontFamily: mono,
                fontSize: 11.5,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: soft,
                transition: 'color 0.2s',
                '&:hover': { color: '#5fe3c8' },
              }}
            >
              {label}
            </Link>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography
            sx={{
              fontFamily: mono,
              fontSize: 10.5,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#5fe3c8',
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
            <Tooltip title={`${PRODUCT.name} on X`}>
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
                  '&:hover': { backgroundColor: 'rgba(238, 240, 255, 0.16)', borderColor: '#5fe3c8' },
                }),
              },
            }}
          >
            <WalletConnectButton networkId={NETWORK_ID} />
          </Box>

          <IconButton
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ display: { xs: 'inline-flex', md: 'none' }, color: ink }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </AppBar>

      {/* Mobile Nav Drawer */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: '#070918',
              color: '#eef0ff',
              pt: 10,
              pb: 4,
              px: 3,
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            },
          },
        }}
      >
        <List>
          {NAV.map(({ label, href }) => (
            <ListItem key={href} disablePadding>
              <ListItemButton
                component="a"
                href={href}
                onClick={() => setMobileOpen(false)}
                sx={{ py: 1.5 }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: mono,
                        fontSize: 14,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#eef0ff',
                      }}
                    >
                      {label}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
