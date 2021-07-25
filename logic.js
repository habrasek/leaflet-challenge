let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

let response = d3.json(link);

console.log(response);

var myMap = L.map("map", {
  center: [41.52, -121.67],
  zoom: 5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let lats = [];
let lons = [];
let mags = [];
let desc = [];

d3.json(link).then(info =>{
    console.log(info);
    console.log(Object.keys(info));
    let feat = info.features;
    console.log(feat);
    console.log(feat.length);
    for(i=0;i<feat.length;i++){
        lats.push(feat[i]["geometry"]["coordinates"][1]);
        lons.push(feat[i]["geometry"]["coordinates"][0]);
        mags.push(feat[i]["properties"]["mag"]);
        desc.push(feat[i]["properties"]["place"]);

    }
    console.log(lats);
    console.log(lons);
    console.log(mags);

    for(i=0; i<lats.length; i++){
    L.circle([lats[i], lons[i]],{
        color: "red",
        fillColor: "red",
        fillOpacity: 0.75,
        radius:10000*mags[i]
    }).bindPopup(`${desc[i]}`)
    .addTo(myMap)};
}
)



