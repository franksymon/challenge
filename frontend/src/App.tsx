
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './page/login';
import Signup from './page/signup';
import Note from './page/note';
import ResetPassword from './page/restPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/note" element={<Note />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
