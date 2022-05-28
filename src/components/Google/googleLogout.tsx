import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { openSnackbar } from '../../features/snackbar/snackbarSlice';
import './style.scss';

export default function GoogleLogoutComp() {
  const dispatch = useDispatch();

  const responseSuccess = () => {
    dispatch(logout());
    console.log('logout success');
    dispatch(openSnackbar({ msg: 'Logged out successfully!', severity: 'success' }));
  };
  const googleClientId: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <div>
      <GoogleLogout
        clientId={googleClientId}
        buttonText="Logout"
        render={(renderProps) => (
          <button onClick={renderProps.onClick} className="logout">
            Logout
          </button>
        )}
        onLogoutSuccess={responseSuccess}
      />
    </div>
  );
}
