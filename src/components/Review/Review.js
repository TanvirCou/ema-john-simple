import React, { useEffect, useState } from 'react';
import { clearLocalShoppingCart, getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const navigate = useNavigate();   
    const handleProceedCheckout = () => {
        navigate('/shipment');
    }

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://ema-john-simple-server-xi.vercel.app/productByKeys', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])

    const handleRemoveProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
let thankYou;
if(orderPlaced){
    thankYou = <img src={happyImage} alt="" />;
}

    return (
        <div className='twin-container'>
            <div className='product-container'>
            {
                    cart.length === 0 && <div style={{textAlign:'center', marginTop:'200px'}}>
                        <Spinner animation="border" variant="dark" />
                    </div>
                }
                {
                    cart.map(pd => <ReviewItem 
                        handleRemoveProduct={handleRemoveProduct}
                        key={pd.key}
                        product={pd}></ReviewItem>)
                }

                {
                    thankYou
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button style={{width:'170px'}} onClick={handleProceedCheckout} className='product-button'>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;