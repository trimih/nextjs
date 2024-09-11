export default async function Page(params) {
    const res = await fetch('http://localhost:3000/sanpham/'+params.searchParams.id)
    const sp = await res.json()
    return (
        
        <div class="box ctbox">
           
          <div class="card">
            <div class="card-header text-black">
              <h2 class="mb-0">{sp.name}</h2>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6 ">
                  <img className="ctimg" src={sp.image} />
                </div>
                <div class="col-md-6">
                  <h3 class="card-title">{sp.name}</h3>
                  <p class="card-text"><strong>Giá:</strong>{sp.price.toLocaleString('vi-VN')} VND</p>
                  <p class="card-text"><strong>Mô tả:</strong>{sp.description}</p>
                  <button class="btn btn-primary">Thêm vào giỏ hàng</button>
                </div>
              </div>
            </div>
          </div>
       
        
        </div>
      )
      }
              