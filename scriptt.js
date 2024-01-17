let weather = {
    apiKey: "56f8968188b97dbbf6980fea769eda33" , 
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + 
            city +
            "&units=metric&appid=" +
           this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const{name} = data;
        const{icon,description} = data.weather[0];
        const{temp, humidity} = data.main;
        const{speed} = data.wind;
        console.log(name,icon,description,temp,humidity,speed)
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".decsription").innerHTML = description;
        document.querySelector(".temp").innerHTML = temp + "°C";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button")
.addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar")
.addEventListener("keyup",function(event){
    if(event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Hyderabad");