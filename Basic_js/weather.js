const weather = document.querySelector(".js-weather")
const COORDS = "coords";
const API_KEY = "65713fe20445c871117f039a425b4a38"; //opnewheathermap

function getWheather(lat,lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){ //then을 사용한 이유는 fetch가 완료되길 기달려야 해서
                                // fetch완료되기 전에 관련 내용 조작하면 정상작동보장x
            return response.json()
        }).then(function(json){
            //console.log(json);
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        })
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWheather(latitude,longitude);
}
function handleGeoError(){
    console.log("cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoSucces);
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();
    } else{ //getWheather
        const parsedCoords = JSON.parse(loadedCords);
        getWheather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();