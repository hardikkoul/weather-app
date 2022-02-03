const api={
    key: "9aad654ce105b8db06c16a501ad09770",
    base: "http://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);


function setQuery(evt){
    if(evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }


var weather_text;

function displayResults(weather) {
    console.log('Weather is:', weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    weather_text = weather_el.innerText;
    console.log("weather text =",weather_text);

    var bgimg = document.getElementById("bg");
    if(weather_text == 'Fog'){
        bgimg.style.backgroundImage="url('images/fog.jpg')";
    }

    else if (weather_text=='Clouds'){
        bgimg.style.backgroundImage="url('images/clouds.jpg')";
    }

    else if (weather_text=='Rain'){
        bgimg.style.backgroundImage="url('images/rain.jpg')";
    }

    // timeCalculator();

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `Max ${Math.round(weather.main.temp_min)}°C / Min ${Math.round(weather.main.temp_max)}°C`;
}

// function timeCalculator(){
// var today = new Date();
// var time = today.getHours();
// console.log("time::",time);
// }

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}