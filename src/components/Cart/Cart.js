import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    //const total = cart.reduce((total, prd) => total + prd.price, 0);
    let totalQuantity = 0;
    let total = 0;
    // for (let i = 0; i < cart.length; i++) {
    //     const product = cart[i];
    //     total = total + product.price * product.quantity || 1;
    // }
    for (const product of cart) {
        if (!product.quantity) {
            product.quantity = 1;
        }
        total = total + product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    }


    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }
    const vat = total/10;

    const grandTotal = total + shipping + vat;

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div className='cart-details'>
            <h3>Order Summary</h3>
            <p>Items Ordered: {totalQuantity}</p>
            <p>Product Price: ${formatNumber(total)}</p>
            <p><small>Shipping Cost: ${shipping}</small></p>
            <p><small>VAT: ${formatNumber(vat)}</small></p>
            <p>Total Price: ${formatNumber(grandTotal)}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;