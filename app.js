const express=require("express");
const https=require("https")
const bodyParser=require("body-parser")

const app=express()
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html")

})

app.post("/", function(req, res){
    const query=req.body.city
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=b5a446ded8a14e7c72b37372bf81bed5"
    https.get(url, function(resp){
        console.log(resp)
        resp.on("data", function(data){
            const weatherData=JSON.parse(data)
            const temp=weatherData.main.temp
            const weatherDesc=weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The description of the weather is "+weatherDesc+"</p>")
            res.write("<h1> The temperature right now in "+query+ " is "+temp+" degree celcius</h1>")
            res.write("<img src= " + imgUrl+">")
            res.send()
        })
    })
})

app.listen(3000, function(){
    console.log("Port 3000 started running")
})

