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
  const storage = firebase.storage();
  const database = firebase.database();

var city = "Unknown";
var region = "unknown";
        // Fetch user's location information using IP
fetch('https://ipinfo.io/json?token=b9158001bffcc8')
.then(response => response.json())
.then(data => {
  city = data.city;
  region = data.region; // State
 
})
.catch(error => console.error('Error fetching location:', error));
  

//   var lcs = localStorage.setItem("userislogin","true");
//   var nameq = localStorage.setItem("username","lscfhd");
//   var emailq = localStorage.setItem("email","djfhd");
//   var numbeqr = localStorage.setItem("number","+919664112386");



  var name = localStorage.getItem("username");
  var email = localStorage.getItem("email");
  var deviceId = localStorage.getItem("deviceId");
  var number = localStorage.getItem("number");

  var url = localStorage.getItem("profile_url");

  const image = document.getElementById('profile-image');
  const image2 = document.getElementById('p-image');
  image.src = url;
  image2.src = url;
  $("#username").html(name);
  $("#email").html(email)

  var lc = localStorage.getItem("userislogin");
    if(lc != "true"){
        $("#username").css("display","none");
        $("#email").css("display","none");
        $("#p-image").css("display","none");
        $("#login-text").css("display","block");
        $("#login-button").css("display","block");
        $("#logout-button").css("display","none");
        
    }

  function openDialogCheck(){
    
    var lc = localStorage.getItem("userislogin");
    if(lc == "true"){
        openDialog();
        
    }
    else{
        window.location.href = "login.html";
    }
  }

  function openDialog() {
    document.getElementById('overlay').style.display = 'flex';
    $("#email-input").val(email);
    $("#username-input").val(name);
    $("#number-input").val(number);
  }

  function closeDialog() {
    document.getElementById('overlay').style.display = 'none';
  }

  function login(){
    location.href = "login.html";
  }



  function saveUserData() {
    const imageInput = document.getElementById('image-input');
    const profileImage = document.getElementById('profile-image').src;
    const username = document.getElementById('username-input').value;
    const email = document.getElementById('email-input').value;
    const phoneNumber = number; // Replace this with the actual user phone number
    

    if(username.trim().length < 4){
        myFunction("Enter full name");
    }

    else if(!email.includes("@")){
        myFunction("Invalid emial address");
    }

    else{
 if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      const storageRef = storage.ref(`circuitsource/users/${phoneNumber}/profile_url`);
      const uploadTask = storageRef.put(file);
      closeDialog();
      document.getElementById('overlay-saving').style.display = 'flex';
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Progress function if needed
        }, 
        (error) => {
          console.log('Error uploading file:', error);
        }, 
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            // Save to Realtime Database
            database.ref(`CircuitSource/Users/${phoneNumber}`).update({
              profile_url: downloadURL,
              username: username,
              email: email
            });
            const image2 = document.getElementById('p-image');
            image2.src = url;
            // Save to localStorage
            localStorage.setItem('profile_url', downloadURL);
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            document.getElementById('overlay-saving').style.display = 'none';
            // Reloads the current page
            myFunction("Data Saved")
            location.reload();
            
            console.log('Data saved successfully!');
          });
        }
      );
    } else {
        closeDialog();
      // If no new image was selected, just save the username and email
      database.ref(`CircuitSource/Users/${phoneNumber}`).update({
        profile_url: profileImage,
        username: username,
        email: email
      });

  
      // Save to localStorage
      localStorage.setItem('profile_url', profileImage);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      location.reload();
     myFunction("Data Saved");
    }
    }
   
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

  function triggerFileInput() {
    document.getElementById('image-input').click();
  }
  
  function loadImage(event) {
    const image = document.getElementById('profile-image');
    image.src = URL.createObjectURL(event.target.files[0]);
  }


  // logout

  function openLogoutDialog(){
    document.getElementById('overlay-logout').style.display = 'flex';
  }

  function closeLogoutDialog(){
    document.getElementById('overlay-logout').style.display = 'none';
  }


  function logOut() {
    // Get the selected radio input value
    const selectedOption = document.querySelector('input[name="logout_option"]:checked').value;
    
    // Call the logOutNow function with the selected type
    logOutNow(selectedOption);
  }

  // Function to log out and update Firebase Realtime Database
  function logOutNow(type) {
    const number = localStorage.getItem("number");  // Assume the user's phone number is stored in localStorage
    const currentDevice = detectDeviceType();  // Get device type (mobile or PC)

    


    if (type === "all") {
        var os = getDeviceModel();
        document.getElementById('overlay-logout').style.display = 'none';
        document.getElementById('overlay-loading').style.display = 'flex';

      // Update localStorage
      localStorage.setItem("userislogin", "false");
      localStorage.removeItem("number");
      localStorage.removeItem("email");
      localStorage.removeItem("username");

      // Remove all devices from Firebase under `Users/number/login_devices/`
      firebase.database().ref(`CircuitSource/Users/${number}/login_devices`).remove()
        .then(() => {
          console.log("Removed all login devices from Firebase");
        });

      // Set `Users/${number}/currentDevice` to "no device"
      firebase.database().ref(`CircuitSource/Users/${number}/currentDevice`).set("no device")
        .then(() => {
          console.log("Set current device to 'no device' in Firebase");
        });

      // Add a new logout session with device details
      const newSessionKey = firebase.database().ref().child(`Users/${number}/logout_sessions`).push().key;
      const logoutSessionData = {
        os:os,
        city: city,
        state: region,
        devicename: currentDevice,
        deviceId: deviceId,
        currenttime: new Date().toLocaleTimeString(),
        currentdate: new Date().toLocaleDateString(),
        platform: navigator.platform,  // Detect platform (e.g., Windows, Mac)
        type: "all"  // Logout type
      };

      // Save the logout session data to Firebase
      firebase.database().ref(`CircuitSource/Users/${number}/logout_sessions/${newSessionKey}`).set(logoutSessionData)
        .then(() => {
          console.log("Added logout session to Firebase");
          document.getElementById('overlay-loading').style.display = 'none';
          window.location.href = "index.html"
        });

    }
    
    else if (type === "this") {
        var os = getDeviceModel();
        document.getElementById('overlay-logout').style.display = 'none';
        document.getElementById('overlay-loading').style.display = 'flex';

      // Update localStorage
      localStorage.setItem("userislogin", "false");
      localStorage.removeItem("number");
      localStorage.removeItem("email");
      localStorage.removeItem("username");

      // Remove all devices from Firebase under `Users/number/login_devices/`
      firebase.database().ref(`CircuitSource/Users/${number}/login_devices/${deviceId}`).remove()
        .then(() => {
          console.log("Removed all login devices from Firebase");
        });

      // Set `Users/${number}/currentDevice` to "no device"
      firebase.database().ref(`CircuitSource/Users/${number}/currentDevice`).set("no device")
        .then(() => {
          console.log("Set current device to 'no device' in Firebase");
        });

      // Add a new logout session with device details
      const newSessionKey = firebase.database().ref().child(`Users/${number}/logout_sessions`).push().key;
      const logoutSessionData = {
        os: os,
        city: city,
        deviceId: deviceId,
        state: region,
        devicename: currentDevice,
        currenttime: new Date().toLocaleTimeString(),
        currentdate: new Date().toLocaleDateString(),
        platform: navigator.platform,  // Detect platform (e.g., Windows, Mac)
        type: "this"  // Logout type
      };

      // Save the logout session data to Firebase
      firebase.database().ref(`CircuitSource/Users/${number}/logout_sessions/${newSessionKey}`).set(logoutSessionData)
        .then(() => {
          console.log("Added logout session to Firebase");
          document.getElementById('overlay-loading').style.display = 'none';
          window.location.href = "index.html"
        });

    }

    // Redirect or additional logout logic can be placed here
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
  
  