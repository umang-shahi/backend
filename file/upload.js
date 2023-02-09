const multer = require("multer");

//storage make

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"./public/gallery")
    },
    filename: function(req,file,cb){
       cb(null,Date.now()+file.originalname)
    }
})

const upload = multer({
    storage:storage
    
})

module.exports = upload;