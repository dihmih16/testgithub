const fs = require('fs');
const myModel = require('../models/log.model');  // nhúng thư viện Model

exports.list = async (req, res, next) => {
    // hiển thị danh sách sản phẩm

    // chức năng lọc: 
    // kiểm tra tồn tại tham số
    let dieu_kien = null;

    if (typeof (req.query.name) != 'undefined') {
        let name = req.query.name;
        dieu_kien = { name: name };
    }

    // var list = await myModel.spModel.find(  dieu_kien   ).sort( { name: 1 });// tìm sp
    // cải tiến lệnh lấy ds: lấy thêm thể loại
    var list = await myModel.logModel.find(dieu_kien)
        .populate('id_trangthai') // tên cột tham chiếu
        ;// tìm sp
    console.log(list);

    res.render('log/listlog', { listLog: list }); // truyền DS ra view
}


exports.add = async (req, res, next) => {
    let msg = ''; // ghi câu thông báo
    var url_img = '';
    // lấy danh sách thể loại đưa lên form
    let listTrangThai = await myModel.trangThaiModel.find();

    if (req.method == 'POST') {
        await fs.promises.rename(req.file.path,'./public/uploads/'+req.file.originalname)
        url_img='/uploads/'+req.file.originalname;
        console.log("upload thành công"+url_img);
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.
        // tạo đối tượng model 
        let objLog = new myModel.logModel();
        objLog.name = req.body.name;
        objLog.img = url_img;
        objLog.noidung = req.body.noidung;
        objLog.id_trangthai = req.body.trangthai;// thêm dòng này để có thể loại

        try {
            let new_sp = await objLog.save();

            console.log(new_sp);

            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + error.message;

        }

    }

    res.render('log/addlog', { msg: msg, listTrangThai: listTrangThai });
}

exports.addImg = async (req, res, next)=>{
    var url_image =  "" ;

    console.log(req.method);
     if(req.method == 'POST'){
        // xử lý upload 
        console.log(req.file, req.body);
        // sử dụng hàm fs.rename để di chuyển file
        try {
            await fs.rename(req.file.path,  './public/uploads/'+req.file.originalname )
                  // đến dưới này là thành công
                  
                  //không có lỗi ==> upload thành công
                   url_image =  '/uploads/'+ req.file.originalname ;
                   console.log("upload thanh cong" + url_image);
                     
        } catch (error) {
            // nếu có lỗi thì xảy ra lỗi ở đây

        }
         
    }

    
    console.log("send client ");

    res.render('log/addimg', {url_image: url_image})
}



exports.edit = async (req,res,next)=>{
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    var url_img = '';
    let listTrangThai = await myModel.trangThaiModel.find();
    let objLog = await myModel.logModel.findById(  req.params.idtt  );
    if(req.method =='POST'){
        await fs.promises.rename(req.file.path,'./public/uploads/'+req.file.originalname)
        url_img='/uploads/'+req.file.originalname;
        console.log("upload thành công"+url_img);
    
        let objLog = new myModel.trangThaiModel();
        objLog.name = req.body.name;
        objLog.img = url_img;
        objLog.noidung = req.body.noidung;
        objLog.id_trangthai = req.body.trangthai;// thêm dòng này để có thể loại
        objLog._id = req.params.idtt;
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
            await myModel.logModel.updateOne({_id:  req.params.idtt},objLog);
            res.redirect('/log');
            console.log("Đã ghi thành công");
            msg = 'Đã ghi thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
 
    }

    res.render('log/editlog', 
            {msg:msg, objLog: objLog, listTrangThai:listTrangThai})

}

