'use client';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Link from "next/link";
const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((count, item) => count + Number(item.quantity), 0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
        const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
  return (
    <>
      
        <header className="header_section">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <Link href="/" className="navbar-brand a" >
                <img src="/images/logocoistore.png" width="100%" alt="" />
              </Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className=""></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link href="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/gioithieu" className="nav-link">Giới thiệu</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/sanpham" className="nav-link">Sản Phẩm</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/giohang" className="nav-link">Giỏ Hàng</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/contact" className="nav-link">Contact Us</Link>
                  </li>
                  
                  <li>
                  <form class="d-flex ms-4" action="/timkiem">
  <input class="form-control me-2" name="keyword" placeholder="Nhập tên sản phẩm" />
  <button class="btn btn-outline-success" type="submit" >Tìm</button>
</form>  
                  </li>
                </ul>
                <div className="user_option_box">
                  <Link href="/dangky"><i className="fa fa-user" aria-hidden="true"></i></Link>
                  <Link href="/dangnhap"><i className="fa fa-user" aria-hidden="true"></i></Link>
                  <Link href="/giohang">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span id="amount-cart" class="text-white  position-absolute top-0 start-75 translate-middle bg-success px-2 rounded-circle">
                   {cartCount}
                   </span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
          <div id="account" class="d-flex justify-content-center align-items-center rounded-circle bg-black bg-opacity-10  mx-2 px-2 py-1">
                        <Link href={isLoggedIn ? '/info' : '/dangnhap'}>
                            <i class={isLoggedIn ? "bi bi-person fs-5  fw-bolder text-dark" : "bi bi-box-arrow-in-right fs-5  fw-bolder text-dark"} />
                        </Link>
                    </div>
        </header>
       
      
    </>
  );
}
export default Header;