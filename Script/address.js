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


checkLogin();


loadDefaultAddress();

loardCartCount();




function loardCartCount(){
    number = localStorage.getItem("number");
    query = firebase.database().ref("Users/" + number + "/my_cart");
    query.on("value", function(snapshot) { 
        var childrenCount = snapshot.numChildren();
        if(snapshot.exists){
            $(".cart-indicator").html(childrenCount);
        }

        else{
            $(".cart-indicator").html("0");
        }
        
    });

}




 function checkLogin(){
    var lc = localStorage.getItem("userislogin");
  // var lc = "true";
   
  
    if(lc == "true"){
        $("#cart-icon").css("margin-right"," 50px");
      $("#login-pending").css("display","none");
     
      
      checkDevice(deviceId);
    }
  
  
  
  
  }
  


  function loadDefaultAddress(){
    var number = localStorage.getItem("number");
  var query = firebase.database().ref("Users/"+number)
  
  query.on("value", function(snapshot) {
  
    
      var m = snapshot.val().default_location;
     // myFunction(m);
      loadAllAddress(m.toString());

  })
}

var count = 0;
function loadAllAddress(key) {
    var count = 0;
    var number = localStorage.getItem("number");
    var query = firebase.database().ref("Users/" + number + "/location");

    query.once("value", function(snapshot) {
        var mydiv = document.getElementById("address-div");
        mydiv.innerHTML = "";

        if (snapshot.exists()) {
            $("#address-div").css("display", "grid");
            $("#no-address").css("display", "none");
        } else {
            $("#address-div").css("display", "none");
            $("#no-address").css("display", "block");
            return; // Exit if no addresses exist
        }

        // Convert snapshot to array and reverse it
        var addresses = [];
        snapshot.forEach(function(childSnapshot) {
            var addressData = childSnapshot.val();
            addresses.push(addressData);
        });
        addresses.reverse(); // Reverse array to show latest first

        addresses.forEach(function(addressData) {
            count++;
            var adKey = addressData.key;
            var address = addressData.location;
            //var state = addressData.state;
            //var city = addressData.city;
            var pin = addressData.pin_code;
            var name = localStorage.getItem("username");
            //var landmark = addressData.landmark;
            var mobileNumber = number;

            var addressClass = adKey === key ? 'address' : 'address-not-use';

            var addressHTML = `
                <div class="${addressClass}">
                    <div style="display: flex; align-items: center;">
                        <img style="width: 50px; height: 50px;" src="Images/map.png" alt="">
                        <h5 style="margin-left: 10px;">ADDRESS - 0${count}</h5>
            `;

            if (adKey === key) {
                addressHTML += `
                    <button class="primary-button" style="background-color: orangered; border-radius: 100px; margin-left: auto;">
                        <i class="fa-solid fa-check" style="color: white;"></i>
                    </button>
                `;
            } else {
                addressHTML += `
                    <button class="use-button" data-key="${adKey}" style="background-color: black; border-radius: 100px; margin-left: auto;">Use</button>
                `;
            }

            addressHTML += `
                    </div>
                    <h5 style="margin-left: 10px; font-weight: normal;">${name}, ${address}, ${pin}</h5>
                    <h5 style="margin-left: 10px; font-weight: normal;">Mobile - ${mobileNumber}</h5>
                </div>
            `;

            mydiv.innerHTML += addressHTML;
        });

        // Add event listeners to "Use" buttons
        var useButtons = document.querySelectorAll('.use-button');
        useButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var adKey = this.getAttribute('data-key');
                firebase.database().ref("Users/" + number + "/default_location").set(adKey)
                .then(function() {
                    myFunction('Primary address updated successfully');
                    loadAllAddress(adKey); // Refresh the address list to update the UI
                })
                .catch(function(error) {
                    console.error('Error updating primary address: ', error);
                });
            });
        });
    });
}



function openDialog() {
    document.getElementById('overlay').style.display = 'flex';
  }
  
  function closeDialog() {
    document.getElementById('overlay').style.display = 'none';
  }
  
  document.getElementById('addressForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Fetch form values
    var fullName = document.getElementById('fullName').value;
    var addressLine = document.getElementById('addressLine').value;
    var landmark = document.getElementById('landmark').value;
    var state = document.getElementById('state').value;
    var city = document.getElementById('city').value;
    var pincode = document.getElementById('pincode').value;
    var mobileNumber = document.getElementById('mobileNumber').value;

    var number = localStorage.getItem("number");

    var query = firebase.database().ref("Users/"+number+"/address_list")

    var key = query.push().key;
    var query2 = firebase.database().ref("Users/"+number+"/location/"+key)
    var query3 = firebase.database().ref("Users/"+number+"/default_location/key")

  
    query2.update({
        full_name: fullName,
        address: addressLine,
        landmark: landmark,
        state: state,
        city: city,
        pincode: pincode,
        key: key,
        mobileNumber: mobileNumber,
    }, function (error){

        var checkbox = document.getElementById('agreeCheckbox');
  var isChecked = checkbox.checked;

  if(isChecked){
    query3.set(key);
  }
  closeDialog();
       myFunction("Address Saved");
       event.preventDefault(); // Prevent form submission
       var form = document.getElementById('addressForm');
       form.reset(); // Reset the form fieldsfullName.value = "";
       
    })

    // Close the dialog after submission (optional)
    
  });
  

  function myFunction(text) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerHTML = text;
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
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