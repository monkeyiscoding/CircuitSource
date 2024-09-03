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


  var name = localStorage.getItem("username");
  var email = localStorage.getItem("email");
  var number = localStorage.getItem("number");

  var url = localStorage.getItem("profile_url");

  const image = document.getElementById('profile-image');
  const image2 = document.getElementById('p-image');
  image.src = url;
  image2.src = url;
  $("#username").html(name);
  $("#email").html(email)


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

  function saveUserData() {
    const imageInput = document.getElementById('image-input');
    const profileImage = document.getElementById('profile-image').src;
    const username = document.getElementById('username-input').value;
    const email = document.getElementById('email-input').value;
    const phoneNumber = number; // Replace this with the actual user phone number
  
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
            database.ref(`CircuitSource/Users/${phoneNumber}`).set({
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
      database.ref(`CircuitSource/Users/${phoneNumber}`).set({
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