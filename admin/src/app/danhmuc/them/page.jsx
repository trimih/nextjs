'use client';

import { useRef, useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function AddCate() {
  const router = useRouter();
  const name = useRef('');
  const message = useRef('');
  const error = useRef('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name: name.current.value,
      
    };
    
    try {
      const res = await fetch('http://localhost:3000/danhmuc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.message || 'Đã có lỗi xảy ra');
      }
      
      message.current = 'Sản phẩm đã được thêm thành công!';
      error.current = '';
      router.push('/danhmuc');
    } catch (err) {
      console.error('Error:', err);
      error.current = err.message;
      message.current = '';
    }
  };

  return (
    <div className="m-3">
      <h2>Thêm sản phẩm</h2>
      {error.current && <div className="alert alert-danger">{error.current}</div>}
      {message.current && <div className="alert alert-success">{message.current}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label className='form-label'>Tên danh mục</label>
          <input type="text" className="form-control" ref={name} />
        </div>
        <button type="submit" className="btn btn-primary my-3">Thêm sản phẩm</button>
      </form>
    </div>
  );
}
