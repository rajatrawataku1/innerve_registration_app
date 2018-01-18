var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser= require('body-parser');
app.use(cors());
app.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url='mongodb://rajatrawataku:ramu1%40boy@ds149743.mlab.com:49743/innerve_registration';
var nodemailer = require('nodemailer');
var response_value;

app.post('/authorisation',function(req,res){

  console.log("the authorisation is called");
  console.log(req.body.pr_code_value_back);

  if(req.body.pr_code_value_back=="innerve2k17")
  {
    console.log("correct_pr_code");
    res.send({"val":"valid_authorisation"});
  }
  else {
    console.log("incorrect pr code");
    res.send({"val":"invalid_authorisation"});
  }
});

app.post('/endpoint', function(req, res){
  response_value="";
  var new_registration_enroll_func = function(db,callback){
  var contents={team_name:req.body.team_name_back,college_name:req.body.colege_name_value_out_back,tel_number:req.body.telephone_value_back,email:req.body.email_value_back,team_leader_name:req.body.team_leader_name_back,event_type:req.body.event_name_value,date_of_registration:new Date()};

  if(req.body.email_value_back!=undefined)
  {
    db.collection('reg_table').insertOne(contents,function(err,res){
          assert.equal(err,null);
          console.log(req.body.email_value_back);
          console.log("Registred Sucessfully");
          response_value="Registred Sucessfully";
          db.close();

          var transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'myzoho@zoho.com',
                pass: 'myPassword'
            }
         });

          var part1='<head> <title> </title> <style> #one{ position: absolute; top:0%; left:0%; height: 60%; width: 40%; } #gatii{ position: absolute; top:26%; left:5%; height: 20%; width: 20%; } #text_div { position: absolute; top: 10%; left: 5%; } #final_regards { position: absolute; top: 50%; left: 5%; } </style> </head> <body> <div id="text_div"> <b>Welcome, to SIPcoin. You have been successfully registered on SIPcoin.io </b> <br> <br> Please click on the link below to verify your account <br><br>';

          var part2=' <br><br> <br> P.S.- You are requested to preserve this mail for future references. <br> <br> </div> <iframe id="gatii" src="https://drive.google.com/file/d/1k99fX9I4HOdhKZA1KwrDflM1W-orCSh0/preview" width="40" height="40"></iframe> <br> <br> <div id="final_regards"> Thank You, <br> <br> Team SIPcoin.io <br> <br> <a href="http://support.sipcoin.io">Support Team</a> <br> <br> </div> </body>'



          var mailOptions = {
            from: 'innervehack2k17@gmail.com',
            to: req.body.email_value_back,
            subject: ' InNerve-2k17 || Successful Registraion',
            html: '<head> <title> </title> <style> #one{ position: absolute; top:0%; left:0%; height: 60%; width: 40%; } #gatii{ position: absolute; top:5%; right:5%; height: 80%; width: 40%; } #text_div { position: absolute; top: 10%; left: 5%; } #final_regards { position: absolute; top: 50%; left: 5%; } </style> </head> <body> <div id="text_div"> <b>Congratulations, You have been successfully registered for InNerve-2k17 </b> <br> <br> We await your presence in the mega hackathon. <br> <br> P.S.- You are requested to preserve this mail for future references. <br> <br></div> <img id="gatii" src="https://s3.us-east-2.amazonaws.com/innerveeeee/img/gate_pass.jpg" height="40%" width="40%";>  <br> <br> <div id="final_regards"> Regards, <br><br> Team InNerve-2k17 <br> <br> </div> </body>',
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              console.log("email_not_sent");
              response_value="Not Registred Sucessfully";
            } else {
              console.log('Email sent: ' + info.response);
              res.writeHead(200,{'Content-Type':'text/html'});
              res.write("Your mail has been sent : "+info.response);
              response_value="Registred Sucessfully";
            }
          });
    });
  res.send({"val":response_value});

   }
  else {
    res.send({"val":"Not Registred Sucessfully"});
  }
}

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    new_registration_enroll_func(db, function() {
        db.close();
    });
  });

});

app.get('/check',function(req,res){
   console.log("sdfxcvxzcdvdadfdf");
  res.send('kutta');
})

app.get('/check',function(req,res){
  console.log("hello");
  res.send("hello");
})

app.listen(3000);

// to download the file :  mongoexport -h ds149743.mlab.com:49743 -d innerve_registration -c reg_table -u rajatrawataku -p ramu1@anshu -o reg_table.csv --csv -f team_name,college_name,tel_number,email
