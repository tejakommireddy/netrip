const {
   con,
   sessionStore
} = require('./config/db');

var groupBy = require('lodash.groupby');
exports.new = function (req, res) {
   message = '';
   var username = req.params.usernameOrEmail;
   var today = new Date();
   var dd = String(today.getDate()).padStart(2, '0');
   var mm = String(today.getMonth() + 1).padStart(2, '0');
   var yyyy = today.getFullYear();
   var hrs = today.getHours();
   var min = today.getMinutes();
   var sec = today.getSeconds();
   today = yyyy + '-' + mm + '-' + dd + ' ' + hrs + ':' + min + ":" + sec;
   if (req.method == "POST") {
      const post = req.body;
      username = post.username;
      const title = post.title;
      const state = post.state;
      const category = post.category;
      const description = post.description;
      if (!req.files)
         return res.status(400).send('No files were uploaded.');
      const file = req.files.uploaded_image;
      var img_name = file.name;
      if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
         file.mv('public/imgs/uploads/' + file.name, function (err) {
            var sql = "INSERT INTO `nt_data`(`username`,`title`,`state`,`category`, `images` ,`description`) VALUES (?,?,?,?,?,?)";
            var query = con.query(sql, [username, title, state, category, img_name, description], function (err) {
               console.log(err)
               if (!err) {
                  res.redirect('show/' + username);
               }
               else {
                  message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                  res.render('new.ejs', { message: message });
               }
            });
         });
      }
   }
   else {
      res.render('new', {usrname:username,today:today});
   }

};

exports.show = function (req, res) {
   let message = '';
   var username = req.params.username;
   const sql = "SELECT * FROM `nt_data` WHERE `username`='" + username + "'";
   con.query(sql, function (err, result) {
      if (result.length <= 0)
         message = "show not found!";
      res.render('show.ejs', { data: result, message: message });
   });
};




exports.index22 = function (req, res) {
   let message = '';
   const sql = "SELECT * FROM nt_data";
   con.query(sql, function (err, result) {
      if (err){
         console.log(err)
      }
      if (result.length <= 0)
         message = "page not found!";
      const maper = groupBy(result,'category');
      res.render('index22.ejs', { data: maper, message: message });
   });
}


