
var initMap = function() {

var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.755653, lng: -122.341515},
    zoom: 10
  });
}

// $("#signup-button").click(function(){
//   console.log( 'signup' ); ///here doesn't work
//   $.ajax({
//     url:"/auth/signup",
//     type:"POST",
//     data:{
//       name:"gary",
//       email:"gary@Joe.com",
//       city:"garysville",
//       password:"joe",
//     },
//     success: function(result) {
//       console.log("success");
//     }
//   });
// })
