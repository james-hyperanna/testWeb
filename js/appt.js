
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
  $('#datepicker').datepicker({
    dateFormat: 'dd-mm-yy'
  }).datepicker('setDate', '0')
    .on('input change', function(e) {
      selectedDate = e.target.value;
      drawTimeTables(selectedDate);
    })

  // set today's date and load time tables
  selectedDate = $('#datepicker').val();
  drawTimeTables(selectedDate);
});


function makeAppt(doctor, date, time, patient) {
  console.log('doc: ' + doctor + '\ndate: ' + date + '\ntime: ' + time + '\npatient: ' + patient)
  database.ref().child('appointments').child(date).child(doctor).child(time).set({
    date: date,
    time: time,
    patient: patient
  });
}

// draw time tables dynamically
function drawTimeTables(date) {
  database.ref().child('appointments').child(date).on('value', function(snapshot) {
    var appointments = snapshot.val();
    console.log(appointments);
    for (var i = 0; i < doctors.length; i++) {
      var doctor = doctors[i];
      var appointment = null
      if (appointments != null) {
        appointment = appointments[doctor]
      }
      console.log('name: ' + doctor);
      console.log('appointment', appointment)

      var content = "";
      content += '<div id="' + doctor +  '" class="doctor-container" style="margin-top: 50px;">\n'
      content += '  <h4 class="doctor-name">' + doctor + '</h4>\n'
      content += '        <table>\n'
      for (var j = 0; j < availableTimes.length; j++) {
        var time = availableTimes[j];
        var patient = "";
        if (appointment != null && appointment != undefined && appointment[time] != undefined) {
          console.log(appointments[doctor][time])
          patient = appointments[doctor][time]['patient'];
        }

        if (j % 4 == 0) {
          content += '            <tr>\n'
        }

        if (patient == "") {
          content += '                <td class="btn btn-info btn-lg appointment-time available">\n'
        } else {
          content += '                <td class="btn-danger btn-info btn-lg appointment-time booked">\n'
        }

        content += '                    <div class="appointment-time">' + time + '</div>\n'
        content += '                    <div class="appointment-patient">' + patient + '</div>\n'
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

// open calendar
$('#btn_date_picker').click(function() {
  $('#datepicker').datepicker('show');
})

// open make appointment pop up
$('#time-tables').on('click', '.available', function() {
  selectedDoc = $(this).closest('.doctor-container').find('.doctor-name').text();
  $('#make-appointment-doctor').text(selectedDoc); // get the doctor
  $('#make-appointment-date').text(selectedDate); // get the date
  $('#make-appointment-time').text($(this).children('.appointment-time').text()); // get the time
  $('#makeAppointmentModal').modal('show'); // open the popup
});

$('#make-appointment-confirm').click(function() {
  console.log($('#make-appointment-date').text())
  console.log($('#make-appointment-time').text())
  console.log($('#make-appointment-patient').val())
  makeAppt(selectedDoc, $('#make-appointment-date').text(), $('#make-appointment-time').text(), $('#make-appointment-patient').val())
})

$('#make-appointment-cancel').click(function() {

})


// open cancel appointment pop up
$('#time-tables').on('click', '.booked', function() {
  selectedDoc = $(this).closest('.doctor-container').find('.doctor-name').text();
  $('#cancel-appointment-doctor').text(selectedDoc); // get the doctor
  $('#cancel-appointment-date').text(selectedDate); // get the date
  $('#cancel-appointment-time').text($(this).children('.appointment-time').text()); // get the time
  $('#cancel-appointment-patient').text($(this).children('.appointment-patient').text()) // get the patient name
  $('#cancelAppointmentModal').modal('show'); // open the popup
});

$('#cancel-appointment-confirm').click(function() {
  console.log($('#cancel-appointment-date').text())
  console.log($('#cancel-appointment-time').text())
  console.log($('#cancel-appointment-patient').val())
  makeAppt(selectedDoc, $('#cancel-appointment-date').text(), $('#cancel-appointment-time').text(), $('#cancel-appointment-patient').val())
})

$('#cancel-appointment-cancel').click(function() {

})
