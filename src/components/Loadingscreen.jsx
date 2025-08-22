import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin'; // Import the TextPlugin

gsap.registerPlugin(TextPlugin); // Register the plugin

// --- Configuration ---
const MICROCOPY = [
  "Calibrating the Chaos...",
  "Bending the grid...",
  "Ready to shout.",
];
const TYPING_DURATION_PER_LINE = 1;
const PAUSE_DURATION = 1.8;

function LoadingScreen({ onEnter }) {
  const [isSequenceComplete, setSequenceComplete] = useState(false);
  const container = useRef(null);
  const textRef = useRef(null);

  // A single useGSAP hook to run the entire animation timeline
  useGSAP(() => {
    // Create a GSAP Timeline
    const tl = gsap.timeline({
      onComplete: () => setSequenceComplete(true) // Set completion state when the whole timeline is done
    });

    // Add each line's animation to the timeline
    MICROCOPY.forEach(line => {
      tl
        .to(textRef.current, {
          duration: TYPING_DURATION_PER_LINE,
          text: {
            value: line,
            newClass: "cursor" // Add/remove a class to show/hide the cursor
          },
          ease: "none"
        })
        .to(textRef.current, {
          duration: PAUSE_DURATION,
          text: {
            value: line,
            oldClass: "cursor" // Remove the cursor class to stop blinking
          },
          ease: "none"
        })
        .to(textRef.current, {
          duration: 0.8,
          opacity: 0
        })
        .set(textRef.current, { text: '', opacity: 1 }); // Reset for the next line
    });

  }, { scope: container });


  // This useEffect for event listeners remains unchanged
  useEffect(() => {
    if (!isSequenceComplete) return;
    const handleEnter = (e) => {
      if (e.key === 'CapsLock' || e.type === 'click' || e.type === 'touchend') {
        onEnter();
      }
    };
    window.addEventListener('keydown', handleEnter);
    window.addEventListener('click', handleEnter);
    window.addEventListener('touchend', handleEnter);
    return () => {
      window.removeEventListener('keydown', handleEnter);
      window.removeEventListener('click', handleEnter);
      window.removeEventListener('touchend', handleEnter);
    };
  }, [isSequenceComplete, onEnter]);

  return (
    <main className="container" ref={container}>
      {!isSequenceComplete ? (
        <h1 className="headline" ref={textRef}></h1>
      ) : (
        <div className="enter-prompt">
          <span className="desktop-only">[PRESS CAPSLOCK TO ENTER]</span>
          <span className="mobile-only">[ TAP TO ENTER ]</span>
        </div>
      )}
    </main>
  );
}

export default LoadingScreen;