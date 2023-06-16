import React from 'react';

const Inventory = () => {
    const handleAddProduct = () =>{
        const product = {};
        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name:</span><br /><input type="text" /></p>
                <p><span>Price:</span><br /><input type="text" /></p>
                <p><span>Quantity</span><br /><input type="text" /></p>
                <p><span>Product Image:</span><br /><input type="file" name="" id="" /></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    );
};

export default Inventory;