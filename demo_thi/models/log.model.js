var db = require('./db');
const spSchema = new db.mongoose.Schema(
    {
        // đối tượng này định nghĩa cấu trúc của model 
        name: { type: String , required: true }, // yêu cầu bắt buộc phải nhập và chỉ nhập chuối
        noidung: { type: String, required: true},
        img: {type: String, required: true}, // không bắt buộc nhập
        id_trangthai :{type: db.mongoose.Schema.Types.ObjectId, ref: 'trangThaiModel'}
    },
    {
        collection: 'san_pham'  // xác định tên collection trong CSDL 
    }
);

// sau này định nghĩa thêm schema về thể loại ở trong này, nếu với user thì định nghĩa file mới
const trangThaiSchema = db.mongoose.Schema(
    {
        name:{ type: String, required: true},
        noidung:{ type: String, required: true},
        img:{ type: String, required: true},
        id_trangthai:{type: db.mongoose.Schema.Types.ObjectId,ref:'trangThaiModel'}

    },
    { collection: 'trang_thai'}
);

let logModel = db.mongoose.model('logModel', spSchema );
let trangThaiModel = db.mongoose.model('trangThaiModel', trangThaiSchema);

module.exports = {
    logModel, trangThaiModel
}