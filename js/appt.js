
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDQ2qblJX1vmmVD7akV2pmMN51sJJRSzpM",
  authDomain: "appointments-75336.firebaseapp.com",
  databaseURL: "https://appointments-75336.firebaseio.com",
  projectId: "appointments-75336",
  storageBucket: "appointments-75336.appspot.com",
  messagingSenderId: "477533169839"
};
firebase.initializeApp(config);

var database = firebase.database();
var selectedDoc;
var selectedDate;

var doctors = ["DrHong", "DrJoo", "DrMcDonald"];
var availableTimes = ["9:00am", "9:30am", "10:00am", "10:30am",
  "11:00am", "11:30am", "12:00pm", "12:30pm",
  "1:00pm", "1:30pm", "2:00pm", "2:30pm",
  "3:00pm", "3:30pm", "4:00pm", "4:30pm"]

// set today's date by default
$(function() {
  // $('#datepicker').datepicker({
  //   dateFormat: "dd-mm-yy"
  // }).datepicker("setDate", "0")

  $('#datepicker').datepicker({
    dateFormat: 'dd-mm-yy'
  }).datepicker('setDate', '0')
    .on('input change', function(e) {
      selectedDate = e.target.value;
    })

  selectedDate = $('#datepicker').val();

  drawTimeTables(selectedDate);
  // loadAppt(doctors[0], "02-02-2018");
});


function makeAppt(doctor, date, time, name) {
  console.log('doc: ' + doctor + '\ndate: ' + date + '\ntime: ' + time + '\nname: ' + name)
  database.ref().child('appointments').child(date).child(doctor).child(time).set({
    date: date,
    time: time,
    name: name
  });
}

// draw time tables dynamically
function drawTimeTables(date) {
  database.ref().child('appointments').child(date).on('value', function(snapshot) {
    var appointments = snapshot.val();
    console.log(appointments);
    for (var i = 0; i < doctors.length; i++) {
      var doctor = doctors[i];
      var appointment = appointments[doctor]
      console.log('name: ' + doctor);
      console.log('appointment', appointment)
      // for (var appt in appointments) {
      //   console.log(appt);
      // }

      var content = "";
      content += '<div id="' + doctor +  '" class="doctor-container" style="margin-top: 50px;">\n'
      content += '  <h4 class="doctor-name">' + doctor + '</h4>\n'
      content += '        <table>\n'
      for (var j = 0; j < availableTimes.length; j++) {
        var time = availableTimes[j];
        var patient = "";
        if (appointment != null && appointment != undefined && appointment[time] != undefined) {
          console.log(appointments[doctor][time])
          patient = appointments[doctor][time]['name'];
        }

        if (j % 4 == 0) {
          content += '            <tr>\n'
        }

        if (patient == "") {
          content += '                <td class="btn btn-info btn-lg appointment-time">\n'
        } else {
          content += '                <td class="btn-danger btn-info btn-lg appointment-time">\n'
        }

        content += '                    <div>' + time + '</div>\n'
        content += '                    <div>' + patient + '</div>\n'
        content += '                </td>\n'

        if (j % 4 == 3) {
          content += '            </tr>\n'
        }
      }

      content += '        </table>\n'
      content += '</div>'

      $('#time-tables').append(content)
    }
  })
}


// open
/* does not work with the appended htmls
$('.appointment-time').click(function() {
  console.log($(this).closest('.doctor-container').find('.doctor-name').text());
  // $('#appointment-doctor').text($(this).closest('.doctor-name').text()); // get the doctor
  // $('#appointment-date').text($('#datepicker').val()); // get the date
  // $('#appointment-time').text($(this).children(':first').text()); // get the time
  // $('#myModal').modal('show'); // open the popup
});
*/

//
$('#time-tables').on('click', '.appointment-time', function() {
  // console.log($(this).closest('.doctor-container').find('.doctor-name').text());
  selectedDoc = $(this).closest('.doctor-container').find('.doctor-name').text();
  $('#appointment-doctor').text(selectedDoc); // get the doctor
  $('#appointment-date').text(selectedDate); // get the date
  $('#appointment-time').text($(this).children(':first').text()); // get the time
  $('#myModal').modal('show'); // open the popup
});


$('#btn_date_picker').click(function() {
  $('#datepicker').datepicker('show');
})

$('#appointment-cancel').click(function() {

})

$('#appointment-confirm').click(function() {
  console.log($('#appointment-date').text())
  console.log($('#appointment-time').text())
  console.log($('#appointment-patient').val())
  makeAppt(selectedDoc, $('#appointment-date').text(), $('#appointment-time').text(), $('#appointment-patient').val())
})