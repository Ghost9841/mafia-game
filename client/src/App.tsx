import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreditsPage from './pages/credits/CreditsPage';
import TermsPage from './pages/terms/TermsPage';
import { Home } from './pages/landingpage/Home';
import LobbyPage from './pages/lobby/LobbyPage';
import { Toaster } from './components/ui/sonner';
import GamePage from './pages/game/GamePage';

export const App=()=>{
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/credits" element={<CreditsPage/>} />
        <Route path="/terms" element={<TermsPage/>} />
        <Route path="/lobby" element={<LobbyPage/>} />
        <Route path="/lobby/:id" element={<LobbyPage/>} />
        <Route path="/startgame" element={<GamePage/>} />

      </Routes>
    </Router>
        <Toaster position='top-right' richColors/>
    </>
  )
}

export default App;