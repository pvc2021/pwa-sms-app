var express=require("express");
var cors=require("cors");
const Vonage = require('@vonage/server-sdk')
const vonage = new Vonage({
  apiKey: "8045d616",
  apiSecret: "Nlmfhpv1wNcQWVIR"
});

const from = "Vonage APIs";


let app=express();

app.use(express.json());
app.use(cors());
app.get("/sendotp",function(request,response){

let to="91"+request.query.to;  
let message="1234";
 vonage.message.sendSms(from, to, message, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
              return   response.json({"message":"Otp 1234 generated for online tx is :sent successfully to mobile "+to});
            
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
              return  response.json({"message":`Message failed with error: ${responseData.messages[0]['error-text']}`});
           
            }
        }
 });

});


app.get("/validateotp",function(request,response){

    let to="91"+request.query.to;
    let code=request.query.code;
      
       
     vonage.verify.request({
            number: to,
            brand: "Vonage"
          }, (err, result) => {
            if (err) {
              console.error(err);
            } else {
              const verifyRequestId = result.request_id;
              console.log('request_id', verifyRequestId);
                  
              vonage.verify.check({
                request_id: verifyRequestId,
                code: code
              }, (err, result) => {
                if (err) {
                  console.error(err);
                  response.json({"message":`Code is wrong`});
                } else {
                    response.json({"message":`Code is verfied successfully`});
                  }
              });
         }
      });

    });
    




app.post("/sendotp",function(request,response){

    console.log("In post send otp :",request.body.to);
        
    let to="91"+request.body.to;    
    let message="Otp generated for online tx is   1234  ";
    
    vonage.message.sendSms(from, to, message, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
                response.json({"message":"OTP  sent successfully to mobile "+to});
    
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                response.json({"message":`Message failed with error: ${responseData.messages[0]['error-text']}`});
     
            }
        }
     });
    


    });
    

app.listen(3000,function(){
    console.log("==========Express Server started on port 3000==============");
});
