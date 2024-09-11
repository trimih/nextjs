const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const sanpham = new Schema({
    name: { type: String, },
    price: { type: Number, },
    image: { type: String, },
    description: { type: String, },
    quality: { type: Number, },
    id_danhmuc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'danhmuc',
        required: true
    }
    },{
        timestamps: true, //tự động thêm createdAt và updatedAt
    }
);
module.exports  = mongoose.model('sanpham',sanpham);