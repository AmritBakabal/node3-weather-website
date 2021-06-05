const path=require('path');  //given by node js 
const express=require('express');
const hbs=require('hbs'); 
const port=3000;
// const request=require('request');
const geocode= require('./utils/geocode');
const forecast=require('./utils/forecast');

const app= express();
// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

//define paths for express config
const publicdirectoryPath= path.join(__dirname,'../public') ;
const viewspath=path.join(__dirname,'../templates/views');
const partialsPath= path.join(__dirname,'../templates/partials');

//setup static directory to serve
app.use(express.static(publicdirectoryPath));
//because of above static this function is not loaded but it works still the same for root route.
// app.get('',(request,response)=>{

//     response.send('<h1>WEATHER</h1>');
    
// })

//for handlebars with this one line statement express detects this and changes into dynamic pages.
//because of this we can access hbs pages like index.hbs, about.hbs etc

//setup handlebars engine and views location
app.set('views',viewspath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);


app.use(express.static(publicdirectoryPath));
//simply using this we can access html pages by 3000/index.html or help.html etc. and we can remove the previous route handlers.

//help route
// app.get('/help',(request,response)=>{
//     response.send([{
//         name:'Amrit',
//         Age:22
//     },{
//         name:'Samina',
//         Age:23
//     }]);
// })

//about route
// app.get('/about',(request,response)=>{
//     response.send('<h2>About Page</h2>');
// })

//for index.hbs or index.html which we converted into hbs as dynamic page.
app.get('',(request,response)=>{
    response.render('index',{
        title: 'Weather app',
        name:'Amrit Bakabal'
    });
})
//for about.hbs
app.get('/about',(request,response)=>{
    response.render('about',{
        title:'About Me',
        name:'Amrit Bakabal'
    });
})
//for help.hbs
app.get('/help',(request,response)=>{
    response.render('help',{
        helptext:'This is a useful help',
        title:'Help Page',
        name:'Amrit Bakabal'
    })
})
//weather route
app.get('/weather',(request,response)=>{
    if(!request.query.address){
        return response.send({
            error:'address must be provided'
        })
    }
    console.log(request.query);
    
    // response.send([{
        // forecast: 'It is Rainy Today',
        // location:'Nepal',
        // address: request.query.address
        // }]);
        geocode(request.query.address,(error,{latitude,longitude,location}={})=>{  //={} is used for default params value for this distructuting.
            if(error){
                return response.send({error});
            }
            forecast(latitude,longitude,(error,forecastdata)=>{
                if(error){

                   return response.send({error});

                }
                response.send({
                    // location:location,
                    location, //shorthand for location:location.
                    forecast:forecastdata,
                    address:request.query.address
                })
            })

        })
})

//route product
app.get('/products',(request,response)=>{
    if(!request.query.search){
        return response.send({
            
            error: 'search value must be provided'
        }) 
    }
    console.log(request.query.search);
    response.send({
        products: []
    })
})
//for /help/no route given
app.get('/help/*',(request,response)=>{
    response.render('404error',{
        title:'404',
        name:'Amrit Bakabal',
        errormessage:'PAGE NOT FOUND'
    })
})
//for any match where route is not given. using wildcard character
app.get('*',(request,response)=>{
    response.render('404error',{
        title:'404',
        name:'Amrit Bakabal',
        errormessage:'404 ERROR!!'
    })
})


app.listen(port,()=>{
    console.log('The server is listened in 3000');
})