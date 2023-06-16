import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/product/${productKey}`)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
            setLoading(false);
        })
    }, [productKey])
    //const product = fakeData.find(pd => pd.key === productKey)
    
    return (
        <div>
            {
                loading ? <div style={{textAlign:'center', marginTop:'200px'}}>
                                <Spinner animation="border" variant="dark" />
                         </div>
                : <Product showAddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;