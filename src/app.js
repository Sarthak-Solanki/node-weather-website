const path = require("path")
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Defines pasth for express js
const publicdirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handle bars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
//hbs.registerPartials(partial)

//setup static  direcfory to use
app.use(express.static(publicdirectory))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name :'Sarthak Solanki'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name :'Sarthak Solanki'
    });
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name :'Sarthak Solanki',
        helptext:"this is for help"
    });
})
app.get('/weather', (req, res) => {
  if(!req.query.address){
      return res.send({
          error: 'you must provide address'
      })
  }
  const type = req.query.address;
  geocode(type , (error, { latitude, longitude, location} = {}) => {
    if(error){
        return res.send({
            error:"location is incorrect"
        });
        
    } 
  
    forecast(latitude, longitude, (error, forecastData) => {
        if(error){
            return ;
        }
        res.send({
            address: req.query.address,
            forecast:forecastData,location
        })
    })
  })
})
app.get('/help/*',(req,res)=>{
    res.render('error404',{
        title:'404',
        message:"help page not found",
    name:"Sarthak"
    })
})
app.get('*',(req,res)=>{
    res.render('error404',{
        title:'404',
        message:"error 404",
        name:"Sarthak"
    })
})
app.listen(3000, () => {
  console.log('server started')
})
