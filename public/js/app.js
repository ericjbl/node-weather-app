console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const errorMessage = document.querySelector('#message-1')
const forecastMessage = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('testing!')

    forecastMessage.textContent = 'Loading...'
    errorMessage.textContent = ''
    fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            forecastMessage.textContent = ''
            errorMessage.textContent = data.error
        } else {
            console.log(data.Location)
            console.log(data.Data)
            errorMessage.textContent = ''
            forecastMessage.textContent = data.Location+','+data.Data
        }
        
    })
})
});

