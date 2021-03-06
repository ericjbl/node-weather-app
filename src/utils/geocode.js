const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZXJpY2pibCIsImEiOiJja3FibzQ3aHowbDNpMnF0OWt6MHluZXhlIn0.ecnfOK9Kwoz8fk_nJBupSA&limit=1'
    request({url, json: true}, (error,{body}={}) => {
        if(error){
            console.log('Unable to connect to geocoding service!')
            callback('Unable to connect to geocoding service!',undefined)
        }else if(body.features.length === 0){
            console.log('Unable to find location.')
            callback('Unable to find location.',undefined)
        }else{
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
        }
    })
}

module.exports = geocode 