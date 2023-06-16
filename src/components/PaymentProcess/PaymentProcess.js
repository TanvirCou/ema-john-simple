import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
const stripePromise = loadStripe('pk_test_51NHBBzKAQa8U9NhxheHXa4Y8j8bWWgkXSs8h3lRUdiscYhplJrme0VQpIjNvriowM4BFoG1Y9k9sHHi2SfifLiP800nUgxvKNa');

const PaymentProcess = ({handlePayment}) => {
    
    return (
        <div>
            <Elements stripe={stripePromise}>
                <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
            </Elements>
        </div>
    );
};

export default PaymentProcess;