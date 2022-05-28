import Navbar from '../../components/Navbar/navbar';
import OrderForm from '../../components/orderForm/orderForm';
import ListShow from '../../components/listShow/listShow';
import React from 'react';
import LottieAnimation from '../../lottie';

function Home() {
  const [loading, setLoading] = React.useState(true);
  // to mimic fetching from server
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <LottieAnimation />
      ) : (
        <div>
          <Navbar />
          <div
            style={{
              display: 'flex',
              padding: '2% 5% 0 6%',
              justifyContent: 'flex-start',
              fontSize: '5.5vh',
              fontWeight: '400',
            }}
          >
            <p>Welcome! Here is the list of your orders.</p>
          </div>
          <OrderForm />
          <div style={{ padding: '2% 5%' }}>
            <ListShow />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
