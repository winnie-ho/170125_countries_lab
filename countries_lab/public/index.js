var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}


var populateList = function(countries){
  var select = document.querySelector("#countrySelect");
  countries.forEach(function(country){
    var option = document.createElement("option");
    option.label = country.name;
    option.value = country.name;
    // console.log(country.name);
    select.appendChild(option);
  })
}


var populateRegionList = function(countries){
  var regionSelect = document.querySelector("#regionSelect");
  
  var regions = [];
  for (var country of countries ){
    regions.push(country.region);
  }

  var filteredRegions = regions.filter(function(region, index, regions){
    return regions.indexOf(region) === index;
  })

  for (var region of filteredRegions) {
    
    if(region !== ""){
    var option = document.createElement("option");
    option.label = region
    option.value = region
    regionSelect.appendChild(option);
  }else{
    var option = document.createElement("option");
    option.label = "Others"
    option.value = region
    regionSelect.appendChild(option);
  }
  }
}

var countries = null;

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  populateList(countries);
  populateRegionList(countries);
}

var handleRegionSelectChange = function(){
  var filteredCountries = [];
  console.log(filteredCountries.length);
  for (var country of countries){
    if (country.region === this.value) {
      console.log(country);
      filteredCountries.push(country);
    }
  console.log(filteredCountries.length);
    return filteredCountries;
  }

  populateList(filteredCountries);
}



    
  




var handleSelectChange = function(){
  for (var country of countries){
    if (country.name === this.value){
      console.log(country);
      createCountryInfo(country);
      createBorderInfo(country);
      localStorage.setItem("countrySelected", country.name);
    } 
  }
}  

var createCountryInfo = function(country){  
  var ul = document.querySelector("#country-info")
  ul.innerHTML = "";

  var li = document.createElement("li");
  li.innerText = "Country Name: " + country.name + "\n Population: " +  country.population + "\nCapital: " + country.capital + "\nBordering Countries: " + country.borders;
  ul.appendChild(li);
}


var createBorderInfo = function(country){
  console.log(country.borders);
  var ul = document.querySelector("#borders-info")
  ul.innerHTML = "";
  for (var borderString of country.borders){
    console.log(borderString);
    console.log(country.borders);
    for(var country of countries){
      if ( borderString === country.alpha3Code){

        var li = document.createElement("li");
        li.innerText = "Country Name: " + country.name + "\n Population: " +  country.population + "\nCapital: " + country.capital;
        ul.appendChild(li);

      }
    }
  }      
}









var app = function(){
  var url = "https://restcountries.eu/rest/v1/all";
  makeRequest(url, requestComplete);
  
  var select = document.querySelector("#countrySelect");
  select.onchange = handleSelectChange;

  var regionSelect = document.querySelector("#regionSelect");
  regionSelect.onchange = handleRegionSelectChange;
}

window.onload = app;
