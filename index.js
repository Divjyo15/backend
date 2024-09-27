 const express = require('express');
 const path = require('path');
 const app = express();
 const multer = require('multer');
 app.set("view engine","ejs")
 app.set("views",path.resolve('./view'));
app.use(express.urlencoded({extended:false}))
const port = 3000;
const uploads =multer({dest: "uploads/"});
const storage = multer.diskStorage({
destination:function(req,file,cb){
   return cb(null,'./uploads');
},
filename:function(req,file,cb){
    return cb(null,`${Date.now()}-${file.originalname}`);
},
})
const upload = multer({storage})
app.get("/",(req,res) =>{
 return res.render("homepage");
})
app.post("/upload" , upload.single("profileimage"),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/");

});

app.listen(port,() =>{
    console.log(`Server is running on port ${port}`)
})