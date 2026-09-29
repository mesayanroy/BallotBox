import React from 'react';
import { Box, Button, Card, CardContent, Chip, CircularProgress, Typography } from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { PollState } from '../../../contract/src/managed/private-polling/contract/index.js';
import { usePublicPollPreview } from '../hooks/usePublicPollPreview';
import { Caption, Meter, pct, shortHex, VoteBar } from './poll/ui';
import { microLabelSx, mono, tokens } from '../config/theme';

const STAGE: Record<PollState, { label: string; color: string }> = {
  [PollState.CLOSED]: { label: 'Closed', color: tokens.neutral },
  [PollState.REGISTRATION]: { label: 'Enrollment open', color: tokens.caution },
  [PollState.OPEN]: { label: 'Voting live', color: tokens.affirm },
  [PollState.TALLYING]: { label: 'Decrypting', color: tokens.ink },
};

export interface FeaturedPollProps {
  readonly address: string;
  readonly fromInviteLink: boolean;
  readonly onOpen: () => void;
}

/** A public, wallet-free preview of the featured or shared poll, with one button to take part. */
export const FeaturedPoll: React.FC<FeaturedPollProps> = ({ address, fromInviteLink, onOpen }) => {
  const { preview, status } = usePublicPollPreview(address);
  const stage = preview ? STAGE[preview.pollState] : undefined;
  const total = preview ? preview.finalYes + preview.finalNo + preview.finalAbstain : 0n;
  const participating =
    preview && (preview.pollState === PollState.REGISTRATION || preview.pollState === PollState.OPEN);

  return (
    <Card
      data-testid="featured-poll"
      sx={{
        width: { xs: '100%', sm: 480 },
        backgroundColor: tokens.surface,
        border: `1px solid ${tokens.ruleStrong}`,
        borderRadius: 3,
        boxShadow: '0 8px 24px rgba(16, 19, 43, 0.05)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          borderColor: '#5fe3c8',
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 45px rgba(16, 19, 43, 0.12), 0 0 20px rgba(95, 227, 200, 0.15)',
        },
      }}
    >
      <CardContent sx={{ p: 3.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography
            sx={{
              ...microLabelSx,
              color: '#5fe3c8',
              backgroundColor: 'rgba(95, 227, 200, 0.1)',
              px: 1.25,
              py: 0.4,
              borderRadius: 1,
              fontFamily: mono,
              fontWeight: 700,
            }}
          >
            {fromInviteLink ? '✦ INVITED POLL' : '✦ FEATURED PUBLIC POLL'}
          </Typography>
          {stage && (
            <Chip
              size="small"
              label={stage.label}
              sx={{
                color: stage.color,
                border: `1px solid ${stage.color}44`,
                backgroundColor: `${stage.color}11`,
                fontFamily: mono,
                fontSize: 11,
                fontWeight: 700,
              }}
            />
          )}
        </Box>

        {status === 'loading' && !preview && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 3 }}>
            <CircularProgress size={20} sx={{ color: '#5fe3c8' }} />
            <Caption mb={0}>Reading poll parameters from Midnight blockchain…</Caption>
          </Box>
        )}
        {(status === 'not-found' || status === 'error') && !preview && (
          <Caption color="#ffa726">
            {status === 'not-found'
              ? 'No poll found at this address on this network.'
              : 'Could not read this poll. It may not exist on this network (Preprod is occasionally reset), or the indexer is unreachable.'}
          </Caption>
        )}

        {preview && (
          <>
            <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.ink, lineHeight: 1.35, mb: 1.5, fontSize: 18 }}>
              {preview.question ?? 'No poll has been started on this contract yet.'}
            </Typography>
            {participating && (
              <>
                <Caption>
                  {preview.ballots.toString()} ballots from {preview.enrolled.toString()} enrolled ·{' '}
                  {preview.openEnrollment ? 'anyone can join' : 'invite-only'}
                  {preview.votingDeadline > 0n &&
                    ` · closes ${new Date(Number(preview.votingDeadline) * 1000).toLocaleDateString()}`}
                </Caption>
                <Meter value={pct(preview.ballots, preview.enrolled)} />
              </>
            )}
            {preview.tallied && preview.pollState === PollState.CLOSED && total > 0n && (
              <Box sx={{ mt: 1.5 }}>
                <VoteBar label="Yes" icon={null} count={preview.finalYes} total={total} color="#4caf50" />
                <VoteBar label="No" icon={null} count={preview.finalNo} total={total} color="#f44336" />
                <VoteBar label="Abstain" icon={null} count={preview.finalAbstain} total={total} color="#9e9e9e" />
              </Box>
            )}
            <Caption color="#777">{preview.participants.toString()} wallets have checked in as testers</Caption>
          </>
        )}

        <Button
          variant="contained"
          size="large"
          fullWidth
          startIcon={<HowToVoteIcon />}
          onClick={onOpen}
          sx={{
            mt: 2.5,
            py: 1.3,
            textTransform: 'none',
            fontWeight: 700,
            fontFamily: mono,
            backgroundColor: '#070918',
            color: '#eef0ff',
            borderRadius: 2,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#5fe3c8',
              color: '#070918',
              boxShadow: '0 0 20px rgba(95, 227, 200, 0.4)',
            },
          }}
        >
          {participating ? 'Connect Wallet & Take Part' : 'Connect Wallet & Open Poll'}
        </Button>
        <Typography variant="caption" sx={{ color: tokens.inkFaint, display: 'block', mt: 1.5, fontFamily: mono, textAlign: 'center' }}>
          Contract: {shortHex(address, 12, 10)}
        </Typography>
      </CardContent>
    </Card>
  );
};
