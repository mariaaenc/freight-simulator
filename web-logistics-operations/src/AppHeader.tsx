import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth, signOut } from './authentication/firebase';
import { useAuth } from './authentication/AuthContext';

const AppHeader: React.FC = () => {
    const { user } = useAuth();
  
    const logout = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Error on logout:', error);
      }
    };
  
    return (
      <header className="App-header">
        {user && (
          <IconButton color="inherit" aria-label="logout" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        )}
      </header>
    );
  };
  
  export default AppHeader;