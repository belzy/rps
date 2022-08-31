import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  CreatePage,
  GamePage,
  HomePage,
  StartPage,
} from './pages';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={ <HomePage username={ username } /> } />
        <Route path="/start" element={ <StartPage username={ username } setUsername={ setUsername }  /> } />
        <Route path="/new" element={ <CreatePage username={ username } /> } />
        <Route path="/games/:gameName" element={ <GamePage username={ username } /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;