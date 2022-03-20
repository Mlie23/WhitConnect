function getPreferences() {
   var pref = document.getElementById("pref").value;
   let specDropDown = document.querySelector("#spec");

   if (pref.trim() === "") {
      specDropDown.disabled = true;
      specDropDown.selectedIndex = 0;
      return false;
   }

   // AJAX request with fetch()
   fetch("dataStorage.json")
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         let spec = data[pref];
         let out = "";
         out += `<option value="">Choose a specific preference</option>`;
         for (let s of spec) {
            out += `<option value="${s}">${s}</option>`;
         }
         specDropDown.innerHTML = out;
         specDropDown.disabled = false;
      });

   return pref;

}

function get_specific() {
   var specific = document.getElementById("spec").value;
   return specific;
}

function studentsList(value) {
   var student = '<tr>';
   student += '<td>' +
      value.name + '</td>';

   student += '<td>' +
      value.age + '</td>';

   student += '<td> <a href=mailto:"' + value.email.toString() + '">' +
      value.email + "</a>" + '</td>';

   student += '<td>' +
      value.interest + '</td>';
   student += '<td>' +
      value.internship + '</td>';
   student += '<td>' +
      value.year + '</td>';
   student += '<td>' +
      value.major + '</td>';
   student += '</tr>';
   return student;
}


function draw_table() {
   var preferences = getPreferences();
   var specific = get_specific();
   // FETCHING DATA FROM JSON FILE
   $.getJSON("studentInfo.json",
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
         // ITERATING THROUGH OBJECTS
         if (preferences == "interest" || preferences == "internship") {
            $.each(data, function (key, value) {
               if (value[preferences].indexOf(specific) >= 0) {
                  student += studentsList(value);
               }
            });
         } else {
            $.each(data, function (key, value) {
               if (value[preferences] == specific) {
                  //CONSTRUCTION OF ROWS HAVING
                  // DATA FROM JSON OBJECT
                  student += studentsList(value);
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

function openForm() {
   document.getElementById("myForm").style.display = "block";
 }
 
 function closeForm() {
   document.getElementById("myForm").style.display = "none";
 }