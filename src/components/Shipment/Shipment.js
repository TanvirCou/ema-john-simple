import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';
import { clearLocalShoppingCart, getDatabaseCart } from '../../utilities/databaseManager';
import PaymentProcess from '../PaymentProcess/PaymentProcess';

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [shippingData, setShippingData] = useState(null);

  const onSubmit = data => {
   setShippingData(data);
  };

  const handlePaymentSuccess = paymentId => {
    const savedCart = getDatabaseCart();
    const orderDetails = { ...loggedInUser, 
      products: savedCart, 
      shipment: shippingData,
      paymentId, 
      orderTime: new Date() 
    };

    fetch('http://localhost:5000/addOrder', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          clearLocalShoppingCart();
          alert('Your order confirmed');
        }
      })
  }

  console.log(watch("example"));

  return (
    <div className="row">
      <div style={{display: shippingData ? 'none' : 'block'}} className="col-md-6">
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>

          <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder='Your Name' />
          {errors.name && <span className='error'>Name is required</span>}
          <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder='Your Email' />
          {errors.email && <span className='error'>Email is required</span>}
          <input {...register("address", { required: true })} placeholder='Your Address' />
          {errors.address && <span className='error'>Address is required</span>}
          <input {...register("phone", { required: true })} placeholder='Your Phone' />
          {errors.phone && <span className='error'>Phone is required</span>}

          <input style={{ cursor: 'pointer' }} type="submit" />
        </form>
      </div>
      <div style={{display: shippingData ? 'block' : 'none'}} className="col-md-6">
        <h3>Please Pay</h3>
        <PaymentProcess handlePayment={handlePaymentSuccess}></PaymentProcess>
      </div>
    </div>
  );
};

export default Shipment;