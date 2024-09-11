'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Trang đăng ký
export default function Register() {
    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            phone: '',
            address: '',
            password: '',
            rePassword: '',
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required('Vui lòng nhập họ và tên'),
            email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
            phone: Yup.string()
                .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ')
                .required('Vui lòng nhập số điện thoại'),
            address: Yup.string().required('Vui lòng nhập địa chỉ'),
            password: Yup.string()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số')
                .required('Vui lòng nhập mật khẩu'),
            rePassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
                .required('Vui lòng nhập lại mật khẩu'),
        }),
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const res = await fetch('http://localhost:3000/user/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullname: values.fullname,
                        email: values.email,
                        phone: values.phone,
                        address: values.address,
                        password: values.password
                    }),
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    if (res.status === 400 && errorData.message === "Email đã tồn tại") {
                        setFieldError('email', 'Email đã tồn tại');
                    } else {
                        throw new Error(errorData.message || 'Đăng ký thất bại');
                    }
                }
                // Xử lý thành công
                alert('Đăng ký thành công');
            } catch (error) {
                setFieldError('general', error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });
    return (
        <div className="container mt-3">
            <h2>Đăng ký tài khoản</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label>Họ và tên</label>
                    <input
                        type="text"
                        className="form-control"
                        {...formik.getFieldProps('fullname')}
                    />
                    {formik.touched.fullname && formik.errors.fullname ? (
                        <div className="text-danger">{formik.errors.fullname}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                        type="text"
                        className="form-control"
                        {...formik.getFieldProps('phone')}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-danger">{formik.errors.phone}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input
                        type="text"
                        className="form-control"
                        {...formik.getFieldProps('address')}
                    />
                    {formik.touched.address && formik.errors.address ? (
                        <div className="text-danger">{formik.errors.address}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Nhập lại mật khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        {...formik.getFieldProps('rePassword')}
                    />
                    {formik.touched.rePassword && formik.errors.rePassword ? (
                        <div className="text-danger">{formik.errors.rePassword}</div>
                    ) : null}
                </div>
                <button type="submit" className="btn btn-primary my-3" disabled={formik.isSubmitting}>
                    Đăng ký
                </button>
                {formik.errors.general && (
                    <p className="my-3 text-danger">{formik.errors.general}</p>
                )}
            </form>
        </div>
    );
}
