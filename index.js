const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/' , function(req,res){
    res.sendFile(__dirname+'/index.html');

})

app.post('/' , function(req,res){
    console.log(req.body);
    const query = req.body.city;
    const unit = 'metric';
    const appid = '631b7d3c3c4b6e065d7928d5c60bbf4c';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+ appid+ '&units=' + unit;
    console.log(url);
    https.get(url , function(response){
        response.on('data', (data) => {
            const result = JSON.parse(data);
            const temp = result.main.temp;
            const humidity = result.main.humidity;
            const imgURl = "http://openweathermap.org/img/wn/"+ result.weather[0].icon+"@2x.png"
            res.write("<h1>"+query+"</h1>");
            res.write("<h3>Temperature (C) : "+temp+"</h3>");
            res.write("<h3>Humidity (%) : "+ humidity +"</h3>");
            res.write("<img src="+ imgURl+">");
            res.send();
            
        });
    });

})

app.listen(8000,function(){
    console.log("Server started | PORT 8000");
});