const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=78ee1011713febbb1328af4acfdd6842&query='+latitude+','+longitude+'&units=f'
    request({url, json: true}, (error, { body } = {}) => {
        if(error){
            console.log('Unable to connect to weather service!')
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            console.log('Unable to find location.')
            callback('Unable to find location.',undefined)
        }else{
        callback(undefined,body.current.weather_descriptions[0]+ ".It is currently " + body.current.temperature + " degree out, but it feels like " + body.current.feelslike+".The humidity is "+body.current.humidity+".")
        }
    })
}

module.exports = forecast 