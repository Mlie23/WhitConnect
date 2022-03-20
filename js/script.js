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
         out += `<option value="None">Choose a specific preference</option>`;
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

function addNewUser() {
   var name = document.getElementById("name").value;
   var age = document.getElementById("age").value;
   var email = document.getElementById("email").value;
   var interest = document.getElementById("interest").value;
   var internship = document.getElementById("internship").value;
   var year = document.getElementById("major").value;
   var major = document.getElementById("year").value;
   console.log(name + " " + age);
   if (interest.indexOf(', ') >= 0) {
      interest = interest.split(', ');
   }
   if (internship.indexOf(', ') >= 0) {
      internship = internship.split(', ');
   }

   // // Defining new data to be added
   // let newInfo = {
   //    "name": name,
   //    "age": age,
   //    "email": email,
   //    "interest": interest,
   //    "internship": internship,
   //    "year": year,
   //    "major": major
   // }


   alert(
      "New User has been Created!" + "\n" +
      "Name: " + name + "\n" +
      "Age: " + age + "\n" +
      "Email: " + email + "\n" +
      "Interest: " + interest + "\n" +
      "Internship: " + internship + "\n" +
      "Year: " + year + "\n" +
      "Major: " + major + "\n" 
   );

   $.getJSON("studentInfo.json", function (json) {
      json[json.length] = newInfo; // this will show the info it in firebug console
      console.log(json);
   });

   closeForm();
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
            if (specific == "None") {
               $.each(data, function (key, value) {
                  if (value[preferences].length != 0) {
                     student += studentsList(value);
                  }
               });
            } else {
               $.each(data, function (key, value) {
                  if (value[preferences].indexOf(specific) >= 0) {
                     student += studentsList(value);
                  }
               });
            }
         } else {
            if (specific == "None") {
               $.each(data, function (key, value) {
                  student += studentsList(value);
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

         }
         // INSERTING ROWS INTO TABLE
         document.getElementById("table").innerHTML = student;
      });
}

function openForm() {
   document.getElementById("newUser").style.display = "block";
}

function closeForm() {
   document.getElementById("newUser").style.display = "none";
}