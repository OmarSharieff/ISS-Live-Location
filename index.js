const mymap = L.map('map').setView([0, 0], 1);
const issIcon = L.icon({
    iconUrl: 'pngwing.com.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
var marker = L.marker([0, 0],{icon: issIcon}).addTo(mymap);
let flag = true;
async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const {latitude , longitude} = data;
    marker.setLatLng([latitude,longitude]);
    if (flag){
        mymap.setView([latitude,longitude],2);
        flag = false;
    } 
    
    document.querySelector('#lat').textContent = latitude.toFixed(2);
    document.querySelector('#lon').textContent = longitude.toFixed(2);
}
setInterval(getISS, 1000);
