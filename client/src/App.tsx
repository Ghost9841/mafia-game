import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreditsPage from './pages/credits/CreditsPage';
import TermsPage from './pages/terms/TermsPage';

export const App=()=>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/credits" element={<CreditsPage/>} />
        <Route path="/terms" element={<TermsPage/>} />

      </Routes>
    </Router>
  )
}

export default App;