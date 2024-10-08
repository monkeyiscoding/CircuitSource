

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

  var lc = localStorage.getItem("userislogin");
  if(lc == "true"){
    window.location.href = "index.html";
  }

  var number = localStorage.getItem("number");
  var sKey = firebase.database().ref("CircuitSource/Users/" + number).push().key;

  
  var city = "Unknown";
var region = "unknown";
        // Fetch user's location information using IP
fetch('https://ipinfo.io/json?token=b9158001bffcc8')
.then(response => response.json())
.then(data => {
  city = data.city;
  region = data.region; // State
  console.log(`City: ${city}, State: ${region}`);
})
.catch(error => console.error('Error fetching location:', error));
  
var capta = false;
var fullNumber = "";
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
    $("#login").css("display", "none");
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
    $("#loader-otp").css("visibility", "visible");
    $("#verify").css("display", "none");
  $("#loader-otp").fadeIn();
  codeverify()
})

$("#save").click(function() {
    var name = $("#username").val();
    var email = $("#email").val();
    if(name.trim().length < 4){
    $("#erro3").html("Enter Full name");
    $("#error3").css("visibility", "visible");
    }
    else if(!email.includes("@")){
        $("#erro3").html("Enter valid email address");
    $("#error3").css("visibility", "visible");
    }

    else{
        $("#loader-details").css("visibility", "visible");
        $("#save").css("display", "none");
        $("#loader-details").fadeIn();

        firebase.database().ref("CircuitSource/Users/"+fullNumber).update({
            number: fullNumber,
            email: email,
            username: name,
        }, function (value){
          
         
            saveData(email, name, fullNumber,"",sKey);
            
          
        });
         
    }

})

function codeverify() {
  var number = "";
  var numberPreview = $("#phone").val();

  // Remove leading "0" if exists
  if (numberPreview.startsWith("0")) {
    numberPreview = numberPreview.slice(1);
  }

  // Add +91 if it's not present
  if (numberPreview.indexOf("+91") < 1) {
    number = "+91" + numberPreview;
  }

  var code = document.getElementById('otp').value;
  coderesult.confirm(code).then(function() {
    var ref = firebase.database().ref().push();
    var key = ref.key;
    const platform = navigator.platform;
    
    // Save user login info
    firebase.database().ref("CircuitSource/Users/" + number).update({
      number: number,
      first_login_on: platform,
      currentDevice: platform
    }, function (value) {

      // Get current date and time
      const currentDate = new Date();
      var device = detectDeviceType();
      var os = getDeviceModel();

      // Extract the date and time components
      const date = currentDate.toLocaleDateString(); // e.g., "8/21/2024"
      const time = currentDate.toLocaleTimeString(); // e.g., "10:30:15 AM"


      // Update login sessions
      firebase.database().ref("CircuitSource/Users/" + number + "/login_sessions/" + sKey).update({
        platform: platform,
        time: time,
        date: date,
        key: sKey,
        city: city,
        state: region,
        deviceId: sKey,
        os: os,
        devicename: device,
        platform: navigator.platform, 
      });

      // Save sKey in login_devices as DeviceId
      firebase.database().ref("CircuitSource/Users/" + number + "/login_devices/"+sKey+"/deviceId").set(sKey);

      fullNumber = number;

      // Check if user has email or username saved
      var query = firebase.database().ref("CircuitSource/Users/" + number);
      query.once('value', function(snapshot) {
        if (snapshot.hasChild("email")) {
          var email = snapshot.val().email;
          var username = snapshot.val().username;
          var url = snapshot.val().profile_url;


          saveData(email, username, number, url, sKey);
        } else {
          $("#div-otp").css("display", "none");
          $("#div-details").css("display", "block");
          $("#div-details").fadeIn();
        }
      });
    });
  }).catch(function() {
    $("#verify").css("display", "flex");
    $("#error2").html("Invalid OTP");
    $("#error2").css("visibility", "visible");
    $("#loader-otp").css("visibility", "hidden");
    $("#loader-otp").fadeOut();
  });
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

function getEmail(){
     
}


function saveData(email, username, number , url, sKey){
  myFunction(sKey);
    $("#loader2").fadeOut();
      localStorage.setItem("userislogin", "true");
      localStorage.setItem("number", number);
      localStorage.setItem('profile_url', url);
      localStorage.setItem("email", email);
      localStorage.setItem("deviceId", sKey);
      localStorage.setItem("username", username);
      myFunction("Login successfully")
      window.location.replace("index.html");
}


 // Function to detect device type
 function detectDeviceType() {
  const userAgent = navigator.userAgent.toLowerCase();

  if (/mobile|android|touch|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent)) {
    return "mobile";
  } else {
    return "pc";
  }
}

function getDeviceModel() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // For Android devices
  if (/android/i.test(userAgent)) {
    return "Android Device";
  }

  // For iOS devices
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS Device";
  }

  // For other devices
  return "Unknown Device";
}

