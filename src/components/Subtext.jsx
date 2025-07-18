import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Subtext({ text, startAnimation }) {
  const subtextRef = useRef(null);

  useGSAP(() => {
    // Only run the animation if the start signal is true
    if (startAnimation) {
      gsap.to(subtextRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.inOut',
      });
    }
  }, [startAnimation]); // Dependency array ensures this runs when startAnimation changes

  return (
    <p className="subtext" ref={subtextRef}>
      {text}
    </p>
  );
}

export default Subtext;