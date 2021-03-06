const time1 = document.getElementById('time');
const date1 = document.getElementById('date');
const inputext = document.querySelector('.input');
const button = document.querySelector('.btn');
const location1 = document.getElementById('location');
const currweatherele = document.getElementById('current-weather-items');
const climate = document.getElementById('nature');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const api = 'b3b865d9b8e2a8b65c3ed02d2aaead33';


setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    time1.innerHTML = checkTime(hoursIn12HrFormat) + ':' + checkTime(minutes) + ' ' + `<span id="am-pm">${ampm}</span>`


    date1.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000);

function checkTime(i) {
    if (i < 10) {
        { i = "0" + i; }
        return i;
    } else { return i; }
}




getWeatherData()

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        //console.log(success);

        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,daily,alerts&units=metric&appid=${api}`).then(res => res.json()).then(data => {

            console.log(data)

            showWeatherData(data);

        })


    })
}


function showWeatherData(data) {


    const { timezone } = data;
    location1.textContent = timezone;




    let { feels_like, humidity, pressure, sunrise, sunset, temp, wind_speed } = data.current;
    let { description } = data.current.weather[0];



    currweatherele.innerHTML =
        `
        <div class="weather-item" id="nature">
        <p>${description}</p>

    </div>

        <div class="weather-item">
    <p>Temperature:</p>
    <p>${temp}??C</p>
</div>
<div class="weather-item">
    <p>Feels Like:</p>
    <p>${feels_like}??C</p>
</div>


<div class="weather-item">
    <p>Humidity:</p>
    <p>${humidity}%</p>
</div>
<div class="weather-item">
    <p>Pressure:</p>
    <p>${pressure}</p>
</div>
<div class="weather-item">
    <p>Wind Speed: </p>
    <p>${wind_speed}m/s</p>
</div>
<div class="weather-item">
    <p>Sunrise:</p>
    <p>${moment(sunrise * 1000).format('HH:mm')}</p>
</div>
<div class="weather-item">
    <p>Sunset:</p>
    <p>${moment(sunset * 1000).format('HH:mm')}</p>
</div>

`
}