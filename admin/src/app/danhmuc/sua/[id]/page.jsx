'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function EditProduct({ params }) {
  const router = useRouter();
  const id = params.id;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [product, setProduct] = useState(null);

  useEffect(() => {
 
    const getCate = async () => {
      const res = await fetch(`http://localhost:3000/danhmuc/${id}`);
      const data = await res.json();
      setProduct(data);
      // Đặt giá trị ban đầu cho form
      setValue('name', data.name);
    };
    if (id) {
        getCate();
    }
  }, [id, setValue]);//chạy lại khi id và setValue thay đổi

  const onSubmit = async (data) => {
    const updatedProduct = {
      name: data.name,
    };

    const res = await fetch(`http://localhost:3000/danhmuc/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });

    const result = await res.json();
    if (!result.error) {
      router.push('/danhmuc');
    } else {
      console.error(result.error);
    }
  };

  return (
    <div className="m-3">
      <h2>Chỉnh sửa sản phẩm</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group my-2">
          <label className='form-label'>Tên danh mục</label>
          <input type="text" className="form-control" {...register('name', { required: 'Tên danh mục là bắt buộc' })} />
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </div>
        
        <button type="submit" className="btn btn-primary my-3">Cập nhật sản phẩm</button>
      </form>
    </div>
  );
}
