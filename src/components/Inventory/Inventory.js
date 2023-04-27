import React from 'react';
import inventoryImg from '../../images/inventoryImage.gif'
import './Inventory.css';

const Inventory = () => {
    return (
        <div className='inventory'>
            <img src={inventoryImg} alt="" />
        </div>
    );
};

export default Inventory;