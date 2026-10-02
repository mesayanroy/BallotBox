import React, { useState } from 'react';
import { Box, Button, Collapse, Link, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import { FEATURED_CONTRACT_ADDRESS, LINKS } from '../config/product';
import { microLabelSx, mono, tokens } from '../config/theme';

const accent = '#5fe3c8';

const Code: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Box
    component="code"
    sx={{
      fontFamily: mono,
      fontSize: 11,
      color: tokens.ink,
      backgroundColor: tokens.sunken,
      px: 0.75,
      py: 0.15,
      borderRadius: 1,
      wordBreak: 'break-all',
    }}
  >
    {children}
  </Box>
);

const Step: React.FC<React.PropsWithChildren<{ n: number; title: string }>> = ({ n, title, children }) => (
  <Box sx={{ display: 'flex', gap: 1.5, mb: 1.75 }}>
    <Box
      sx={{
        flexShrink: 0,
        width: 22,
        height: 22,
        mt: '1px',
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        fontFamily: mono,
        fontSize: 11,
        fontWeight: 700,
        color: tokens.ink,
        border: `1px solid ${tokens.ruleStrong}`,
      }}
    >
      {n}
    </Box>
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 700, color: tokens.ink }}>
        {title}
      </Typography>
      <Typography variant="caption" component="div" sx={{ color: tokens.inkMuted, lineHeight: 1.6 }}>
        {children}
      </Typography>
    </Box>
  </Box>
);

const Row: React.FC<{ label: string; value: React.ReactNode; tone?: 'private' | 'public' }> = ({
  label,
  value,
  tone,
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      gap: 2,
      py: 0.9,
      borderBottom: `1px dashed ${tokens.rule}`,
      '&:last-of-type': { borderBottom: 'none' },
    }}
  >
    <Typography variant="caption" sx={{ color: tokens.inkSecondary, lineHeight: 1.5 }}>
      {label}
    </Typography>
    <Typography
      variant="caption"
      sx={{
        flexShrink: 0,
        fontFamily: mono,
        fontWeight: 700,
        color: tone === 'private' ? tokens.affirm : tone === 'public' ? tokens.info : tokens.ink,
      }}
    >
      {value}
    </Typography>
  </Box>
);

/** A collapsible card in the same style as the "New here?" checklist. */
const ToolkitCard: React.FC<
  React.PropsWithChildren<{ icon: React.ReactNode; title: string; tag: string; defaultOpen?: boolean }>
> = ({ icon, title, tag, defaultOpen = true, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Box
      sx={{
        border: `1px solid ${tokens.ruleStrong}`,
        borderRadius: 3,
        backgroundColor: tokens.surface,
        px: 3,
        py: 2.25,
        boxShadow: '0 8px 24px rgba(16, 19, 43, 0.05)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        '&:hover': { borderColor: accent, boxShadow: '0 16px 40px rgba(16, 19, 43, 0.1)' },
      }}
    >
      <Button
        onClick={() => setOpen((was) => !was)}
        fullWidth
        aria-expanded={open}
        endIcon={
          <ExpandMoreIcon
            sx={{ transform: open ? 'rotate(180deg)' : 'none', transition: '0.25s ease', color: accent }}
          />
        }
        sx={{ justifyContent: 'space-between', textTransform: 'none', color: tokens.ink, px: 0, textAlign: 'left' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
          <Box
            sx={{
              flexShrink: 0,
              width: 36,
              height: 36,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              backgroundColor: tokens.sunken,
              color: tokens.ink,
              '& svg': { fontSize: 20 },
            }}
          >
            {icon}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ ...microLabelSx, fontSize: 9.5, mb: 0.25 }}>{tag}</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>{title}</Typography>
          </Box>
        </Box>
      </Button>
      <Collapse in={open}>
        <Box sx={{ pt: 2 }}>{children}</Box>
      </Collapse>
    </Box>
  );
};

const STAGES: ReadonlyArray<{ name: string; who: string; actions: string }> = [
  { name: 'REGISTRATION', who: 'Organizer · voters · trustees', actions: 'enrollVoter · selfEnroll · registerTrustee' },
  { name: 'OPEN', who: 'Enrolled voters', actions: 'castVote (re-vote replaces) · late selfEnroll' },
  { name: 'TALLYING', who: 'Every trustee, then anyone', actions: 'submitDecryptionShare · publishTally' },
  { name: 'CLOSED', who: 'Everyone', actions: 'Read the verified result · admin may createPoll again' },
];

