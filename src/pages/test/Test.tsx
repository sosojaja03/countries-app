import React from 'react';
import OTPInput from '@/assets/components/OTP/OTPInput';

const Test: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Enter OTP</h2>
      <OTPInput numInputs={4} />
    </div>
  );
};

export default Test;
