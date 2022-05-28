import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import Home from './pages/home/home';
import Login from './components/login/login';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { closeSnackbar } from './features/snackbar/snackbarSlice';
import './App.scss';

function App() {
  const user = useSelector((store: any) => store.auth);
  const snackbar = useSelector((store: any) => store.snackbar);
  const dispatch = useDispatch();
  const handleClose = (event: any, reason: any) => {
    if (reason !== 'clickaway') {
      dispatch(closeSnackbar());
    }
  };

  const clientId: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  useEffect(() => {
    function start() {
      gapi.client.init({
        // eslint-disable-next-line camelcase
        client_id: clientId,
        scope: 'profile',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    <div className="App">
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
      {user.isLoggedIn ? <Home /> : <Login />}
    </div>
  );
}

export default App;
