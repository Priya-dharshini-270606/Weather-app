// ✅ Use your own API key from OpenWeatherMap if this one expires
const apikey = "6c72156e1159817e5398d3f530d4b959";

async function getweather() {
    // ✅ Get input and UI elements
    const city = document.getElementById("cityinput").value.trim();
    const card = document.getElementById("weathercard");
    const errormsg = document.getElementById("errorMsg"); // ✅ Fixed: ID must be 'errorMsg'

    // ✅ Reset display on each new request
    card.style.display = "none";
    errormsg.style.display = "none";

    // ✅ Check if city is empty
    if (!city) {
        errormsg.innerHTML = "Please enter the city name";
        errormsg.style.display = "block";
        return;
    }

    try {
        // ✅ Fetch weather data
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        const data = await res.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        // ✅ Display weather data
        card.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
            <h3><p><strong>${data.main.temp} °C</strong> - ${data.weather[0].description}</p></h3>
            <h3><p><b>Humidity:</b> ${data.main.humidity}%</p></h3>
            <h3><p><b>Wind:</b> ${data.wind.speed} m/s</p></h3>
        `;

        card.style.display = "block"; // ✅ Show card
    } catch (error) {
        // ✅ Display error message
        errormsg.innerHTML = "Error: " + error.message;
        errormsg.style.display = "block";
    }
}
