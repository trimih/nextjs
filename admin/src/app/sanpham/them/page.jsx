'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function AddProduct() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch('http://localhost:3000/danhmuc');
      const data = await res.json();
      setCategories(data);
    };
    getCategories();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Tên sản phẩm là bắt buộc'),
    price: Yup.number().required('Giá là bắt buộc').positive('Giá phải là số dương'),
    quality: Yup.number().required('Số lượng là bắt buộc').integer('Số lượng phải là số nguyên').min(1, 'Số lượng phải lớn hơn 0'),
    description: Yup.string().required('Mô tả là bắt buộc'),
    image: Yup.string().url('URL hình ảnh không hợp lệ').required('Hình ảnh là bắt buộc'),
    category: Yup.string().required('Danh mục là bắt buộc'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors, setStatus }) => {
    try {
      const res = await fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.message || 'Đã có lỗi xảy ra');
      }

      setStatus({ success: 'Sản phẩm đã được thêm thành công!' });
      router.push('/sanpham');
    } catch (err) {
      console.error('Error:', err);
      setErrors({ server: err.message });
      setStatus({ success: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="m-3">
      <h2>Thêm sản phẩm</h2>
      <Formik
        initialValues={{
          name: '',
          price: '',
          quality: '',
          description: '',
          image: '',
          category: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            {status?.server && <div className="alert alert-danger">{status.server}</div>}
            {status?.success && <div className="alert alert-success">{status.success}</div>}

            <div className="form-group my-2">
              <label className='form-label'>Tên sản phẩm</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="form-group my-2">
              <label className='form-label'>Giá</label>
              <Field type="number" name="price" className="form-control" />
              <ErrorMessage name="price" component="div" className="text-danger" />
            </div>

            <div className="form-group my-2">
              <label className='form-label'>Số Lượng</label>
              <Field type="number" name="quality" className="form-control" />
              <ErrorMessage name="quality" component="div" className="text-danger" />
            </div>

            <div className="form-group my-2">
              <label className='form-label'>Mô tả</label>
              <Field as="textarea" name="description" className="form-control" />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>

            <div className="form-group my-2">
              <label className='form-label'>Hình ảnh</label>
              <Field type="text" name="image" className="form-control" />
              <ErrorMessage name="image" component="div" className="text-danger" />
            </div>

            <div className="form-group my-2">
              <label className='form-label'>Danh mục</label>
              <Field as="select" name="category" className='form-control'>
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary my-3" disabled={isSubmitting}>
              Thêm sản phẩm
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
