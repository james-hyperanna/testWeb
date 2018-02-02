
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
});

// open
$('.appointment-time').click(function() {
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