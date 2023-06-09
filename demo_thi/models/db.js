const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/luyentap')

    .catch((err) => {
        console.log("Lỗi kết nối CSDL");
        console.log(err);
    })
    .finally((xxx)=>{
        console.log(xxx);
        console.log("Kết nối CSDL thành công");
    })
module.exports={mongoose};