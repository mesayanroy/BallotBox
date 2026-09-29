import React from 'react';
import { Box, Typography } from '@mui/material';
import { Terminal, TypingAnimation, AnimatedSpan } from '../../registry/magicui/terminal';
import { display, mono } from '../../config/theme';
import { Highlighter } from '../../registry/magicui/highlighter';

export const TerminalSection: React.FC = () => {
  return (
    <Box
      component="section"
      id="terminal"
      data-testid="terminal-section"
      sx={{
        py: { xs: 8, md: 11 },
        px: { xs: 2.5, md: 5 },
        backgroundColor: '#070918',
        color: '#eef0ff',
        borderTop: '1px solid rgba(238, 240, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background visual glow */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(95, 227, 200, 0.15) 0%, rgba(7, 9, 24, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ maxWidth: 1000, mx: 'auto', position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            sx={{
              fontFamily: mono,
              fontSize: 11.5,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#5fe3c8',
              mb: 1.5,
            }}
          >
            ✦ Developer Console & Proof Log
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontFamily: display,
              fontStyle: 'italic',
              fontSize: { xs: '2.2rem', sm: '3.2rem', md: '3.8rem' },
              lineHeight: 1.08,
              mb: 2,
              color: '#ffffff',
            }}
          >
            Zero-Knowledge Execution in{' '}
            <Highlighter action="underline" color="#5fe3c8">
              Real Time
            </Highlighter>
          </Typography>

          <Typography
            sx={{
              fontFamily: mono,
              fontSize: { xs: 13, md: 14.5 },
              color: '#a8aed3',
              maxWidth: 620,
              mx: 'auto',
            }}
          >
            Inspect how BallotBox creates zero-knowledge proofs locally in your browser and registers state updates on Midnight.
          </Typography>
        </Box>

        {/* The Magic UI Terminal Component */}
        <Terminal title="midnight-zk-prover v4.1 — bash">
          <TypingAnimation delay={0}>$ midnight-cli connect --network preprod</TypingAnimation>

          <AnimatedSpan delay={700} className="text-blue-500">
            ✔ Connected to Midnight Preprod (Chain ID: 4173) | Node rpc.preprod.midnight.network
          </AnimatedSpan>

          <TypingAnimation delay={1500}>$ ballotbox poll info --id 0x4e29b</TypingAnimation>

          <AnimatedSpan delay={2200} className="text-purple-400">
            [Poll #0x4e29b] "Protocol Governance 2026" | Deadline: Block #1,048,500 | Quorum: 50 voters
          </AnimatedSpan>

          <TypingAnimation delay={3000}>$ zk-prover generate-proof --ballot encrypted_vote.json</TypingAnimation>

          <AnimatedSpan delay={3800} className="text-cyan-400">
            [ZK-Engine] Building Halo2 zero-knowledge circuit for eligibility & homomorphic ballot encryption...
          </AnimatedSpan>

          <AnimatedSpan delay={4600} className="text-green-500">
            ✔ Proof generated in 842ms | Zero privacy leaks | Circuit verifier: PASS
          </AnimatedSpan>

          <TypingAnimation delay={5400}>$ ballotbox vote submit --proof zk_proof.bin</TypingAnimation>

          <AnimatedSpan delay={6200} className="text-green-500">
            ✔ Transaction broadcasted to Midnight Ledger | Tx Hash: 0x8aef72...94b1 (Status: CONFIRMED)
          </AnimatedSpan>
        </Terminal>

        {/* Footnote */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3, flexWrap: 'wrap' }}>
          <Typography sx={{ fontFamily: mono, fontSize: 11, color: '#64748b' }}>
            ✦ Prover Engine: Midnight Compact Runtime
          </Typography>
          <Typography sx={{ fontFamily: mono, fontSize: 11, color: '#64748b' }}>
            ✦ Circuit Constraints: 14,280 gates
          </Typography>
          <Typography sx={{ fontFamily: mono, fontSize: 11, color: '#64748b' }}>
            ✦ Verification Time: &lt; 50ms
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
