import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { refreshToken } from '../../utils/refreshToken';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { openSnackbar } from '../../features/snackbar/snackbarSlice';

export default function GoogleLoginComp(props: any) {
  const dispatch = useDispatch();

  const responseSuccess = async (response: any) => {
    console.log('Login Successful', response.profileObj);
    props.setLoading(true);
    refreshToken(response);
    const profile = response.profileObj;
    dispatch(login({ name: profile.name, profilePicture: profile.imageUrl, email: profile.email }));
    dispatch(openSnackbar({ msg: 'Logged in successfully', severity: 'success' }));
  };

  const responseFailure = (response: any) => {
    console.log('Login Failed', response);
    dispatch(openSnackbar({ msg: 'Log in failed', severity: 'error' }));
  };
  const googleClientId: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <div>
      <GoogleLogin
        clientId={googleClientId}
        // render={(renderProps) => (
        //   <button
        //     onClick={renderProps.onClick}
        //     disabled={renderProps.disabled}
        //     className="signin"
        //   >
        //     Sign In
        //   </button>
        // )}
        onSuccess={responseSuccess}
        onFailure={responseFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}
