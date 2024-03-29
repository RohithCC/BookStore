import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductBySell = () => {
        getProducts('sold').then(data => {
            if(data.error) {
                setError(data.error)
            }
            else {
                setProductsBySell(data);
            }
        });
    }

        const loadProductByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            }
            else {
                setProductsByArrival(data);
            }
        });
    }

    useEffect(() => {
        loadProductBySell();
        loadProductByArrival();
        }, [])

    return (
        <Layout title="Home Page" 
        description='Node React Ecommerce App'
        className="container-fluid"
        >
            <Search /> 
                <div className='row'>
                    <h2 className='mb-4'> Best Seller</h2>
                   
                             {productsBySell.map((product, i) => (
                        console.log(product),
                        <div key={i} className='col-4 mb-3 homepage1'>
                         <Card key={i} product={product}/>
                        </div>
                      
                    ))}
                
                   
                </div>

           
                    <div className='row'>
                        <h2 className='mb-4'>New Arrival</h2>
                        
                                {productsByArrival.map((product, i) => (
                         <div key={i} className='col-4 mb-3 homepage2'>
                            <Card key={i} product={product}/>
                            </div>
                    ))}
                       
                
                    </div>

           


          </Layout>

       );  
};
       

export default Home;