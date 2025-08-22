import React, { useState } from 'react';
import LoadingScreen from './components/Loadingscreen';

import './App.css';
import WaitingPage from './components/WaitingPage';
import AwwwardsColumns from './components/Mock';

function App() {
  const [isSiteVisible, setSiteVisible] = useState(false);
  const handleEnterSite = () => {
    console.log("Entering site...");
    setSiteVisible(true);
  };

  return (
    <>
      {!isSiteVisible ? (
        <LoadingScreen onEnter={handleEnterSite} />
      ) : (
        // This is where your main website content would go
        <div className="container">
          <h1 style={{ fontSize: '3rem', color: 'white' }}>Welcome to CAPSLOCK.</h1>
        </div>
      )}
      {/* <WaitingPage /> */}
      {/* <AwwwardsColumns /> */}
    </>
  );
}

export default App;