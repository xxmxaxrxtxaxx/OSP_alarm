module.exports = {
    
    wyslijSMS: function (wiadomosc, numerTelefonu) {
        var request = require("request");

        var options = { method: 'POST',
          url:  process.env.SMS_ADDRESS,
          headers: 
           {
             'cache-control': 'no-cache',
             'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
          formData: 
           { key:  process.env.SMS_KEY,
             password:  process.env.SMS_PASSWORD,
             from:  process.env.SMS_FROM,
             msg: wiadomosc,
             to: numerTelefonu,
            test: process.env.SMS_TEST } };
        
        request(options, function (error, response, body) {
          if (error) {
              throw new Error(error)
            };
        
          console.log(body);
        });
        
        console.log(wiadomosc, numerTelefonu);
    }
};