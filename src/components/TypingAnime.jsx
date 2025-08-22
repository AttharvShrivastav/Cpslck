import React, { forwardRef } from 'react';

// Use forwardRef to allow the parent to pass a ref to the h1 element
const TypingAnime = forwardRef(({ text }, ref) => {
  return (
    <h1 className="headline" ref={ref}>
      {text}
      {text.length > 0 && <span className="cursor">_</span>}
    </h1>
  );
});

export default TypingAnime;