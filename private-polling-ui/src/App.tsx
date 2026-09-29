import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { type Observable } from 'rxjs';
import { MainLayout, Board } from './components';
import { FeaturedPoll } from './components/FeaturedPoll';
import { FeedbackButton } from './components/FeedbackButton';
import { GettingStarted } from './components/GettingStarted';
import { Hero } from './components/landing/Hero';
import { Section } from './components/landing/Section';
import { CtaBand, Faq, Features } from './components/landing/Sections';
import { WorkflowSection } from './components/landing/WorkflowSection';
import { TerminalSection } from './components/landing/TerminalSection';
import { FEATURED_CONTRACT_ADDRESS, pollFromUrl } from './config/product';
import { type BoardDeployment } from './contexts';
import { useDeployedBoardContext } from './hooks';

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/**
 * Root component.
 *
 * Landing flow:
 * 1. Hero with Magic UI VideoText, Highlighter, FileTree (Tree), & cosmic visuals
 * 2. Active app section (Featured poll, deployments, or poll creation)
 * 3. Features with ZK Security showcase card
 * 4. Interactive End-to-End ZK Workflow Section
 * 5. FAQ
 * 6. Terminal Section (placed directly above footer)
 * 7. CTA Band
 */
const App: React.FC = () => {
  const boardApiProvider = useDeployedBoardContext();
  const [boardDeployments, setBoardDeployments] = useState<Array<Observable<BoardDeployment>>>([]);
  const [invitedAddress] = useState(pollFromUrl);
  const spotlightAddress = invitedAddress ?? FEATURED_CONTRACT_ADDRESS;
  const showSpotlight = boardDeployments.length === 0 && spotlightAddress !== undefined;

  useEffect(() => {
    const subscription = boardApiProvider.boardDeployments$.subscribe(setBoardDeployments);
    return () => subscription.unsubscribe();
  }, [boardApiProvider]);

  const openSpotlight = useCallback(() => {
    if (spotlightAddress && boardDeployments.length === 0) boardApiProvider.resolve(spotlightAddress);
    scrollTo(spotlightAddress ? 'app' : 'create');
  }, [boardApiProvider, boardDeployments.length, spotlightAddress]);

  const primaryLabel = spotlightAddress ? (invitedAddress ? 'Open your poll' : 'Launch app') : 'Create a poll';

  return (
    <MainLayout>
      <Hero primaryLabel={primaryLabel} onPrimary={openSpotlight} />

      <Section
        id="app"
        testId="app"
        eyebrow="The app"
        title={boardDeployments.length > 0 ? 'Your polls' : 'Vote, or run your own poll'}
        intro="Connect a Midnight wallet on Preprod to join a poll, cast a ballot or start a new one. New to Midnight? The checklist gets you set up in about five minutes."
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap', gap: 3 }}>
          {showSpotlight && (
            <FeaturedPoll
              address={spotlightAddress}
              fromInviteLink={invitedAddress !== undefined}
              onOpen={openSpotlight}
            />
          )}
          {boardDeployments.map((boardDeployment, idx) => (
            <div data-testid={`board-${idx}`} key={`board-${idx}`}>
              <Board boardDeployment$={boardDeployment} />
            </div>
          ))}
          <GettingStarted />
          <Box id="create" data-testid="board-start" sx={{ scrollMarginTop: 80 }}>
            <Board />
          </Box>
        </Box>
      </Section>

      <Features />
      <WorkflowSection />
      <Faq />
      <TerminalSection />
      <CtaBand primaryLabel={primaryLabel} onPrimary={openSpotlight} />
      <FeedbackButton />
    </MainLayout>
  );
};

export default App;
