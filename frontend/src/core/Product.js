import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';
import Search from './Search';
import { read, productId, listRelated } from "./apiCore";

const Product = (props) => {
    const [product, setProduct] = useState({});
     const [relatedProduct, setrelatedProduct] = useState([]);
    const [error, setError] = useState(false);


    const loadSingleProduct = productId => {
            read(productId).then(data => {
                if(data.error) {
                    setError(data.error);
                }
                else {
                    setProduct(data);
                    //fetch related products
                    listRelated(data._id).then(data => {
                        if(data.error) {
                            setError(data.error);
                        } else {
                                setrelatedProduct(data);
                        }
                        
                    })
                }
            });
    }

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

      return (
        <Layout 
        title={product && product.name}
        description={
            product &&
            product.description &&
            product.description.substring(0, 100)
        }
        className="container-fluid"
        >

        <div className='row productind'>
            <div className='col-8'>
                     {
                product &&
                product.description &&
                <Card product={product}
                showViewProductButton={false}
                />
            }
            </div>
            <div className='col-4'>
            <h4>related product</h4>
            {relatedProduct.map((p, i) => (
                <div className="mb-3 productind1">
                    <Card key={i} product={p}/>
                         {/*
                product &&
                product.description &&
                <Card product={product}
                showViewProductButton={false}
                />
            */ } 
                </div>
            ))}
            </div>
       
        </div>

          </Layout>

       );  
}

export default Product;