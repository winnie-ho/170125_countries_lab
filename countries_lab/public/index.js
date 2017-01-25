var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

//this refers to the request status
//responseText is what is returned from the request
//parsing the JSON string will bring back as an object that can be used to access it's attributes.

var populateList = function(countries){
  var select = document.querySelector("#countrySelect");
  countries.forEach(function(country){
    var option = document.createElement("option");
    option.label = country.name;
    option.value = country.name;
    console.log(country.name);
    select.appendChild(option);

  })
}

var countries = null;

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  populateList(countries);
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

}

window.onload = app;
