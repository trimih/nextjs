import Link from "next/link";
export default async function SpDanhMuc(params){
   const res = await fetch('http://localhost:3000/sanpham/danhmuc/'+params.searchParams.id);
    const data = await res.json()
    const danhmuc = await fetch("http://localhost:3000/danhmuc");
    const dm = await danhmuc.json();
    const danhmucid = await fetch('http://localhost:3000/danhmuc/'+params.searchParams.id);
    const datadm = await danhmucid.json();
    
    return(
            <>
            
     
        
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav " >
                  {dm.map((dm) => (
                    <Link  className="nav-link active dm danhmucname" href={`/sanphamdm?id=${dm._id}`} key={dm.id}>{dm.name}</Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
          <section class="product_section ">
            <div class="container">
              <div class="product_heading">
                <h2 className="danhmucname">
                {datadm.name}
                </h2>
              </div>
              <div class="product_container">
                {data.slice(0,6).map(sp =>(
                <div class="box">
                  <Link href={`/chitietsanpham/${sp._id}`}>
                  <div class="box-content">
                    <div class="img-box">
                      <img src={sp.image} alt=""/>
                    </div>
                    <div class="detail-box">
                      <div class="text">
                        <h6>
                          {sp.name}
                        </h6>
                        <h5>
                        {sp.price.toLocaleString('vi-VN')} VND
                        </h5>
                      </div>
                      {/* <div class="like">
                        <h6>
                          Like
                        </h6>
                        <div class="star_container">
                          <i class="fa fa-star" aria-hidden="true"></i>
                          <i class="fa fa-star" aria-hidden="true"></i>
                          <i class="fa fa-star" aria-hidden="true"></i>
                          <i class="fa fa-star" aria-hidden="true"></i>
                          <i class="fa fa-star" aria-hidden="true"></i>
                        </div>
                      </div> */}
                    </div>
                  </div></Link>
                  <div class="btn-box">
                    <Link href={`/giohang`}>
                      Add To Cart
                    </Link>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </section>
          <section class="contact_section layout_padding">
            <div class="container">
              <div class="heading_container">
                <h2>
                  Contact Us
                </h2>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form_container">
                    <form action="">
                      <div>
                        <input type="text" placeholder="Your Name" />
                      </div>
                      <div>
                        <input type="text" placeholder="Phone Number" />
                      </div>
                      <div>
                        <input type="email" placeholder="Email" />
                      </div>
                      <div>
                        <input type="text" class="message-box" placeholder="Message" />
                      </div>
                      <div class="btn_box">
                        <button>
                          SEND
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-md-6 ">
                  <div class="map_container">
                    <div class="map">
                      <div id="googleMap"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
         
        
        
        
         
           <section class="client_section layout_padding-bottom">
            <div class="container">
              <div class="heading_container heading_center">
                <h2>
                  Testimonial
                </h2>
              </div>
            </div>
            <div id="customCarousel2" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-10 mx-auto">
                        <div class="box">
                          <div class="img-box">
                            <img src="images/client.jpg" alt=""/>
                          </div>
                          <div class="detail-box">
                            <div class="client_info">
                              <div class="client_name">
                                <h5>
                                  Morojink
                                </h5>
                                <h6>
                                  Customer
                                </h6>
                              </div>
                              <i class="fa fa-quote-left" aria-hidden="true"></i>
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                              labore
                              et
                              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                              cillum
                              dolore eu fugia
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-10 mx-auto">
                        <div class="box">
                          <div class="img-box">
                            <img src="images/client.jpg" alt=""/>
                          </div>
                          <div class="detail-box">
                            <div class="client_info">
                              <div class="client_name">
                                <h5>
                                  Morojink
                                </h5>
                                <h6>
                                  Customer
                                </h6>
                              </div>
                              <i class="fa fa-quote-left" aria-hidden="true"></i>
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                              labore
                              et
                              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                              cillum
                              dolore eu fugia
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-10 mx-auto">
                        <div class="box">
                          <div class="img-box">
                            <img src="images/client.jpg" alt=""/>
                          </div>
                          <div class="detail-box">
                            <div class="client_info">
                              <div class="client_name">
                                <h5>
                                  Morojink
                                </h5>
                                <h6>
                                  Customer
                                </h6>
                              </div>
                              <i class="fa fa-quote-left" aria-hidden="true"></i>
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                              labore
                              et
                              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                              cillum
                              dolore eu fugia
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ol class="carousel-indicators">
                <li data-target="#customCarousel2" data-slide-to="0" class="active"></li>
                <li data-target="#customCarousel2" data-slide-to="1"></li>
                <li data-target="#customCarousel2" data-slide-to="2"></li>
              </ol>
            </div>
          </section>
          
        
          </>
        
          );
    
}