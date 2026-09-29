import React, { useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import KeyIcon from '@mui/icons-material/Key';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { display, mono, tokens } from '../../config/theme';
import { Highlighter } from '../../registry/magicui/highlighter';

const STEPS = [
  {
    id: 'create',
    num: '01',
    title: 'Create & Configure Poll',
    tagline: 'Organizer sets governance parameters',
    icon: <ShieldOutlinedIcon />,
    color: '#5fe3c8',
    description:
      'The organizer defines the poll question, voting window deadline, quorum threshold, and voter eligibility rules. Compact ZK smart contracts are automatically deployed to Midnight.',
    details: [
      'Deploys Compact ZK verifier contract on Midnight Preprod',
      'Configures threshold key setup for designated trustees',
      'Generates unique invite link and QR code for voters',
    ],
    codeSnippet: `// Compact ZK Smart Contract
export circuit createPoll(
  question: Bytes[64],
  deadline: Uint64,
  quorum: Uint32
): ContractAddress {
  return deployVerifier(question, deadline);
}`,
  },
  {
    id: 'enrol',
    num: '02',
    title: 'Enrol & Key Registration',
    tagline: 'Voters join & trustees publish key shares',
    icon: <KeyIcon />,
    color: '#38bdf8',
    description:
      'Voters enroll into the eligibility set with one click. Trustees publish public key shares for homomorphic ballot encryption, ensuring no single entity can decrypt individual votes.',
    details: [
      'Voters generate local ZK credential secrets stored in browser',
      'Trustees run DKG (Distributed Key Generation) setup',
      'Eligibility tree is updated on-chain without exposing identities',
    ],
    codeSnippet: `// Trustee Share Registration
const share = await trusteeKeyGen();
await contract.registerPublicKeyShare(share.pubKey);
console.log("Trustee share registered!");`,
  },
  {
    id: 'vote',
    num: '03',
    title: 'ZK-Prove & Cast Ballot',
    tagline: 'Local proof generation in browser',
    icon: <HowToVoteIcon />,
    color: '#a9b4ff',
    description:
      'When casting a ballot, your browser and local proof server generate a Zero-Knowledge Proof (ZKP). It proves you are an eligible voter and your ballot is valid without revealing your vote.',
    details: [
      'Ballot is homomorphically encrypted with threshold public key',
      'ZK proof guarantees 1 voter = 1 vote without revealing identity',
      'Anti-coercion re-voting allows changing vote prior to deadline',
    ],
    codeSnippet: `// Local ZK Prover execution
const proof = await zkProver.generateProof({
  voterSecret: localKey,
  choice: encryptedVote,
});
await contract.castBallot(proof, encryptedVote);`,
  },
  {
    id: 'verify',
    num: '04',
    title: 'Threshold Tally & On-Chain Verification',
    tagline: 'Math-proven tally checked by contract',
    icon: <AssessmentIcon />,
    color: '#f472b6',
    description:
      'After the deadline, trustees collaborate to compute partial decryption shares for ONLY the aggregated sum. The Midnight contract verifies the math on-chain before publishing the final result.',
    details: [
      'Trustees decrypt only total aggregate tally',
      'Individual votes remain permanently encrypted forever',
      'Anyone can re-verify the tally proof independently',
    ],
    codeSnippet: `// On-chain Tally Verification
const isValidTally = await contract.verifyTallyProof(
  aggregatedEncryptedSum,
  decryptedResult
);
assert(isValidTally, "Tally math verified!");`,
  },
];

export const WorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep];

  return (
    <Box
      component="section"
      id="how-it-works"
      data-testid="workflow-section"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2.5, md: 5 },
        backgroundColor: '#070918',
        color: '#eef0ff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glowing visuals using uploaded ribbon image */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '600px',
          backgroundImage: 'url(/images/hero-ribbon.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          opacity: 0.25,
          pointerEvents: 'none',
          filter: 'blur(20px)',
        }}
      />

      <Box sx={{ maxWidth: 1180, mx: 'auto', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto', mb: { xs: 6, md: 8 } }}>
          <Typography
            sx={{
              fontFamily: mono,
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#5fe3c8',
              mb: 1.5,
            }}
          >
            ✦ End-To-End ZK Workflow
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontFamily: display,
              fontStyle: 'italic',
              fontSize: { xs: '2.5rem', sm: '3.6rem', md: '4.2rem' },
              lineHeight: 1.05,
              mb: 2.5,
              color: '#ffffff',
            }}
          >
            How BallotBox guarantees{' '}
            <Highlighter action="highlight" color="#5fe3c8">
              complete privacy
            </Highlighter>
          </Typography>

          <Typography
            sx={{
              fontFamily: mono,
              fontSize: { xs: 13.5, md: 15 },
              color: '#a8aed3',
              lineHeight: 1.7,
            }}
          >
            From poll creation to final tally verification, zero-knowledge cryptography protects every single step.
          </Typography>
        </Box>

        {/* Workflow Navigation Steps */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 2,
            mb: 5,
          }}
        >
          {STEPS.map((step, idx) => {
            const isActive = idx === activeStep;
            return (
              <Box
                key={step.id}
                onClick={() => setActiveStep(idx)}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  backgroundColor: isActive ? 'rgba(238, 240, 255, 0.08)' : 'rgba(238, 240, 255, 0.02)',
                  border: `1px solid ${isActive ? step.color : 'rgba(238, 240, 255, 0.1)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? `0 0 20px ${step.color}22` : 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(238, 240, 255, 0.06)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography
                    sx={{
                      fontFamily: mono,
                      fontSize: 11,
                      fontWeight: 700,
                      color: step.color,
                      letterSpacing: '0.1em',
                    }}
                  >
                    STEP {step.num}
                  </Typography>
                  <Box
                    sx={{
                      color: step.color,
                      display: 'flex',
                      alignItems: 'center',
                      '& svg': { fontSize: 20 },
                    }}
                  >
                    {step.icon}
                  </Box>
                </Box>

                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: isActive ? '#ffffff' : '#cbd5e1',
                    mb: 0.5,
                  }}
                >
                  {step.title}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: mono,
                    fontSize: 11,
                    color: '#94a3b8',
                  }}
                >
                  {step.tagline}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Active Step Showcase Card */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.2fr 1fr' },
            gap: 4,
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: `1px solid ${current.color}44`,
            backdropFilter: 'blur(16px)',
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${current.color}15`,
          }}
        >
          {/* Left Details */}
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Chip
                label={`STAGE ${current.num}`}
                size="small"
                sx={{
                  backgroundColor: `${current.color}22`,
                  color: current.color,
                  border: `1px solid ${current.color}66`,
                  fontFamily: mono,
                  fontWeight: 700,
                  fontSize: 11,
                }}
              />
              <Typography sx={{ fontFamily: mono, fontSize: 12, color: '#94a3b8' }}>
                Midnight Protocol Engine
              </Typography>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#ffffff',
                mb: 2,
                fontSize: { xs: '1.5rem', md: '1.9rem' },
              }}
            >
              {current.title}
            </Typography>

            <Typography
              sx={{
                color: '#cbd5e1',
                fontSize: { xs: 14, md: 15 },
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              {current.description}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
              {current.details.map((item, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                  <CheckCircleIcon sx={{ color: current.color, fontSize: 18, mt: 0.2 }} />
                  <Typography sx={{ fontSize: 13.5, color: '#e2e8f0', lineHeight: 1.5 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => setActiveStep((prev) => (prev + 1) % STEPS.length)}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: current.color,
                  color: '#070918',
                  fontWeight: 700,
                  fontFamily: mono,
                  px: 3,
                  py: 1.2,
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    boxShadow: `0 0 20px ${current.color}`,
                  },
                }}
              >
                Next Workflow Step
              </Button>
            </Box>
          </Box>

          {/* Right Code/Image Preview */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {/* Image visual badge matching the step */}
            <Box
              sx={{
                position: 'relative',
                height: '180px',
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box
                component="img"
                src={activeStep % 2 === 0 ? '/images/hero-prism.png' : '/images/hero-atomic.png'}
                alt="ZK Process Visual"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.85) contrast(1.1)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(9, 13, 22, 0.9), transparent)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  p: 2,
                }}
              >
                <Typography sx={{ fontFamily: mono, fontSize: 11, color: '#5fe3c8' }}>
                  ✦ Cryptographic Proof Verification Visual
                </Typography>
              </Box>
            </Box>

            {/* Code Snippet Box */}
            <Box
              sx={{
                backgroundColor: '#04060f',
                p: 2.5,
                borderRadius: 3,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: mono,
                fontSize: 12,
                color: '#38bdf8',
                overflowX: 'auto',
              }}
            >
              <Typography sx={{ fontSize: 10, color: '#64748b', mb: 1, textTransform: 'uppercase' }}>
                // Compact ZK Smart Contract Code
              </Typography>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {current.codeSnippet}
              </pre>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
