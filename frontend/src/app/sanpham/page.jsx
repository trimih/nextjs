'use client';
import Link from "next/link";
import { useState, useEffect } from 'react';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('asc');
  const [catalogy, setCatalogy] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); 
  const [maxPrice, setMaxPrice] = useState(1000000000); 

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('http://localhost:3000/sanpham');
      const newProducts = await res.json();
      // console.log('All Products:', newProducts);
      // console.log('Selected Categories:', selectedCategories);
  
      const filteredProducts = newProducts.filter(product => 
        (selectedCategories.length === 0 || selectedCategories.includes(product.id_danhmuc)) &&
        product.price <= maxPrice
      );
      // includes là một phương thức của mảng trong JavaScript, kiểm tra xem một giá trị có tồn tại trong mảng hay không.
  
      // console.log('Filtered Products:', filteredProducts);
      setProducts(filteredProducts);
    }
    fetchProducts();
     async function fetchCatalogy() {
      const res = await fetch('http://localhost:3000/danhmuc');
      const newCatalogy = await res.json();
      setCatalogy(newCatalogy);
    }
    fetchCatalogy();
  }, [selectedCategories,maxPrice]);
  ;



  const handleSort = (products) => {
    return [...products].sort((a, b) => {
      if (sortOption === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  }

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories(prevCategories =>
      prevCategories.includes(value)
        ? prevCategories.filter(cat => cat !== value)
        : [...prevCategories, value]
    );
  };
  const handlePriceChange = (e) => {
    setMaxPrice(Number(e.target.value)); // Cập nhật giá tối đa
  };
  

  return (
    <>
      <section className="product_section">
        <div className="container">
          <div className="product_heading">
            <h2 className="danhmucname">SHOP</h2>
            <div className="filter-container">
              <div className="filter-checkbox">
                {catalogy.map(cata => (
                  <div key={cata._id}>
                    <input
                      type="checkbox"
                      id={`category-${cata._id}`}
                      name="category"
                      value={cata._id}
                      onChange={handleCategoryChange}
                    />
                    <label htmlFor={`category-${cata._id}`} className="dmname">{cata.name}</label>
                  </div>
                ))}
              </div>
              <select className="form-select w-auto sapxep" onChange={handleSortChange}>
                <option value="asc">Giá tăng dần</option>
                <option value="desc">Giá giảm dần</option>
              </select>
            </div>
          </div>
          <div className="price-range-container">
  <label htmlFor="maxPrice">Giá tối đa</label>
  <input
    type="range"
    id="maxPrice"
    name="maxPrice"
    min="0"
    max="1000000000"
    step="100000"
    value={maxPrice}
    onChange={handlePriceChange}
  />
  <div>
    <span className="price-value">Giá tối đa: {maxPrice.toLocaleString('vi-VN')} VND</span>
  </div>
</div>
          <div className="product_container">
            {handleSort(products).map(sp => (
              <div className="box" key={sp._id}>
                <Link href={`/chitietsanpham/${sp._id}`}>
                  <div className="box-content">
                    <div className="img-box">
                      <img src={sp.image} alt="" />
                    </div>
                    <div className="detail-box">
                      <div className="text">
                        <h6>{sp.name}</h6>
                        <h5>{sp.price.toLocaleString('vi-VN')} VND</h5>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="btn-box">
                  <a href="">Add To Cart</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className='dancach'>-</div>
    </>
  );
}
