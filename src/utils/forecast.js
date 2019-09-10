const request = require('request')
const forecast = (cordinate1,cordinate2,callback)=>{
  const url  = "https://api.darksky.net/forecast/544e0340aa23d1c23b6afa2e5c229d62/"+encodeURIComponent(cordinate1+","+cordinate2);
  request({url,json:true},(error,{body})=>{
    if(error){
        callback('unable to connect')
            }else if(body.error){
                callback("Location in invalid");
            }else{
                callback(undefined,{
                    datasummary: body.daily.data[0].summary,
                    temperature: body.currently.temperature,
                    precip: body.currently.precipProbability
                }
                    );
            }
  })
}
module.exports = forecast;