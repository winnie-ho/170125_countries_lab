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
      option.value = country;
      console.log(country.name);
      select.appendChild(option);

    })
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateList(countries);
}




var app = function(){
  var url = "https://restcountries.eu/rest/v1/all";
  
  var select = document.querySelector("#countrySelect");
  // select.onchange = function(){
  // }
  makeRequest(url, requestComplete);
}

window.onload = app;