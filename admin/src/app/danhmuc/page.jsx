import Link from "next/link";

export default async function Products()  {
  const res = await fetch("http://localhost:3000/danhmuc",{
    cache :'no-store'
  });
  const data = await res.json();
  console.log(data);
  return (
    <div className="m-3">
      <h2>Quản lý danh mục</h2>
      <Link className="btn btn-primary" href="/danhmuc/them" >Thêm danh mục</Link>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Danh mục</th>
            <th>Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {data.map((danhmuc,index) => (
            <tr key={danhmuc._id}>
              <td>{index+1}</td>
              <td>{danhmuc.name}</td>
              <td>
                <Link  className="btn btn-primary mx-2" href={`/danhmuc/sua/${danhmuc._id}`}>Sửa</Link>
                <Link  className="btn btn-danger" href={`/danhmuc/xoa?id=${danhmuc._id}`}>Xóa</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};