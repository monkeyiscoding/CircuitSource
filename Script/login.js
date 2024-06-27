

const firebaseConfig = {
    apiKey: "AIzaSyBpRrmTK4449iHbUW_jNE1CjaWYTdmGdaY",
    authDomain: "qphix-training-193c9.firebaseapp.com",
    databaseURL: "https://qphix-training-193c9-default-rtdb.firebaseio.com",
    projectId: "qphix-training-193c9",
    storageBucket: "qphix-training-193c9.appspot.com",
    messagingSenderId: "343406672827",
    appId: "1:343406672827:web:f2c02f8cfdb6c9afa3e29e",
    measurementId: "G-E7PMVRGH0C"
  };
  
  firebase.initializeApp(firebaseConfig);
  var dataRef = firebase.database().ref("All");


  var query = firebase.database().ref("CircuitSource/Users");


var capta = false;
render();

function render() {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.\
      capta = true;
    }
  });
  recaptchaVerifier.render();
}



$("#login").click(function() {
  var number = $("#phone").val();

  if (number.trim().length == 0) {
    $("#error").html("Enter Your Phone Number");
    $("#error").css("visibility", "visible");
  } else if (number.trim().length < 10) {
    $("#error").html("Invalid Phone Number");
    $("#error").css("visibility", "visible");
  }
  // else if (capta == false) {
  //   $("#error").html("Verifi recaptcha");
  //   $("#error").css("visibility", "visible");
  // }
  else {
    $("#loader").css("visibility","visible");
    
    checkUser(number);
  }
})



function checkUser(number) {
  var numberPreview = number;


  if (numberPreview.startsWith("0")) {
    numberPreview = numberPreview.slice(1);
  }


  if (numberPreview.indexOf("+91") < 1) {
    number = "+91" + numberPreview
  }


 
      $("#loader").fadeOut();
      phoneAuth(number);
      $("#error").css("visibility", "hidden");
  


}


// function for send OTP
function phoneAuth(number) {



  firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier).then(function(confirmationResult) {
    window.confirmationResult = confirmationResult;
    coderesult = confirmationResult;

    // otp sended now show the otp enter design

    $("#div-phone").css("display","none");
    $("#div-otp").css("display","block");
    $("#div-otp").fadeIn();

  }).catch(function(error) {
    // error in sending OTP
    $("#error").html(error.message);
    $("#error").css("visibility", "visible");
    $("#loader").fadeOut();
  });

}

$("#verify").click(function() {
  $("#loader2").fadeIn();
  codeverify()
})

function codeverify() {
  var number = "";

  var numberPreview = $("#phone").val();


  if (numberPreview.startsWith("0")) {
    numberPreview = numberPreview.slice(1);
  }


  if (numberPreview.indexOf("+91") < 1) {
    number = "+91" + numberPreview
  }

  var code = document.getElementById('otp').value;
  coderesult.confirm(code).then(function() {

    var ref = firebase.database().ref().push();
    var key = ref.key;

    
    firebase.database().ref("CircuitSource/Users/"+number).update({
        number: number,
    }, function (value){
         $("#loader2").fadeOut();
      localStorage.setItem("userislogin", "true");
      localStorage.setItem("number", number);
      myFunction("Login successfully")
      window.location.replace("index.html");
    });
     
    




  }).catch(function() {
    $("#error2").html("Invalid OTP");
    $("#error2").css("visibility", "visible");
      $("#loader2").fadeOut();
  })
}

function myFunction(text) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");
  x.innerHTML = text;
  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}