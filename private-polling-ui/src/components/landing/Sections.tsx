import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LINKS } from '../../config/product';
import { microLabelSx, mono, display, tokens } from '../../config/theme';
import { Section } from './Section';
import { Highlighter } from '../../registry/magicui/highlighter';

// ─── Features ────────────────────────────────────────────────────────────────

const FEATURES: ReadonlyArray<{ icon: React.ReactNode; title: string; desc: string; badge?: string }> = [
  {
    icon: <LockOutlinedIcon />,
    title: 'Secret ballots',
    desc: 'Your choice is encrypted in your browser before it is sent. Nobody can read an individual ballot, including the organizer.',
    badge: 'AES-GCM-ZKP',
  },
  {
    icon: <VisibilityOffOutlinedIcon />,
    title: 'Anonymous eligibility',
    desc: 'A zero-knowledge proof shows you are on the voter roll without revealing which voter you are.',
    badge: 'Halo2 Proofs',
  },
  {
    icon: <VerifiedOutlinedIcon />,
    title: 'Verified results',
    desc: 'The published counts are re-encrypted and checked on-chain against the ballots. Anyone can re-verify.',
    badge: 'On-chain Tally',
  },
  {
    icon: <KeyOutlinedIcon />,
    title: 'No single party can decrypt',
    desc: 'Every trustee must contribute a share before the total opens, and only the total is ever opened.',
    badge: 'Threshold Crypto',
  },
  {
    icon: <ReplayOutlinedIcon />,
    title: 'Anti-coercion re-voting',
    desc: 'Re-voting replaces your earlier ballot, so a receipt you were pressured to show proves nothing.',
    badge: 'Coercion Free',
  },
  {
    icon: <TimerOutlinedIcon />,
    title: 'Deadlines and quorum',
    desc: 'Voting closes on an on-chain deadline, and a poll that misses quorum is flagged as non-binding.',
    badge: 'Smart Timers',
  },
  {
    icon: <LinkOutlinedIcon />,
    title: 'Open or invite-only',
    desc: 'Share one link. Public polls let people join with a click; binding votes use an organizer-managed roll.',
    badge: 'Flexible Access',
  },
  {
    icon: <BackupOutlinedIcon />,
    title: 'Key backup and restore',
    desc: 'Your poll key survives reloads, and can be exported or restored on another device.',
    badge: 'Browser Persist',
  },
];

export const Features: React.FC = () => (
  <Section
    id="features"
    testId="features"
    eyebrow="Features"
    title="Everything a private vote needs, and nothing to trust"
    intro="BallotBox runs on Midnight, where contracts can compute over private data. Privacy and verifiability come from the protocol, not from a promise."
  >
    {/* Featured Security Banner displaying uploaded atomic ZK image */}
    <Box
      sx={{
        mb: 6,
        borderRadius: 4,
        overflow: 'hidden',
        border: `1px solid ${tokens.ruleStrong}`,
        backgroundColor: '#070918',
        color: '#eef0ff',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr' },
        alignItems: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
      }}
    >
      <Box sx={{ p: { xs: 4, md: 6 } }}>
        <Chip
          label="ZERO-KNOWLEDGE PROTOCOL ENGINE"
          size="small"
          sx={{
            backgroundColor: 'rgba(95, 227, 200, 0.15)',
            color: '#5fe3c8',
            fontFamily: mono,
            fontSize: 10,
            fontWeight: 700,
            mb: 2,
          }}
        />
        <Typography
          variant="h3"
          sx={{
            fontFamily: display,
            fontStyle: 'italic',
            fontSize: { xs: '2rem', md: '2.8rem' },
            lineHeight: 1.1,
            mb: 2,
            color: '#ffffff',
          }}
        >
          Protected by{' '}
          <Highlighter action="highlight" color="#5fe3c8">
            Midnight ZK Proofs
          </Highlighter>
        </Typography>
        <Typography sx={{ fontFamily: mono, fontSize: 13.5, color: '#a8aed3', lineHeight: 1.7 }}>
          Your ballot parameters never touch a central server unencrypted. Midnight’s Compact ZK circuits prove voter
          eligibility locally before committing transactions on-chain.
        </Typography>
      </Box>

      <Box
        sx={{
          height: { xs: 220, md: '100%' },
          minHeight: 250,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src="/images/hero-atomic.png"
          alt="Zero Knowledge Atomic Core"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.9) contrast(1.15)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #070918 0%, transparent 40%)',
          }}
        />
      </Box>
    </Box>

    {/* Feature Cards Grid */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 2.5,
      }}
    >
      {FEATURES.map(({ icon, title, desc, badge }) => (
        <Box
          key={title}
          sx={{
            p: 3.5,
            border: `1px solid ${tokens.rule}`,
            borderRadius: 3,
            backgroundColor: tokens.surface,
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
            '&:hover': {
              borderColor: '#5fe3c8',
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 30px rgba(16, 19, 43, 0.08)',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                backgroundColor: tokens.sunken,
                color: tokens.ink,
                '& svg': { fontSize: 22 },
              }}
            >
              {icon}
            </Box>
            {badge && (
              <Typography
                sx={{
                  fontFamily: mono,
                  fontSize: 10,
                  fontWeight: 700,
                  color: tokens.inkMuted,
                  backgroundColor: tokens.sunken,
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                }}
              >
                {badge}
              </Typography>
            )}
          </Box>
          <Typography variant="body1" sx={{ fontWeight: 700, mb: 1, fontSize: 16 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: tokens.inkMuted, lineHeight: 1.65, fontSize: 13.5 }}>
            {desc}
          </Typography>
        </Box>
      ))}
    </Box>
  </Section>
);

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: 'Can the organizer see my vote?',
    a: "No. Ballots are encrypted to a key that needs every trustee's share, and even then only the total is opened. Individual ballots are never decrypted.",
  },
  {
    q: 'Can someone see that I voted?',
    a: 'Anyone can see how many ballots were cast, but not which enrolled voter cast one. Someone watching your internet connection could see that you sent a transaction; use a VPN or Tor if that matters to you.',
  },
  {
    q: 'Why does voting take a minute or two?',
    a: 'Your browser and proof server build a zero-knowledge proof that you are eligible and that your encrypted ballot is valid, without revealing either. That work is what keeps the vote private.',
  },
  {
    q: 'What do I need to get started?',
    a: 'A Midnight wallet (Lace or 1AM) on Preprod, free tNIGHT from the faucet to generate DUST for fees, and a proof server — hosted in your wallet settings or run locally with Docker.',
  },
  {
    q: 'Does checking in as a tester link my wallet to my vote?',
    a: 'No. The tester list is a separate on-chain set. No voting step reads or writes it, and it stores your wallet key, not anything derived from your ballot credential.',
  },
  {
    q: 'I cleared my browser and lost my role. What now?',
    a: 'Restore your key backup with the key button on the poll. Without a backup, a new key is created and the old role cannot be recovered.',
  },
];

