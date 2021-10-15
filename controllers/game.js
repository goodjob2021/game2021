const hocvien = require("../models/hocvien");
module.exports=function(app){
    app.get("/", function(req, res){
        //res.send("ok");
        res.render('layout');
    });
    app.post("/dangky",function(req,res){
        //console.log(req);
        if (!req.body.Email || !req.body.Hoten || !req.body.SoDT){
            res.json({ketqua:0,maloi:"Bạn phải nhập đủ thông tin,  để có thể tiếp tục"})
        }else{
            var hocvienmoi=new hocvien({
                Email: req.body.Email,
                Hoten: req.body.Hoten,
                SoDT: req.body.SoDT,
                Thanhtoan: false,
                Vi: "",
                Ngay: Date.now()
            })

            hocvienmoi.save(function(err){
                if (err){
                    res.json({ketqua:0, maloi:err})
                }else{
                    res.json({ketqua:1, maloi:hocvienmoi})
                }
            })

        }

        
    })
};