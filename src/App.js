import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import CreateBookMark from './pages/CreateBookMark';
import ListAllBookMark from './pages/ListAllBookMark';
import useAppStore from './storage/storage';

function App() {

  const loginState = useAppStore((state) => state.loginState);

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4"></nav>
      <Routes>
        <Route path="/login" element={loginState ? <Navigate to={'/my-book-mark'} /> : <Login />} />
        <Route path="/create-book-mark" element={loginState ? <CreateBookMark /> : <Navigate to={'/login'} />} />
        <Route path="/my-book-mark" element={loginState ? <ListAllBookMark /> : <Navigate to={'/login'} />} />
        <Route path="*" element={<Navigate to={loginState ? "/my-book-mark" : "/login"} replace />} />
      </Routes>
    </div>
  );
}

export default App;
