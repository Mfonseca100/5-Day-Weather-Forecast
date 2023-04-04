// updates the date and time on a webpage, as well as sets the dates for the next six days in the future.
function updateTime(dayOffset = 5) {
    const now = new Date();
    const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    };
    for (let i = 1; i <= 6; i++) {
        const day = new Date();
        day.setDate(now.getDate() + i - 1 + dayOffset);
        const dateElem = document.getElementById("day" + i + "Date");
        if (dateElem) {
            const dayOfWeek = day.toLocaleString('en-US', {
                weekday: 'long'
            });
            dateElem.innerHTML = dayOfWeek;
        }
        const formattedDate = day.toLocaleDateString('en-US', options);
        const dayElem = document.getElementById("day" + i);
        if (dayElem) {
            dayElem.innerText = formattedDate;
        }
    }
    const dateTime = now.toLocaleString('en-US', {
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    document.getElementById("date-time").textContent = dateTime;
}
setInterval(updateTime, 1000);
//references to some elements from HTML using their id attributes.
const newName = document.getElementById("query");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");

function GetInfo(name) {
    console.log("Search query:", name);
    //fetching API for weather status of specific city with for loop included for each day
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&cnt=5&appid=bfdd27034df84d0b10594fb0a3cac5d2")
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            for (i = 0; i < 5; i++) {
                const dateElem = document.getElementById("day" + (i + 1) + "Date");
                if (dateElem) {
                    const date = new Date(data.list[i].dt_txt);
                    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
                    dateElem.innerHTML = dayOfWeek;
                }
                document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min:" + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + "°";
                document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max:" + Number(data.list[i].main.temp_max - 273.15).toFixed(1) + "°";
                document.getElementById("day" + (i + 1) + "Humidity").innerHTML = +Number(data.list[i].main.humidity);
                document.getElementById("day" + (i + 1) + "windSpeed").innerHTML = +Number(data.list[i].wind.speed).toFixed(1) + "༄";
                document.getElementById("img" + (i + 1)).src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
            }
            document.getElementById("temp").innerHTML = (data.list[0].main.temp - 273.15).toFixed(1) + "°";
            document.querySelector('#cityName').textContent = data.city.name;
        });
}
//click event listener on the button element
//aded event.preventDefault to prevent the default behavior of the button, which is to submit a form or reload the page.
document.querySelector('#search-btn').addEventListener("click", function (event) {
    event.preventDefault()
    var selected = newName.value
    GetInfo(selected.toLowerCase())
})