window.addEventListener('load',()=>{
    let long, lat;

    let tempdesc = document.querySelector('.temperature-description');
    let tempdeg = document.querySelector('.temperature-degree');
    let winddeg = document.querySelector('.wind-degree');
    let humiditydeg = document.querySelector('.humidity-degree');

    let location = document.querySelector('.location-timezone');
    let iconimg  = document.querySelector('.weather-icon');
    document.getElementById("btn").addEventListener("click",Currentlocation);
    document.getElementById("search").addEventListener("click", search);
    let proxy = `http://cors-anywhere.herokuapp.com/`;

   function Currentlocation(){
  if(navigator.geolocation)
    {
       navigator.geolocation.getCurrentPosition(position=>{
         long  = position.coords.longitude;
         lat =  position.coords.latitude;
         
        document.getElementById('city').value = '';
        document.getElementById('city').placeholder = "Enter City ";
         const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=aade7cd492a9454ddadb0d147e9f19f4`;

         fetch(api)
           .then(data=>{
            return data.json();
           })
           .then(data=>{
            console.log(data);
            

            const temp = parseInt(data.main.temp);
            const wind = data.wind.speed;
            console.log(wind);
            const humidity = data.main.humidity;
            console.log(temp);
            const desc = data.weather[0].description;
            const icon  = data.weather[0].icon;
           
            const iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
             const cel = Math.floor((temp-32) * (5/9));
             tempdeg.textContent = cel + " c"; 
             tempdesc.textContent = desc;
             winddeg.textContent = wind;
             humiditydeg.textContent = humidity;
             location.textContent = data.name;
             iconimg.src=iconurl;



             
           });

          

           
       });

       
    }
    else
    {
      h1.textContent = "something went wrong";
    }

}

function search()
{
  const city = document.getElementById('city').value;
  const api = `${proxy}api.openweathermap.org/data/2.5/weather?q=${city}&appid=aade7cd492a9454ddadb0d147e9f19f4`;

  fetch(api)
        .then(data=>{
          return data.json();
        })
        .then(data=>{
          if( data.message != 'city not found')
          { console.log(data);
           const temp = parseInt(data.main.temp);
            console.log(temp);
            const desc = data.weather[0].description;
            const icon  = data.weather[0].icon;
           
            const iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
             const cel = Math.floor((temp-32) * (5/9));
             const wind = data.wind.speed;
             const humidity = data.main.humidity;
             tempdeg.textContent = cel; 
             tempdesc.textContent = desc;
             location.textContent = data.name;
             winddeg.textContent = wind;
             humiditydeg.textContent = humidity;
             iconimg.src=iconurl;
          }
          else{
            alert("Enter Valid city name");
          }
        })
}
    
});

