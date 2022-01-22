let weathercode = "";
let condition =  "";
let req_count=0

let imagecode = {
   thunder: '-cloud-lightning',
   cloudy: '-cloudy-fill',
   drizzle: '-cloud-drizzle',
   snowy: '-cloud-snow',
   clear: '-moon-stars',
   rainy: '-cloud-rain',
   haze: '-cloud-haze',
   tornado: '-hurricane',
   cold: '-thermometer-low',
   windy: '-wind',
   hail:' -cloud-hail',
   sunny: '-cloud-sun'
};

let des = {
   thunder: 'Thunder',
   cloudy: 'Few Clouds',
   drizzle: 'Drizzle',
   snowy: 'Snowy',
   clear: 'Clear Sky',
   rainy: 'Heavy Rains',
   haze: 'Hazy',
   tornado: 'Tornado',
   cold: 'Cold',
   windy: 'Windy',
   hail: 'Hail',
   sunny: 'Sunny Day'
}


function sendrequest(){
    //open a connection
    let request = new XMLHttpRequest();
    let city = document.getElementById("city-name").value;
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=93f26e3c57081a6210de53b8dcfdfea4`;
    request.open('GET',URL,true);
    
    request.onload = function(){
        if(request.status >=200 && request.status < 400){
            //get the data
            console.log("success!!!");
            let data = JSON.parse(request.responseText);
            let id = data.weather[0].id;
            document.getElementById("Card-heading").innerHTML = city;
            
            if(req_count>0){
                document.getElementById("temp-min").innerHTML = "Min-temp: ";
                document.getElementById("temp-max").innerHTML = "Max-temp: ";
                document.getElementById("pressure").innerHTML  = "Pressure: ";
                document.getElementById("wind-speed").innerHTML  = "Wind-Speed: ";
            }
            document.getElementById("temp").innerHTML = data.main.temp+'K/'+(data.main.temp-273).toFixed(2)+'°C';
            document.getElementById("temp-max").innerHTML += data.main.temp_max+'K/'+(data.main.temp-273).toFixed(2)+'°C';
            document.getElementById("temp-min").innerHTML += data.main.temp_min+'K/'+(data.main.temp-273).toFixed(2)+'°C';
            document.getElementById("pressure").innerHTML += data.main.pressure+ "mbar";
            document.getElementById("wind-speed").innerHTML += data.wind.speed+ "Km/h";
            
            
            console.log(data);
            
            if (id >= 200 && id <= 232){
                weathercode = imagecode.thunder;
                condition = des.thunder;
            }else if(id >= 300 && id <= 321){
                weathercode = imagecode.drizzle;
                condition = des.drizzle;
            }else if (id >= 500 && id <= 531){
                weathercode = imagecode.rainy;
                condition = des.rainy;
            }else if (id >= 600 && id <= 622){
                weathercode = imagecode.snowy;
                condition = des.snowy;
            }else if (id >= 701 && id <= 721 ){
                weathercode = imagecode.haze;
                condition = des.haze;
            }else if (id === 800){
                weathercode = imagecode.clear;
                condition = des.clear;
            }else if (id >= 801 && id <= 804){
                weathercode= imagecode.cloudy;
                condition = des.cloudy;
            }else if (id >= 900 && id <= 902){
                weathercode = imagecode.tornado;
                condition = des.tornado;
            }else if (id === 903){
                weathercode = imagecode.cold;
                condition = des.cold;
            }else if (id === 904){
                weathercode = imagecode.sunny;
                condition = des.sunny;
            }else if (id === 905){
                weathercode = imagecode.windy;
                condition = des.windy;
            }else if (id === 906){
                weathercode = imagecode.hail;
                condition = des.hail;
            }else{
                weathercode = imagecode.windy;
                condition = des.windy;
            }
            console.log(document.getElementById("icon").className)
            if(req_count==0)
                document.getElementById("icon").className='bi bi'+weathercode;
            else
            {
                document.getElementById("icon").className='bi bi';
                document.getElementById("icon").className+=weathercode;
            }
            req_count+=1;
            document.getElementById("description").innerHTML = condition;
        }
        else{
            console.log("could not connect to server");
        }
    }
    //error
    request.onerror = function(){
        console.log("error!!")
    }
    //send the request
    request.send()
}






