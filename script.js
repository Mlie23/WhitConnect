function getPreferences(country){
    let citiesDropDown = document.querySelector("#cities");
  
    if(country.trim() === ""){
       citiesDropDown.disabled = true;
       citiesDropDown.selectedIndex = 0;
       return false;
    }
  
    // AJAX request with fetch()
    fetch("countries.json")
    .then(function(response){
       return response.json();
    })
    .then(function(data){
       let cities = data[country];
       let out = "";
       out += `<option value="">Choose a city</option>`;
       for(let city of cities){
          out += `<option value="${city}">${city}</option>`;
       }
       citiesDropDown.innerHTML = out;
       citiesDropDown.disabled = false;
    });
 }