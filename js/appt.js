
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

function makeAppt(doctor, date, time, name) {
  console.log(database);

  database.ref('appointments/' + doctor + "/" + date + "/" + time).set({
    date: date,
    time: time,
    name: name
  });
}

// set today's date by default
$(function() {
  $('#datepicker').datepicker({
    dateFormat: "dd-mm-yy"
  }).datepicker("setDate", "0");

  var doctors = ["Dr.Joo", "Dr.McDonald"];
  drawTimeTables(doctors);
});

// draw time tables dynamically
function drawTimeTables(doctors) {
  for (var i = 0; i < doctors.length; i++) {
    $('#time-tables').append(
      '<div class="doctor-container" style="margin-top: 50px;"><h4 class="doctor-name">' + doctors[i] + '</h4>\n' +
      '        <table>\n' +
      '            <tr>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>9:00am</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>9:30am</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>10:00am</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>10:30am</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '            </tr>\n' +
      '            <tr>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>11:00am</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>11:30am</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>12:00pm</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>12:30pm</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '            </tr>\n' +
      '            <tr>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>1:00pm</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>1:30pm</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>2:00pm</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>2:30pm</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '            </tr>\n' +
      '            <tr>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>3:00pm</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>3:30pm</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>4:00pm</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '                <td class="btn btn-info btn-lg appointment-time">\n' +
      '                    <div>4:30pm</div>\n' +
      '                    <div></div>\n' +
      '                </td>\n' +
      '            </tr>\n' +
      '        </table>\n' +
      '</div>')
  }
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
  $('#appointment-doctor').text($(this).closest('.doctor-name').text()); // get the doctor
  $('#appointment-date').text($('#datepicker').val()); // get the date
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
  makeAppt('DrHong', $('#appointment-date').text(), $('#appointment-time').text(), $('#appointment-patient').val())
})