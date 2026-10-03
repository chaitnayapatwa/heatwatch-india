const cities = [
  {name:"Delhi",state:"NCT Delhi",risk:86,temp:91,exposure:95,vulnerability:79,adaptation:58,lat:29,lon:54,insight:"High exposure and strong heat intensity make heat-health planning a priority."},
  {name:"Jaipur",state:"Rajasthan",risk:88,temp:96,exposure:76,vulnerability:77,adaptation:53,lat:38,lon:47,insight:"Very high heat intensity combined with lower adaptive capacity raises the composite risk."},
  {name:"Ahmedabad",state:"Gujarat",risk:82,temp:90,exposure:84,vulnerability:70,adaptation:61,lat:49,lon:56,insight:"High urban exposure and heat intensity create a strong need for preparedness measures."},
  {name:"Lucknow",state:"Uttar Pradesh",risk:78,temp:84,exposure:87,vulnerability:73,adaptation:58,lat:55,lon:37,insight:"High population exposure is a major contributor to the city's illustrative risk score."},
  {name:"Nagpur",state:"Maharashtra",risk:80,temp:89,exposure:68,vulnerability:72,adaptation:55,lat:52,lon:64,insight:"High heat intensity drives risk, while adaptive capacity moderates part of the score."},
  {name:"Hyderabad",state:"Telangana",risk:67,temp:77,exposure:74,vulnerability:58,adaptation:67,lat:56,lon:76,insight:"Moderate-to-high exposure is balanced by comparatively stronger adaptive capacity."},
  {name:"Mumbai",state:"Maharashtra",risk:61,temp:66,exposure:92,vulnerability:65,adaptation:72,lat:34,lon:80,insight:"Very high exposure is important, while lower extreme-heat intensity reduces the composite score."},
  {name:"Bengaluru",state:"Karnataka",risk:45,temp:48,exposure:73,vulnerability:51,adaptation:76,lat:48,lon:91,insight:"Lower illustrative heat intensity and stronger adaptive capacity produce a lower composite risk."},
  {name:"Chennai",state:"Tamil Nadu",risk:59,temp:62,exposure:81,vulnerability:62,adaptation:69,lat:67,lon:89,insight:"High exposure and warm conditions remain important despite relatively stronger adaptation."},
  {name:"Kolkata",state:"West Bengal",risk:70,temp:71,exposure:88,vulnerability:75,adaptation:63,lat:76,lon:57,insight:"High exposure and vulnerability contribute substantially to the composite risk."},
  {name:"Patna",state:"Bihar",risk:84,temp:86,exposure:79,vulnerability:88,adaptation:48,lat:67,lon:42,insight:"High vulnerability and lower adaptive capacity strongly influence the illustrative score."},
  {name:"Bhopal",state:"Madhya Pradesh",risk:69,temp:79,exposure:61,vulnerability:69,adaptation:60,lat:47,lon:61,insight:"Heat intensity and vulnerability are key contributors to the overall risk index."},
  {name:"Surat",state:"Gujarat",risk:72,temp:78,exposure:86,vulnerability:64,adaptation:65,lat:43,lon:68,insight:"High exposure makes heat preparedness relevant even with moderate adaptive capacity."},
  {name:"Varanasi",state:"Uttar Pradesh",risk:81,temp:87,exposure:71,vulnerability:82,adaptation:50,lat:61,lon:47,insight:"Heat intensity and social vulnerability are major drivers of the illustrative score."},
  {name:"Jodhpur",state:"Rajasthan",risk:91,temp:99,exposure:55,vulnerability:73,adaptation:43,lat:28,lon:37,insight:"Extreme heat intensity dominates the composite risk profile."},
  {name:"Indore",state:"Madhya Pradesh",risk:65,temp:76,exposure:65,vulnerability:58,adaptation:64,lat:44,lon:56,insight:"Moderate risk reflects a balance between heat, exposure and adaptive capacity."},
  {name:"Pune",state:"Maharashtra",risk:54,temp:59,exposure:76,vulnerability:52,adaptation:73,lat:44,lon:73,insight:"Lower heat intensity and relatively stronger adaptive capacity reduce the composite score."},
  {name:"Kochi",state:"Kerala",risk:42,temp:45,exposure:61,vulnerability:47,adaptation:78,lat:63,lon:96,insight:"Lower heat intensity and strong adaptive capacity lead to a lower illustrative risk."},
  {name:"Guwahati",state:"Assam",risk:48,temp:51,exposure:53,vulnerability:55,adaptation:70,lat:80,lon:27,insight:"The profile shows moderate vulnerability with comparatively stronger adaptive capacity."},
  {name:"Chandigarh",state:"Chandigarh",risk:63,temp:69,exposure:64,vulnerability:59,adaptation:70,lat:36,lon:27,insight:"Moderate heat intensity and good adaptive capacity keep the illustrative risk in the middle range."},
  {name:"Amritsar",state:"Punjab",risk:74,temp:82,exposure:62,vulnerability:71,adaptation:56,lat:34,lon:21,insight:"Strong heat intensity contributes significantly to the city's composite risk."},
  {name:"Bhubaneswar",state:"Odisha",risk:68,temp:73,exposure:67,vulnerability:66,adaptation:62,lat:77,lon:70,insight:"Heat and vulnerability combine to produce a moderate-to-high illustrative risk."},
  {name:"Visakhapatnam",state:"Andhra Pradesh",risk:57,temp:60,exposure:70,vulnerability:55,adaptation:67,lat:74,lon:81,insight:"Moderate heat conditions and exposure are balanced by adaptive capacity."},
  {name:"Ranchi",state:"Jharkhand",risk:52,temp:57,exposure:54,vulnerability:61,adaptation:65,lat:65,lon:57,insight:"Moderate vulnerability and heat intensity produce a mid-range illustrative score."}
];

