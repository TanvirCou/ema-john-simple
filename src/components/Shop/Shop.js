import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const Shop = () => {
    const[products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(()=>{
        fetch('http://localhost:5000/products?search='+search)
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [search]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('http://localhost:5000/productByKeys', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
        /*if(products.length > 0){
            const cartProduct = productKeys.map(key => {
                const product = products.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            })
            setCart(cartProduct);
        }*/
    }, [])

    const handleAddProduct = (product) =>{
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        } 
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    const handleSearch = event => {
        setSearch(event.target.value);
    }

    return (
        <div>
            <div className='product-search'>
                <input type="search" onBlur={handleSearch} placeholder='Search' />
            </div>
            <div className='twin-container'>
            <div className="product-container">
                {
                    products.length === 0 && <div style={{textAlign:'center', marginTop:'200px'}}>
                        <Spinner animation="border" variant="dark" />
                    </div>
                }
                {
                    products.map(pd => <Product
                        key={pd.key} 
                        showAddToCart={true} 
                        handleAddProduct={handleAddProduct} 
                        product={pd}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                        <Link to={"/review"}>
                            <button>Review Order</button>
                        </Link>
                </Cart>
            </div>
        </div>
        </div>
        
    );
};

export default Shop;