'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function EditCate({ params }) {
  const router = useRouter();
  const id = params.id;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    //khai báo
    const getCategories = async () => {
      const res = await fetch('http://localhost:3000/danhmuc');
      const data = await res.json();
      setCategories(data);
    };
    //gọi hàm
    getCategories();
    //lấy dữ liệu từ server
    const getProduct = async () => {
      const res = await fetch(`http://localhost:3000/sanpham/${id}`);
      const data = await res.json();
      setProduct(data);
      // Đặt giá trị ban đầu cho form
      setValue('name', data.name);
      setValue('price', data.price);
      setValue('image', data.image);
      setValue('description', data.description);
      setValue('categoryId', data.categoryId);
    };
    if (id) {
      getProduct();
    }
  }, [id, setValue]);//chạy lại khi id và setValue thay đổi

  const onSubmit = async (data) => {
    const updatedProduct = {
      name: data.name,
      price: data.price,
      image: data.image, // Sử dụng link ảnh thay vì tệp
      description: data.description,
      categoryId: data.categoryId,
    };

    const res = await fetch(`http://localhost:3000/sanpham/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });

    const result = await res.json();
    if (!result.error) {
      router.push('/sanpham');
    } else {
      console.error(result.error);
    }
  };

  return (
    <div className="m-3">
      <h2>Chỉnh sửa sản phẩm</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group my-2">
          <label className='form-label'>Tên sản phẩm</label>
          <input type="text" className="form-control" {...register('name', { required: 'Tên sản phẩm là bắt buộc' })} />
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Giá</label>
          <input type="number" className="form-control" {...register('price', { required: 'Giá là bắt buộc', valueAsNumber: true })} />
          {errors.price && <div className="text-danger">{errors.price.message}</div>}
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Mô tả</label>
          <textarea className="form-control" {...register('description', { required: 'Mô tả là bắt buộc' })} />
          {errors.description && <div className="text-danger">{errors.description.message}</div>}
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Hình ảnh</label>
          <input type="text" className="form-control" {...register('image', { required: 'Hình ảnh là bắt buộc' })} />
          {errors.image && <div className="text-danger">{errors.image.message}</div>}
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Danh mục</label>
          <select className='form-control' {...register('categoryId', { required: 'Chọn một danh mục' })}>
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <div className="text-danger">{errors.categoryId.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary my-3">Cập nhật sản phẩm</button>
      </form>
    </div>
  );
}