const CIRCUITS: ReadonlyArray<{ name: string; size: string; what: string }> = [
  { name: 'castVote', size: '10.5 MB', what: 'Merkle path, nullifier, two EC encryptions' },
  { name: 'createPoll', size: '5.5 MB', what: 'Admin starts a poll, resets per-poll state' },
  { name: 'registerTrustee', size: '2.9 MB', what: 'Adds a decryption key to the tally key' },
  { name: 'submitDecryptionShare', size: '2.9 MB', what: 'Proven share matching the trustee key' },
  { name: 'enrollVoter · selfEnroll', size: '2.7 MB', what: 'Adds a one-way commitment to the roll' },
  { name: 'openVoting · closeVoting', size: '2.7 MB', what: 'Stage changes, deadline-aware' },
  { name: 'publishTally', size: '0.34 MB', what: 'Re-encrypts counts, checks against ballots' },
  { name: 'checkIn', size: '0.14 MB', what: 'Opt-in tester list, separate from ballots' },
];

/**
 * Reference cards that sit under the live app: how to organize, how trustees unlock the
 * result, the poll lifecycle, the privacy split, key safety, and independent verification.
 */
export const AppToolkit: React.FC = () => (
  <Box id="toolkit" data-testid="app-toolkit" sx={{ mt: { xs: 6, md: 8 }, scrollMarginTop: 110 }}>
    <Box sx={{ maxWidth: 680, mb: 3.5 }}>
      <Typography sx={{ ...microLabelSx, mb: 1 }}>✦ Toolkit</Typography>
      <Typography variant="h4" component="h3" sx={{ fontSize: { xs: '1.4rem', md: '1.8rem' }, lineHeight: 1.2, mb: 1 }}>
        Everything the contract lets you do, step by step
      </Typography>
      <Typography variant="body2" sx={{ color: tokens.inkSecondary, lineHeight: 1.7 }}>
        Whether you are voting, running a poll or holding a decryption key, each card walks through the exact actions
        the Midnight contract allows, and what it checks on-chain at every step.
      </Typography>
    </Box>

    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
        gap: 2.5,
        alignItems: 'start',
      }}
    >
      <ToolkitCard icon={<AdminPanelSettingsOutlinedIcon />} tag="Organizers · ~10 minutes" title="Run your own poll">
        <Step n={1} title="Deploy a poll contract">
          Press <b>Deploy a new poll contract</b> above. The deploying wallet becomes the admin, the only one who can
          start polls. Back up your key (🔑) straight away.
        </Step>
        <Step n={2} title="Start the poll">
          Set the question, an optional voting window and quorum, and choose <b>open</b> (anyone can join) or{' '}
          <b>invite-only</b> (you enrol pasted commitments).
        </Step>
        <Step n={3} title="Register at least one trustee">
          Voting cannot open until a trustee has registered a decryption key. You can be the trustee, or invite others
          for n-of-n control.
        </Step>
        <Step n={4} title="Open voting and share the link">
          Use 📤 to copy the invite link. The roll holds up to 1,024 voters and open polls accept late joiners.
        </Step>
        <Step n={5} title="Close">
          You can close at any time; once the deadline passes, anyone can.
        </Step>
      </ToolkitCard>

      <ToolkitCard icon={<KeyOutlinedIcon />} tag="Trustees" title="Unlock the result together">
        <Step n={1} title="Register before voting opens">
          <Code>registerTrustee</Code> adds your public key to the tally key. Nobody, including you, ever holds the
          combined secret.
        </Step>
        <Step n={2} title="Submit your share after close">
          <Code>submitDecryptionShare</Code> proves your share matches the key you registered. A wrong or duplicate
          share is rejected on-chain.
        </Step>
        <Step n={3} title="Anyone publishes the counts">
          Once every trustee has contributed, anyone can press <b>Publish the result</b>. The contract re-encrypts the
          claimed Yes / No / Abstain counts and rejects anything that does not match the ballots.
        </Step>
        <Typography variant="caption" component="div" sx={{ color: tokens.caution, lineHeight: 1.6 }}>
          n-of-n: one missing trustee blocks the result, so only invite trustees who will show up.
        </Typography>
      </ToolkitCard>

      <ToolkitCard icon={<TimelineOutlinedIcon />} tag="Lifecycle" title="Four stages, enforced on-chain">
        {STAGES.map(({ name, who, actions }, i) => (
          <Box key={name} sx={{ display: 'flex', gap: 1.5, mb: i === STAGES.length - 1 ? 0 : 1.5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '5px' }}>
              <Box
                sx={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: i === 3 ? tokens.affirm : accent }}
              />
              {i < STAGES.length - 1 && (
                <Box sx={{ flex: 1, width: '1px', backgroundColor: tokens.ruleStrong, mt: 0.5 }} />
              )}
            </Box>
            <Box sx={{ pb: 0.5 }}>
              <Typography sx={{ fontFamily: mono, fontSize: 11.5, fontWeight: 700, color: tokens.ink }}>
                {name}
              </Typography>
              <Typography variant="caption" component="div" sx={{ color: tokens.inkSecondary }}>
                {who}
              </Typography>
              <Typography
                variant="caption"
                component="div"
                sx={{ color: tokens.inkMuted, fontFamily: mono, fontSize: 10.5 }}
              >
                {actions}
              </Typography>
            </Box>
          </Box>
        ))}
      </ToolkitCard>

      <ToolkitCard
        icon={<VisibilityOffOutlinedIcon />}
        tag="Privacy"
        title="What the chain sees, and what it never does"
      >
        <Row label="Your vote choice" value="PRIVATE" tone="private" />
        <Row label="Which enrolled voter cast a ballot" value="PRIVATE" tone="private" />
        <Row label="Your secret key" value="PRIVATE" tone="private" />
        <Row label="Question, stage, deadline, quorum" value="PUBLIC" tone="public" />
        <Row label="Turnout: ballots cast, voters enrolled" value="PUBLIC" tone="public" />
        <Row label="Final counts (after every trustee)" value="PUBLIC" tone="public" />
        <Row label="Checked-in tester wallets (opt-in)" value="PUBLIC" tone="public" />
        <Typography variant="caption" component="div" sx={{ color: tokens.inkMuted, lineHeight: 1.6, mt: 1 }}>
          One unlinkable nullifier per voter per poll stops double voting without identifying anyone.
        </Typography>
      </ToolkitCard>

      <ToolkitCard icon={<BackupOutlinedIcon />} tag="Key safety" title="Keep your poll key safe">
        <Step n={1} title="One key per poll, in this browser">
          It proves your place on the roll, your admin role or your trustee share. It survives reloads, but not clearing
          site data or switching devices.
        </Step>
        <Step n={2} title="Export a backup">
          The 🔑 button downloads <Code>maao-key-&lt;address&gt;.json</Code>. Store it like a password; anyone holding
          it can act as you on that poll.
        </Step>
        <Step n={3} title="Restore anywhere">
          Import the file on another browser to pick up where you left off. Keys from the CLI&apos;s{' '}
          <Code>npm run deploy</Code> use the same format.
        </Step>
      </ToolkitCard>

      <ToolkitCard icon={<FactCheckOutlinedIcon />} tag="No wallet needed" title="Verify any poll yourself">
        <Typography variant="caption" component="div" sx={{ color: tokens.inkMuted, lineHeight: 1.6, mb: 1.5 }}>
          Every check uses public chain data only. Clone the repo and run:
        </Typography>
        <Box
          sx={{
            fontFamily: mono,
            fontSize: 11,
            lineHeight: 1.8,
            color: '#eef0ff',
            backgroundColor: '#070918',
            borderRadius: 2,
            px: 1.75,
            py: 1.25,
            mb: 1.5,
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          <Box component="span" sx={{ color: accent }}>
            $
          </Box>{' '}
          npm run verify -- &lt;address&gt;
          <br />
          <Box component="span" sx={{ color: accent }}>
            $
          </Box>{' '}
          npm run export-participants -- &lt;address&gt;
        </Box>
        {FEATURED_CONTRACT_ADDRESS && (
          <Typography variant="caption" component="div" sx={{ color: tokens.inkMuted, lineHeight: 1.6, mb: 1 }}>
            Featured poll contract: <Code>{FEATURED_CONTRACT_ADDRESS}</Code>
          </Typography>
        )}
        <Typography variant="caption" component="div" sx={{ color: tokens.inkMuted, lineHeight: 1.6 }}>
          It re-derives the tally and checks it against the encrypted ballots. Details in the{' '}
          <Link href={`${LINKS.github}/blob/main/docs/ARCHITECTURE.md`} target="_blank" rel="noopener noreferrer">
            architecture notes
          </Link>
          .
        </Typography>
      </ToolkitCard>

      <ToolkitCard
        icon={<MemoryOutlinedIcon />}
        tag="Under the hood"
        title="Contract circuits and proving cost"
        defaultOpen={false}
      >
        <Typography variant="caption" component="div" sx={{ color: tokens.inkMuted, lineHeight: 1.6, mb: 1 }}>
          Each action is a Compact circuit proven by your proof server. Prover key size is a good proxy for how long it
          takes; voting is the heaviest at about 30–120 s.
        </Typography>
        {CIRCUITS.map(({ name, size, what }) => (
          <Box
            key={name}
            sx={{ py: 0.8, borderBottom: `1px dashed ${tokens.rule}`, '&:last-of-type': { borderBottom: 'none' } }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
              <Typography sx={{ fontFamily: mono, fontSize: 11.5, fontWeight: 700, color: tokens.ink }}>
                {name}
              </Typography>
              <Typography sx={{ fontFamily: mono, fontSize: 11, color: tokens.inkMuted }}>{size}</Typography>
            </Box>
            <Typography variant="caption" component="div" sx={{ color: tokens.inkMuted }}>
              {what}
            </Typography>
          </Box>
        ))}
      </ToolkitCard>
    </Box>
  </Box>
);
