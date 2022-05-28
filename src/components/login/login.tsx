import GoogleLoginComp from '../Google/googleLogin';
import LottieAnimation from '../../lottie';
import ParticlesBg from 'particles-bg';
import React from 'react';

function Login() {
  const [loading, setLoading] = React.useState(true);
  // to mimic fetching from server
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div>
      {loading ? (
        <LottieAnimation />
      ) : (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <ParticlesBg type="cobweb" bg={true} />
          <p style={{ fontSize: '6vh', fontWeight: '350' }}>Sign in to view your orders</p>
          <GoogleLoginComp setLoading={setLoading} />
        </div>
      )}
    </div>
  );
}

export default Login;
