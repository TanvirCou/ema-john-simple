import React from 'react';
import './Inventory.css';

const Inventory = () => {
    const handleAddProduct = () =>{
        const product = {};
        fetch('https://ema-john-simple-server-xi.vercel.app/addProduct', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <div className='d-flex justify-content-center mt-4'>
            <form action="" className='inventory-form shadow p-3 mb-5 bg-white rounded'>
                <h3 className='text-brand ml-3'>Add Product:</h3>
                <p><span>Name:</span><br /><input type="text" /></p>
                <p><span>Price:</span><br /><input type="text" /></p>
                <p><span>Quantity</span><br /><input type="text" /></p>
                <p><span>Product Image:</span><br /><input type="file" name="" id="" /></p>
                <button onClick={handleAddProduct} className='product-button mb-2'>Add Product</button>
            </form>
        </div>
    );
};

export default Inventory;