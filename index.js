require('dotenv').config();
const axios = require('axios');
const leTeclado = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function chamadasApis(nome_cidade, codigo_pais){
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${nome_cidade},${codigo_pais}&limit=${process.env.limit}&appid=${process.env.api_key}`).
    then(response => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=${process.env.units}&lang=${process.env.langua}&appid=${process.env.api_key}`)
        .then(response => { console.log(`\nCidade de: ${response.data.name}\nSensação térmica: ${response.data.main.feels_like}\nDescrição das condições climáticas: ${response.data.weather[0].description}`); })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}

function fluxoDoPrograma(){
    leTeclado.question("Qual a cidade? ", response1 => {
        leTeclado.question("Qual o código do país? ", response2 => {
            chamadasApis(response1, response2)
            leTeclado.close();
        })
    })
}

fluxoDoPrograma();

