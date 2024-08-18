import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AppHeader from './AppHeader';
import PrivateRoute from './authentication/PrivateRoute';
import PublicRoute from './authentication/PublicRoute';
import LoginPage from './authentication/Login';
import { AuthProvider } from './authentication/AuthContext';
import SimulateFreightForm from './simulate-freight/SimulateFreightForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppHeader />
        <div className="App">
          <Routes>
            <Route path="/login" element={<PublicRoute element={<LoginPage />} restricted />} />
            <Route path="/simulate-freight" element={<PrivateRoute element={<SimulateFreightForm />} />} />
            <Route path="*" element={<Navigate to="/simulate-freight" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
