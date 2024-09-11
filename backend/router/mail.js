// var express = require('express');
// const nodemailer = require('nodemailer');
// const session = require('express-session');
// var app = express();

// app.use(express.json()); // Thêm dòng này để phân tích cú pháp JSON

// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true
// }));

// function createOrderEmailContent(orders) {
//     let content = `
//       <div style="padding: 10px; background-color: #003375">
//         <div style="padding: 10px; background-color: white;">
//           <h4 style="color: #0085ff">Thông tin đơn hàng</h4>
//           <table style="width: 100%; border-collapse: collapse;">
//             <thead>
//               <tr>
//                 <th style="border: 1px solid black; padding: 8px;">Tên Sản Phẩm</th>
//                 <th style="border: 1px solid black; padding: 8px;">Ảnh Sản Phẩm</th>
//                 <th style="border: 1px solid black; padding: 8px;">Số Lượng</th>
//                 <th style="border: 1px solid black; padding: 8px;">Giá</th>
//                 <th style="border: 1px solid black; padding: 8px;">Tổng</th>
//               </tr>
//             </thead>
//             <tbody>`;

//     orders.forEach(order => {
//         order.sanphams.forEach(product => {
//             content += `
//               <tr>
//                 <td style="border: 1px solid black; padding: 8px;">${product.tensp}</td>
//                 <td style="border: 1px solid black; padding: 8px;"><img src="${product.hinhsp}" width="20%" alt=""></td>
//                 <td style="border: 1px solid black; padding: 8px;">${product.soluong}</td>
//                 <td style="border: 1px solid black; padding: 8px;">${product.giasp.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
//                 <td style="border: 1px solid black; padding: 8px;">${(product.giasp * product.soluong).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
//               </tr>`;
//         });

//         content += `
//           <tr>
//             <td colspan="4" style="border: 1px solid black; padding: 8px; text-align: right;"><strong>Tổng cộng:</strong></td>
            
//             <td style="border: 1px solid black; padding: 8px;">${order.tongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
//           </tr>`;
//     });

//     content += `
//             </tbody>
//           </table>
//         </div>
//       </div>
//     `;

//     return content;
// }

// app.post('/send-mail', function(req, res) {
//     const orders = req.body.donhangs; // Lấy dữ liệu đơn hàng từ phần thân của yêu cầu
//     console.log('Received Orders:', orders);

//     var transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true,
//         auth: {
//             user: 'hominhtri0712@gmail.com',
//             pass: 'tonv codj wrdc wtmd'
//         },
//         tls: {
//             rejectUnauthorized: false
//         }
//     });

//     const content = createOrderEmailContent(orders);

//     var mainOptions = {
//         from: 'hominhtri0712@gmail.com',
//         to: 'hominhtri0712@gmail.com', // Đổi thành địa chỉ người nhận bạn muốn gửi mail tới
//         subject: 'Thông tin đơn hàng',
//         html: content
//     };

//     transporter.sendMail(mainOptions, function(err, info) {
//         if (err) {
//             console.log(err);
//             res.status(500).send('Lỗi gửi mail: ' + err);
//         } else {
//             console.log('Message sent: ' + info.response);
//             res.status(200).json({ message: 'Email đã được gửi thành công!' });
//         }
//     });
// });

// app.get('/check-session', (req, res) => {
//     if (req.session.donhangs) {
//         res.status(200).json({ message: 'Session tồn tại', data: req.session.donhangs });
//     } else {
//         res.status(404).json({ message: 'Session không tồn tại' });
//     }
// });

// module.exports = app;


// // var express = require('express');
// // const nodemailer = require('nodemailer');
// // const session = require('express-session');
// // var app = express();
// // app.use(express.json()); 

// // app.use(session({
// //   secret: 'your-secret-key',
// //   resave: false,
// //   saveUninitialized: true
// // }));

// // function createOrderEmailContent(orders) {
// //     let content = `
// //       <div style="padding: 10px; background-color: #003375">
// //         <div style="padding: 10px; background-color: white;">
// //           <h4 style="color: #0085ff">Thông tin đơn hàng</h4>
// //           <table style="width: 100%; border-collapse: collapse;">
// //             <thead>
// //               <tr>
// //                 <th style="border: 1px solid black; padding: 8px;">Tên Sản Phẩm</th>
// //                 <th style="border: 1px solid black; padding: 8px;">Số Lượng</th>
// //                 <th style="border: 1px solid black; padding: 8px;">Giá</th>
// //                 <th style="border: 1px solid black; padding: 8px;">Tổng</th>
// //               </tr>
// //             </thead>
// //             <tbody>`;

// //     orders.forEach(order => {
// //         order.sanphams.forEach(product => {
// //             content += `
// //               <tr>
// //                 <td style="border: 1px solid black; padding: 8px;">${product.tensp}</td>
// //                 <td style="border: 1px solid black; padding: 8px;">${product.soluong}</td>
// //                 <td style="border: 1px solid black; padding: 8px;">${product.giasp.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
// //                 <td style="border: 1px solid black; padding: 8px;">${(product.giasp * product.soluong).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
// //               </tr>`;
// //         });

// //         content += `
// //           <tr>
// //             <td colspan="3" style="border: 1px solid black; padding: 8px; text-align: right;"><strong>Tổng cộng:</strong></td>
// //             <td style="border: 1px solid black; padding: 8px;">${order.tongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
// //           </tr>`;
// //     });

// //     content += `
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     `;

// //     return content;
// // }

// // app.post('/send-mail', function(req, res) {
// //    console.log('Session Data:', req.session);
// //     console.log('Stored Orders:', req.session ? req.session.donhangs : null);
// //     // Lấy đơn hàng từ session storage
// //     const storedOrders = req.session ? req.session.donhangs : null;
// //     const orders = storedOrders ? JSON.parse(storedOrders) : [];

// //     var transporter = nodemailer.createTransport({
// //         host: 'smtp.gmail.com',
// //         port: 465,
// //         secure: true,
// //         auth: {
// //             user: 'hominhtri0712@gmail.com',
// //             pass: 'tonv codj wrdc wtmd'
// //         },
// //         tls: {
// //             rejectUnauthorized: false
// //         }
// //     });
        
// //     const content = createOrderEmailContent(orders);

// //     var mainOptions = {
// //         from: 'hominhtri0712@gmail.com',
// //         to: 'hominhtri0712@gmail.com', // Đổi thành địa chỉ người nhận bạn muốn gửi mail tới
// //         subject: 'Thông tin đơn hàng',
// //         html: content
// //     };

// //     transporter.sendMail(mainOptions, function(err, info) {
// //         if (err) {
// //             console.log(err);
// //             res.status(500).send('Lỗi gửi mail: ' + err);
// //         } else {
// //           console.log('Message sent: ' + info.response);
// //           console.log(orders);
// //           res.status(200).json({ message: 'Email đã được gửi thành công!' });
// //         }
// //     });
// // });
// // app.get('/check-session', (req, res) => {
// //   if (req.session.donhangs) {
// //       res.status(200).json({ message: 'Session tồn tại', data: req.session.donhangs });
// //   } else {
// //       res.status(404).json({ message: 'Session không tồn tại' });
// //   }
// // });

// // module.exports = app;


