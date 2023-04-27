import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    return (
        <div className='review-item'>
            <h4 className='product-name'>{name}</h4>
            <p><small>${price}</small></p>
            <p>Quantity: {quantity}</p>
            <br />
            <button onClick={()=> props.handleRemoveProduct(key)} className='product-button'>Remove</button>
        </div>
    );
};

export default ReviewItem;