let selectedCity = cities[0];
let sortDescending = true;

const $ = id => document.getElementById(id);
const level = score => score >= 85 ? "extreme" : score >= 70 ? "high" : score >= 50 ? "moderate" : "low";
const label = score => level(score).toUpperCase();

function filteredCities(){
  const q = $("citySearch").value.trim().toLowerCase();
  const f = $("riskFilter").value;
  return cities.filter(c => (!q || `${c.name} ${c.state}`.toLowerCase().includes(q)) && (f==="all" || level(c.risk)===f));
}

function renderMarkers(){
  const holder = $("cityMarkers");
  holder.innerHTML = "";
  const indicator = $("indicatorSelect").value;
  filteredCities().forEach(c => {
    let value = c.risk;
    if(indicator==="temperature") value=c.temp;
    if(indicator==="exposure") value=c.exposure;
    if(indicator==="vulnerability") value=c.vulnerability;
    if(indicator==="adaptation") value=100-c.adaptation;
    const markerLevel = level(value);
    const el = document.createElement("button");
    el.className = `city-marker ${c.name===selectedCity.name ? "active":""}`;
    el.style.left = `${c.lon}%`;
    el.style.top = `${c.lat}%`;
    el.style.color = markerLevel==="extreme" ? "#ff3e50" : markerLevel==="high" ? "#ff7135" : markerLevel==="moderate" ? "#ffc857" : "#54d69a";
    el.setAttribute("aria-label", `${c.name}, risk ${c.risk}`);
    el.innerHTML = `<span class="marker-dot ${markerLevel}-color"></span><span class="marker-label">${c.name}</span>`;
    el.onclick = () => selectCity(c);
    holder.appendChild(el);
  });
}

function selectCity(city){
  selectedCity = city;
  $("detailCity").textContent = city.name;
  $("detailState").textContent = city.state;
  $("detailScore").textContent = city.risk;
  const l = level(city.risk);
  const pill = $("detailPill");
  pill.className = `risk-pill ${l}`;
  pill.textContent = `${label(city.risk)} RISK`;
  setMetric("mTemp","bTemp",city.temp);
  setMetric("mExposure","bExposure",city.exposure);
  setMetric("mVulnerability","bVulnerability",city.vulnerability);
  setMetric("mAdaptation","bAdaptation",city.adaptation);
  $("detailInsight").textContent = city.insight;
  renderMarkers();
  renderRows();
}

function setMetric(numId, barId, value){
  $(numId).textContent = value;
  $(barId).style.width = `${value}%`;
}

function renderRows(){
  const rows = $("cityRows");
  let list = filteredCities().slice().sort((a,b)=>sortDescending ? b.risk-a.risk : a.risk-b.risk);
  rows.innerHTML = list.map(c => {
    const l = level(c.risk);
    return `<button class="city-row" style="width:100%;background:transparent;color:inherit;border:0;text-align:left" data-city="${c.name}">
      <span><b class="city-name">${c.name}</b><small class="city-state">${c.state}</small></span>
      <span class="mini-score">${c.risk}</span>
      <span>${c.temp}</span>
      <span>${c.exposure}</span>
      <span><i class="status ${l}">${label(c.risk)}</i></span>
    </button>`;
  }).join("");
  rows.querySelectorAll(".city-row").forEach(r => r.onclick=()=>selectCity(cities.find(c=>c.name===r.dataset.city)));
  $("extremeCount").textContent = cities.filter(c=>c.risk>=85).length;
  $("avgRisk").textContent = (cities.reduce((a,c)=>a+c.risk,0)/cities.length).toFixed(1);
}

function openModal(){
  const c=selectedCity;
  $("modalTitle").textContent=c.name;
  $("modalText").textContent=c.insight;
  $("modalRisk").textContent=c.risk;
  $("modalTemp").textContent=c.temp;
  $("modalExposure").textContent=c.exposure;
  $("modalAdaptation").textContent=c.adaptation;
  $("modalBackdrop").classList.add("open");
}
function closeModal(){ $("modalBackdrop").classList.remove("open"); }

$("citySearch").addEventListener("input",()=>{renderMarkers();renderRows()});
$("riskFilter").addEventListener("change",()=>{renderMarkers();renderRows()});
$("indicatorSelect").addEventListener("change",renderMarkers);
$("resetBtn").onclick=()=>{
  $("citySearch").value="";$("riskFilter").value="all";$("indicatorSelect").value="risk";
  selectCity(cities[0]);
};
$("sortBtn").onclick=()=>{
  sortDescending=!sortDescending;
  $("sortBtn").textContent=`Sort: Risk ${sortDescending?"↓":"↑"}`;
  renderRows();
};
$("detailsBtn").onclick=openModal;
$("modalClose").onclick=closeModal;
$("modalBackdrop").onclick=e=>{if(e.target===$("modalBackdrop"))closeModal()};
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
$("howBtn").onclick=()=>document.querySelector("#methodology").scrollIntoView({behavior:"smooth"});

$("themeBtn").onclick=()=>{
  document.body.classList.toggle("light");
  $("themeBtn").textContent=document.body.classList.contains("light")?"☾":"☼";
};

selectCity(cities[0]);
