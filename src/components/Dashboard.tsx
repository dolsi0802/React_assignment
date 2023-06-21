import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Url } from 'url';
import { classicNameResolver } from 'typescript';
import './dashboard.css'

interface item {
  id: number;
  title: string;
  category: string;
  ratings: number;
  price: number;
  thumbnail:string;
}

const Dashboard: React.FC = () => {
  const [items, setItems] = useState<item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response =await fetch('https://dummyjson.com/products');
      const data= await response.json();
      setItems(data.products);

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        <div className='dashboard'>
        
        {filteredProducts.map((product) => (
          <li key={product.id}  className='product'>
         <div className='product-title'><Link to={`/product/${product.id}`}>{product.title}</Link></div>   
            <img src={product.thumbnail} alt={product.title} className="product-image" />
            <p className='product-category'>Category: {product.category}</p>
            <p className='product-ratings'>Ratings: {product.ratings}</p>
            <p className='product.price'>Price: ${product.price}</p>
            {/* <Link to="/cart">Go to Cart</Link> */}
          </li>
        ))}
        
        </div>
      </ul>
     
    </div>
  );
};

export default Dashboard;