export const Faq: React.FC = () => (
  <Section id="faq" testId="faq" eyebrow="FAQ" title="Questions people ask first">
    <Box sx={{ maxWidth: 840 }}>
      {FAQS.map(({ q, a }) => (
        <Accordion
          key={q}
          disableGutters
          square
          sx={{
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: `1px solid ${tokens.rule}`,
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, py: 1.5 }}>
            <Typography variant="body1" sx={{ fontWeight: 700, fontSize: 16 }}>
              {q}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pt: 0, pb: 2.5 }}>
            <Typography variant="body2" sx={{ color: tokens.inkSecondary, lineHeight: 1.7, fontSize: 14 }}>
              {a}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  </Section>
);

// ─── Closing call to action ──────────────────────────────────────────────────

export const CtaBand: React.FC<{ readonly primaryLabel: string; readonly onPrimary: () => void }> = ({
  primaryLabel,
  onPrimary,
}) => (
  <Box component="section" data-testid="cta" sx={{ px: { xs: 2.5, md: 5 }, pb: { xs: 7, md: 11 } }}>
    <Box
      sx={{
        maxWidth: 1180 - 80,
        mx: 'auto',
        backgroundColor: tokens.ink,
        borderRadius: 4,
        px: { xs: 3, md: 7 },
        py: { xs: 5, md: 7 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        gap: 3,
        boxShadow: '0 20px 40px rgba(16, 19, 43, 0.2)',
      }}
    >
      <Box sx={{ maxWidth: 560 }}>
        <Typography sx={{ ...microLabelSx, color: '#5fe3c8', mb: 1.5 }}>Try it in five minutes</Typography>
        <Typography
          variant="h3"
          component="h2"
          sx={{ color: tokens.surface, fontSize: { xs: '1.8rem', md: '2.4rem' }, lineHeight: 1.12 }}
        >
          Cast a private ballot on Midnight today.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={onPrimary}
          sx={{
            px: 3.5,
            py: 1.4,
            backgroundColor: '#5fe3c8',
            color: '#070918',
            fontWeight: 700,
            '&:hover': { backgroundColor: '#ffffff' },
          }}
        >
          {primaryLabel}
        </Button>
        <Button
          variant="outlined"
          size="large"
          href={LINKS.userGuide}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            px: 3,
            py: 1.4,
            color: tokens.surface,
            borderColor: tokens.inkMuted,
            '&:hover': { borderColor: tokens.surface },
          }}
        >
          Read the guide
        </Button>
      </Box>
    </Box>
  </Box>
);
