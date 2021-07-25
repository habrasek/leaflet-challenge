let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

let response = d3.json(link);

console.log(response);

var myMap = L.map("map", {
  center: [49, -137.67],
  zoom: 3
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let lats = [];
let lons = [];
let mags = [];
let desc = [];
let deps = [];

d3.json(link).then(info =>{
    console.log(info);
    console.log(Object.keys(info));
    let feat = info.features;
    console.log(feat);
    console.log(feat.length);
    for(i=0;i<feat.length;i++){
        lats.push(feat[i]["geometry"]["coordinates"][1]);
        lons.push(feat[i]["geometry"]["coordinates"][0]);
        deps.push(feat[i]["geometry"]["coordinates"][2]);
        mags.push(feat[i]["properties"]["mag"]);
        desc.push(feat[i]["properties"]["place"]);

    }
    console.log(lats);
    console.log(lons);
    console.log(mags);

    for(i=0; i<lats.length; i++){
    L.circle([lats[i], lons[i]],{
        color: perc2color(deps[i]),
        fillColor: perc2color(deps[i]),
        fillOpacity: 1,
        radius:10000*mags[i]
    }).bindPopup(`${desc[i]}<br>Depth: ${deps[i]}<br>Magnitude: ${mags[i]}`)
    .addTo(myMap)};
}
)

let legend = L.control({position: 'bottomright'});

legend.onAdd = function(map){
    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Categories</strong>'],
    categories = [0, 10, 20, 50, 75, 125, 205];

    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
                `<i style="color:${perc2color(categories[i])};">${categories[i]}</i>`);

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };


legend.addTo(myMap);


//credit to mlocati on github
function perc2color(perc) {
	var r, g, b = 0;
	if(perc < 50) {
		r = 255;
		g = Math.round(5.1 * perc);
	}
	else {
		g = 255;
		r = Math.round(510 - 5.10 * perc);
	}
	var h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
}

