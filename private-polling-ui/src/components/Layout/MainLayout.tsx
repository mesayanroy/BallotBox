import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import { Header } from './Header';
import { BrandMark } from './BrandMark';
import { LINKS, NETWORK_ID, PRODUCT } from '../../config/product';
import { display, mono, tokens } from '../../config/theme';

const FooterLink: React.FC<React.PropsWithChildren<{ href: string; external?: boolean }>> = ({
  href,
  external = true,
  children,
}) => (
  <Link
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    underline="none"
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 0.5,
      fontSize: 13.5,
      fontFamily: mono,
      color: '#94a3b8',
      mb: 1.5,
      transition: 'color 0.2s ease, transform 0.2s ease',
      '&:hover': {
        color: '#5fe3c8',
        transform: 'translateX(3px)',
      },
    }}
  >
    {children}
    {external && <LaunchIcon sx={{ fontSize: 11, opacity: 0.7 }} />}
  </Link>
);

const FooterColumn: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Typography
      sx={{
        fontFamily: mono,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: '#5fe3c8',
        mb: 2.5,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

/**
 * Premium Dark Moonlight Footer
 * Features ZK light spectrum graphics, brand mark, midnight logo, and links.
 */
const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      position: 'relative',
      backgroundColor: '#050714',
      color: '#eef0ff',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      overflow: 'hidden',
    }}
  >
    {/* Ambient Prism Background Graphic Overlay - stretched across entire footer */}
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/images/hero-prism.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.18,
        mixBlendMode: 'screen',
        pointerEvents: 'none',
      }}
    />

    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2.5, md: 5 },
        pt: { xs: 6, md: 8 },
        pb: 5,
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Footer Main Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2.2fr 1fr 1fr 1fr' },
          gap: { xs: 5, md: 4 },
        }}
      >
        {/* Brand Column */}
        <Box sx={{ pr: { md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <BrandMark inverted />
            <Typography
              sx={{
                fontFamily: display,
                fontStyle: 'italic',
                fontSize: 28,
                letterSpacing: '-0.01em',
                color: '#ffffff',
                lineHeight: 1,
              }}
            >
              {PRODUCT.name}.
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: mono,
              fontSize: 13,
              color: '#94a3b8',
              lineHeight: 1.7,
              mb: 3,
              maxWidth: 320,
            }}
          >
            {PRODUCT.tagline}. Anonymous ballots, public arithmetic, zero compromise.
          </Typography>

          {/* Midnight Network Co-brand Badge */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              component="img"
              src="/midnight-logo.png"
              alt="Midnight Network"
              sx={{ height: 22, opacity: 0.85, filter: 'brightness(1.2)' }}
            />
            <Typography sx={{ fontFamily: mono, fontSize: 11, color: '#64748b' }}>Built on Midnight Network</Typography>
          </Box>
        </Box>

        {/* Product Column */}
        <FooterColumn title="Product">
          <FooterLink href="#features" external={false}>
            Features
          </FooterLink>
          <FooterLink href="#how-it-works" external={false}>
            ZK Workflow
          </FooterLink>
          <FooterLink href="#terminal" external={false}>
            Console Log
          </FooterLink>
          <FooterLink href="#app" external={false}>
            Live Poll App
          </FooterLink>
          <FooterLink href="#faq" external={false}>
            FAQ
          </FooterLink>
        </FooterColumn>

        {/* Resources Column */}
        <FooterColumn title="Resources">
          <FooterLink href={LINKS.userGuide}>User Guide</FooterLink>
          <FooterLink href={`${LINKS.github}/blob/main/PRIVACY.md`}>Privacy Model</FooterLink>
          <FooterLink href={`${LINKS.github}/blob/main/docs/ARCHITECTURE.md`}>Architecture</FooterLink>
          {LINKS.feedbackForm && <FooterLink href={LINKS.feedbackForm}>Give Feedback</FooterLink>}
        </FooterColumn>

        {/* Community Column */}
        <FooterColumn title="Community">
          <FooterLink href={LINKS.github}>
            <GitHubIcon sx={{ fontSize: 14, mr: 0.5 }} /> GitHub
          </FooterLink>
          {LINKS.x && (
            <FooterLink href={LINKS.x}>
              <XIcon sx={{ fontSize: 14, mr: 0.5 }} /> X / Twitter
            </FooterLink>
          )}
          <FooterLink href={LINKS.midnight}>Midnight Network</FooterLink>
        </FooterColumn>
      </Box>

      {/* Bottom Sub-Footer Bar */}
      <Box
        sx={{
          mt: { xs: 6, md: 8 },
          pt: 3,
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Typography sx={{ fontFamily: mono, fontSize: 12, color: '#64748b' }}>
          © {new Date().getFullYear()} {PRODUCT.name} · Apache-2.0 License · Built on Midnight Blockchain
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography sx={{ fontFamily: mono, fontSize: 11, color: '#5fe3c8' }}>
            ✦ Preprod Network ID: {NETWORK_ID}
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

/** Page shell: sticky header, the landing sections and app passed in as children, premium footer. */
export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Box id="top" sx={{ minHeight: '100vh', backgroundColor: tokens.paper, display: 'flex', flexDirection: 'column' }}>
    <Header />
    <Box component="main" sx={{ flex: 1 }}>
      {children}
    </Box>
    <Footer />
  </Box>
);
