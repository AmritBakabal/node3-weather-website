const request=require('request');


const forecast=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=2176000d77f2d983bb79215deb04da00&query=`+latitude+ `,` + longitude+ `&units=f`;

    // request({url:url, json:true},(error,response)=>{
        request({url,json:true},(error,{ body })=>{
        if(error){
            callback('Unable to connect to Network',undefined);
        // }else if(response.body.error){
        }else if(body.error){  //likewise remove response from other for distructing
            callback('Location Missing!!',undefined);
        }else{

            callback(undefined,body.current.weather_descriptions[0] + '.The temperature is ' + body.current.temperature + '  degree. Time of forecast is : ' + body.current.observation_time + '. And humidity is : ' + body.current.humidity)
        }
    })


}
module.exports=forecast;