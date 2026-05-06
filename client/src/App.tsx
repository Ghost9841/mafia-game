import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreditsPage from './pages/credits/CreditsPage';
import TermsPage from './pages/terms/TermsPage';
import { Home } from './pages/landingpage/Home';
import LobbyPage from './pages/lobby/LobbyPage';
import { Toaster } from './components/ui/sonner';
import GamePage from './pages/game/GamePage';
import NotFound from './NotFound';
import { useState } from 'react';
import SplashScreen from './components/ui/manual-ui/SplashScreen';
import { TooltipProvider } from './components/ui/tooltip';

export const App=()=>{
   const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }
  return (
    <>

    <TooltipProvider>

    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/credits" element={<CreditsPage/>} />
        <Route path="/terms" element={<TermsPage/>} />
        <Route path="/lobby" element={<LobbyPage/>} />
        <Route path="/lobby/:id" element={<LobbyPage/>} />
        <Route path="/startgame" element={<GamePage/>} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
        <Toaster position='top-right' richColors/>
    </TooltipProvider>

    </>
  )
}

export default App;