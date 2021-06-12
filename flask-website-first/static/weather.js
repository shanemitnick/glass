var apiKey = "0e414537796faef4dd45f1c240a8b4ab";

//grab geolocation & fill card
var currentDate = document.querySelector('.date-current');
currentDate.innerText = new Date(Date.now()).toLocaleString();

let long= 40.4406;
let lat = 79.9959;
let cnt = 5;
let currentCity;
let currentTemp;
let currentIcon;

window.addEventListener('load', () => {
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(position =>{
      long = position.coords.longitude;
      lat = position.coords.latitude;
  
var currentUrl = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${long}&cnt=${cnt}&appid=${apiKey}&units=metric`

fetch(currentUrl)
    .then(response =>{
        return response.json();
  })
    .then(data => {var {main, sys, weather} = data;
  currentCity = `${data.list[0].name}, ${data.list[0].sys.country}`;   
  var ourCity = document.querySelector('.city-current');
ourCity.innerText = currentCity; 
  
currentTemp = Math.round((data.list[0].main['temp']) * 9 / 5 + 32);                 
   var ourTemp = document.querySelector('.city-temp');
   ourTemp.innerHTML = `${currentTemp}<sup>${'ºF'}</sup>`;

                   currentIcon = data.list[0].weather[0]['main'].toLowerCase();
  var ourIcon = document.querySelector('.weather-icon-current');
    ourIcon.className += ' '+currentIcon;               console.log(ourIcon.className);
      })
    }
  )}else{
var currentUrl = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${long}&cnt=${cnt}&appid=${apiKey}&units=metric`

fetch(currentUrl)
    .then(response =>{
        return response.json();
  })
    .then(data => {var {main, sys, weather} = data;
  currentCity = `${data.list[0].name}, ${data.list[0].sys.country}`;   var ourCity = document.querySelector('.city-current');
ourCity.innerText = currentCity; 
  
currentTemp = Math.round((data.list[0].main['temp']) * 9 / 5 + 32);                 
   var ourTemp = document.querySelector('.city-temp');
   ourTemp.innerHTML = `${currentTemp}<sup>${'ºF'}</sup>`;

                   currentIcon = data.list[0].weather[0]['main'].toLowerCase();
  var ourIcon = document.querySelector('.weather-icon-current');
    ourIcon.className += ' '+currentIcon;               
      }) 
  }
})                                 


//search function- search a city and add it to your weather cards
var form = document.querySelector(".top-banner form");
var input = document.querySelector(".top-banner input");
var msg = document.querySelector(".top-banner .msg");
var list = document.querySelector(".ajax-section .cities");

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  //check if there's already a city
  var listItems = list.querySelectorAll(".ajax-section .city");
  var listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    var filteredArray = listItemsArray.filter(el => {
      let content = "";
      if (inputVal.includes(",")) {
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else if (el.querySelector(".city-name")){
        content = el.querySelector(".city-name").innerText.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well`;
      form.reset();
      input.focus();
      return;
    }
  }

  var url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      var { main, name, sys, weather, dt, timezone } = data;
      var icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`
      var weatherIcon = `${weather[0]['main'].toLowerCase()}`
      var date = new Date(Date.now()-timezone); 
   
      var li = document.createElement("ul");
      li.classList.add("city");
      var markup = `
    <div class="weather-card ${name}">
    <div class="weather-icon ${weather[0]['main'].toLowerCase()}"></div>
    <span class="date">${date.toLocaleDateString()}</span>
        <p class="city-name" data-name="${name},${sys.country}">
         ${name},     ${sys.country}
        </p>
        <h1 class="city-temp">${Math.round(main.temp * 9 / 5 + 32)}<sup>°F</sup> </h1>
</div>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "INVALID CITY. Note: country code fine, but state & full country name not needed!";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});