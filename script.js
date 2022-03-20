function getPreferences() {
   var country = document.getElementById("countries").value;
   let citiesDropDown = document.querySelector("#cities");

   if (country.trim() === "") {
      citiesDropDown.disabled = true;
      citiesDropDown.selectedIndex = 0;
      return false;
   }

   // AJAX request with fetch()
   fetch("countries.json")
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         let cities = data[country];
         let out = "";
         out += `<option value="">Choose a specific preference</option>`;
         for (let city of cities) {
            out += `<option value="${city}">${city}</option>`;
         }
         citiesDropDown.innerHTML = out;
         citiesDropDown.disabled = false;
      });

   return country;

}

function get_specific() {
   var specific = document.getElementById("cities").value;
   return specific;
}


function draw_table() {
   var preferences = getPreferences();
   var specific = get_specific();
   // FETCHING DATA FROM JSON FILE
   $.getJSON("gfgdetails.json",
      function (data) {
         var student = '';
         student += "<tr>" +
            "	<th>Name</th>" +
            "	<th>Age</th>" +
            "	<th>Email</th>" +
            "	<th>Interest</th>" +
            "       <th>Internship</th>" +
            "       <th>Year</th>" +
            "	<th>Major</th>" +
            "</tr>";
         var hasData = false;
         // ITERATING THROUGH OBJECTS
         if (preferences == "interest" || preferences == "internship") {
            $.each(data, function (key, value) {
               console.log(specific);
               console.log(value[preferences]);
               if (value[preferences].indexOf(specific) >= 0 ){
                  student += '<tr>';
                  student += '<td>' +
                     value.name + '</td>';
   
                  student += '<td>' +
                     value.age + '</td>';
   
                  student += '<td> <a href=mailto:"'+value.email.toString()+'">'+ 
                     value.email + "</a>"+'</td>';
   
                  student += '<td>' +
                     value.interest + '</td>';
                  student += '<td>' +
                     value.internship + '</td>';
                  student += '<td>' +
                     value.year + '</td>';
                  student += '<td>' +
                     value.major + '</td>';
                  student += '</tr>';
               }
            });
         } else {
            $.each(data, function (key, value) {
               if (value[preferences] == specific) {
                  //CONSTRUCTION OF ROWS HAVING
                  // DATA FROM JSON OBJECT
                  student += '<tr>';
                  student += '<td>' +
                     value.name + '</td>';
   
                  student += '<td>' +
                     value.age + '</td>';
   
                  student += '<td>' +
                     value.email + '</td>';
   
                  student += '<td>' +
                     value.interest + '</td>';
                  student += '<td>' +
                     value.internship + '</td>';
                  student += '<td>' +
                     value.year + '</td>';
                  student += '<td>' +
                     value.major + '</td>';
                  student += '</tr>';
               }
            });
         }
         
         // if (hasData) {
         //    student += '<tr>'+
         //    '<td colspan = "7>' +
         //    'There is no student for that specific category yet.'+
         //    '</td></tr>' ;  
         //    console.log(student);
         // }
         //INSERTING ROWS INTO TABLE
         document.getElementById("table").innerHTML = student;
      });
}