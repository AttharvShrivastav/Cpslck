import React, { useState, useEffect } from 'react';
import Typewriter from './Typewriter'; 
import Subtext from './Subtext';

// --- Configuration Constants ---
const HEADLINE_TEXT = "Composing Brilliance…";
const SUBTEXT_TEXT = "Great things are in the works. Please pardon the masterpiece-in-progress.";
const TYPING_SPEED_HEADLINE = 120;
const DELAY_BEFORE_FADE_IN = 500;

function WaitingPage() {
  const [displayedHeadline, setDisplayedHeadline] = useState('');
  const [isHeadlineComplete, setIsHeadlineComplete] = useState(false);

  // This useEffect handles the typewriter logic for the headline
  useEffect(() => {
    if (isHeadlineComplete) return;

    if (displayedHeadline.length < HEADLINE_TEXT.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedHeadline(HEADLINE_TEXT.slice(0, displayedHeadline.length + 1));
      }, TYPING_SPEED_HEADLINE);
      return () => clearTimeout(timeoutId);
    } else {
      // Once typing is done, wait a moment then set the flag
      const timeoutId = setTimeout(() => {
        setIsHeadlineComplete(true);
      }, DELAY_BEFORE_FADE_IN);
      return () => clearTimeout(timeoutId);
    }
  }, [displayedHeadline, isHeadlineComplete]);

  return (
    <main className="container">
      <Typewriter text={displayedHeadline} />
      <Subtext text={SUBTEXT_TEXT} startAnimation={isHeadlineComplete} />
    </main>
  );
}

export default WaitingPage;