export  default async function Timkiem(params) {
    const res = await fetch('http://localhost:3000/sanpham/timkiem/' + params.searchParams.keyword);
  const data = await res.json();
  console.log(data);
 return (
<section class="product_section ">
    <div class="container">
      <div class="product_heading">
        <h2>
          Top Sale Watches
        </h2>
      </div>
      <div class="product_container">
        {data.slice(0, 4).map(sp =>(
        <div class="box">
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
          </div>
          <div class="btn-box">
            <a href="">
              Add To Cart
            </a>
          </div>
        </div>
      ))}
      </div>
    </div>
  </section>
 );
}