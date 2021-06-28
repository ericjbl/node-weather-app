const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Eric Barbosa'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Eric Barbosa'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        helpText: 'This is an App where you can search your weather by location.',
        title: 'Help',
        name: 'Eric Barbosa'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address) {
       return res.send({
            error: 'You must provide an address.'
        })
      }

          geocode (req.query.address,(error,{latitude,longitude,location} = {}) => {
            if (error) {
                return res.send({
                    error
                })            }
            forecast (latitude,longitude,(error,forecastData) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                res.send({
                    Location: location,
                    address : req.query.address,
                    Data: forecastData
                })

            })
        })
      
  })

app.get('/help/*',(req,res) => {
    res.render('404', {
        errorText: 'Help article not found',
        title: '404',
        name: 'Eric Barbosa'
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        errorText: 'Page Not Found',
        title: '404',
        name: 'Eric Barbosa'
    })
})



app.listen(3000,() => {
    console.log('Server running on port 3000')
})

