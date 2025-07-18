import React from 'react';

function Typewriter({ text }) {
  return (
    <h1 className="headline">
      {text}
      {text.length > 0 && <span className="cursor">_</span>}
    </h1>
  );
}

export default Typewriter;