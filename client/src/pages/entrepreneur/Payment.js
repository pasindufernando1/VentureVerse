import React, { useState } from 'react';
import axios from "../../api/axios";
import StripeCheckout from 'react-stripe-checkout';

function Payment() {
  const publishableKey = 'pk_test_51NVoO5Lg7SFuaaswzqNwoC7EQgXDKL7sSzvUDtUJmrFbOtiUPlgEzEHaEY8vZoYUUvL1O22LnW9jdFQ1K9OmSiOy00MWdEV8aT'; // Your Stripe publishable key
  const [token, setToken] = useState('');
  const amount = 1000000; // Amount in cents 

  const handleToken = (token) => {
    setToken(token.id);
    console.log(token);
    // Send the payment token and amount to your server
    sendPaymentToServer(token.id, amount);
  };

  const sendPaymentToServer = async (token, amount) => {
    try {
      // Make a POST request to your Spring Boot server
      const response = await axios.post('auth/pay', {
        token,
        amount,
      });

      // Handle the response from the server (optional)
      console.log(response.data);
      // Update your UI accordingly (e.g., show success message, etc.)
    } catch (error) {
      console.error(error);
      // Handle the error (e.g., show error message, etc.)
    }
  };

  return (
    <StripeCheckout
      amount={amount}
      label={'Pay Now Rs.'}
      name='VentureVerse'
      description={'Your Total Price is Rs.'}
      panelLabel='Pay Now'
      token={handleToken}
      stripeKey={publishableKey}
      currency='LKR'
      logo='../../../public/assets/favicon.ico'
    />
  );
}

export default Payment;
