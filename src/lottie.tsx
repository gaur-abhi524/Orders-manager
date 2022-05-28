import Lottie from 'lottie-react';
import orderAnimation from './96601-order-received-imagery.json';

function LottieAnimation() {
  const style = {
    height: 300,
  };
  return (
    <div
      style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Lottie animationData={orderAnimation} style={style} loop={true} />
    </div>
  );
}
export default LottieAnimation;
