
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


$(function() {
  console.log('hi');
  $('#datepicker').datepicker({
    dateFormat: "dd-mm-yy"
  }).datepicker("setDate", "0");
});

$('.appointment-time').click(function() {
  $('#appointment-time').text($(this).children(':first').text()); // get the time
  $('#myModal').modal('show'); // open the popup
});

$('#btn_date_picker').click(function() {
  console.log('hello');
  $('#datepicker').datepicker('show');
})