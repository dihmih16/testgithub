var express = require('express');
var router = express.Router();
var spCtrl = require("../controllers/log.controllers");

var multer = require('multer'); // dùng upload file
var uploader =  multer({dest: './tmp'});


// list sp
router.get('/', spCtrl.list );

router.get('/add', spCtrl.add);
// upload file:

// router.get('/addimg', spCtrl.addImg);
// router.post('/addimg', uploader.single('img'),  spCtrl.addImg);

router.get('/add', spCtrl.add);
router.post('/add',uploader.single('img'),spCtrl.add);

// chức năng sửa <a href="/sp/edit/xxxxxxxx">  <%= row._id %>    </a>

router.get('/edit/:idtt', spCtrl.edit);
router.post('/edit/:idtt',uploader.single('img'), spCtrl.edit);

module.exports = router;

