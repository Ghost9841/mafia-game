import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreditsPage from './pages/credits/CreditsPage';
import TermsPage from './pages/terms/TermsPage';
import { Home } from './pages/landingpage/Home';
import LobbyPage from './pages/lobby/LobbyPage';

export const App=()=>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/credits" element={<CreditsPage/>} />
        <Route path="/terms" element={<TermsPage/>} />
        <Route path="/lobby" element={<LobbyPage/>} />
        <Route path="/lobby/:id" element={<LobbyPage/>} />

      </Routes>
    </Router>
  )
}

export default App;