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
localStorage.setItem("recent-search","");
const storage = firebase.storage();
const database = firebase.database();


loadProductOne();
loadSuggestions();
// loading data

var name = localStorage.getItem("username");
var email = localStorage.getItem("email");
var number = localStorage.getItem("number");
var deviceId = localStorage.getItem("deviceId");




var url = localStorage.getItem("profile_url");

const image = document.getElementById('profile-image-pc');
const image2 = document.getElementById('p-image-pc');
image.src = url;
image2.src = url;
$("#email-input-pc").val(email);
$("#username-input-pc").val(name);
$("#number-input-pc").val(number);
var query = firebase.database().ref("CircuitSource/Web/home_screen");
query.once("value", function (snapshot) {

  var data = snapshot.val(); // Get all data at once
  var tag_line = data.tag_line;
  var poster_url = data.poster.url;
  var poster_type = data.poster.type;
  var poster_key = data.poster.product_key;
  var details_div_title = data.details_div.title;
  var details_div_url = data.details_div.url;
  var details_div_des = data.details_div.description;
  var details_div_button_text = data.details_div.button_text;
  var details_div_type = data.details_div.type;
  var details_div_key = data.details_div.key;


  $("#tag-line").html(tag_line);

  // mobile div one
  $("#details-title").html(details_div_title);
  $("#details-des").html(details_div_des);
  $("#details-button").html(details_div_button_text);
  $("#details-thumbnial").attr("src", details_div_url); // Assuming you want to set the poster URL in an image element

  // pc div one
  $("#details-title-pc").html(details_div_title);
  $("#details-des-pc").html(details_div_des);
  $("#details-button-pc").html(details_div_button_text);
  $("#details-thumbnial-pc").attr("src", details_div_url); // Assuming you want to set the poster URL in an image element

  // poster mobile
  $("#home-poster-m").attr("src", poster_url); // Assuming you want to set the poster URL in an image element

  $("#home-poster-m").click(function() {

    if(poster_type == "product"){
       openProduct(poster_key);
    }

    else if(poster_type == "serach"){
      searchCategory(poster_key);
    }

    else if(poster_type == "page"){

    }
   
  });

  $("#details-button-pc-bt").click(function() {

    if(details_div_type == "product"){
       openProduct(details_div_key);
    }

    else if(details_div_type == "serach"){
      searchCategory(details_div_key);
    }

    else if(details_div_type == "page"){

    }
   
  });

  $("#details-button-m-bt").click(function() {

    if(details_div_type == "product"){
       openProduct(details_div_key);
    }

    else if(details_div_type == "serach"){
      searchCategory(details_div_key);
    }

    else if(details_div_type == "page"){

    }
   
  });
});



$("#search-button-m").click(function() {

  handleSearch();
 
});

$("#view-components").click(function() {

  
    localStorage.setItem("recent-search","Compoents");
    window.location.href="products.html";
  
 
});

$("#view-tools").click(function() {

  
  localStorage.setItem("recent-search","Tools");
  window.location.href="products.html";


});

$("#view-components-pc").click(function() {

  
  localStorage.setItem("recent-search","Compoents");
  window.location.href="products.html";


});

$("#view-tools-pc").click(function() {


localStorage.setItem("recent-search","Tools");
window.location.href="products.html";


});

loadTools();
loadComponents();

checkLogin();
loardCartCount();
loadToolsMobile();
loadComponentsMobile();




function loardCartCount(){
    number = localStorage.getItem("number");
    query = firebase.database().ref("CircuitSource/Users/" + number + "/my_cart");
    query.on("value", function(snapshot) { 
        var childrenCount = snapshot.numChildren();
        if(snapshot.exists){
            $(".cart-indicator").html(childrenCount);
            $(".cart-indicator-2").html(childrenCount);
        }

        else{
            $(".cart-indicator").html("0");
            $(".cart-indicator-2").html("0");
        }
        
    });

}


function checkLogin(){
  var lc = localStorage.getItem("userislogin");
  var name = localStorage.getItem("username");
  var email = localStorage.getItem("email");
  var number = localStorage.getItem("number");



  if(lc == "true"){
    $("#login-pending").css("display","none");
    $("#login-done").css("display","flex");
    $("#profile-m").css("display","flex");
    $("#login-button-m").css("display","none");
    $("#name").html(name);
    $("#number").html(number);

    $("#login-pending-m").css("display","none");
    $("#login-done-m").css("display","flex");
    $("#profile-m").css("display","flex");
    $("#login-button-m").css("display","none");
    
    checkDevice(deviceId);
  }


  else{
    $("#login-pending").css("display","flex");
    $("#login-done").css("display","none");
    $("#profile-m").css("display","none");
    $("#login-button-m").css("display","flex");
  }

}



var query = firebase.database().ref("CircuitSource/top_category/1");

query.update({
  title: "Multimeter",
  description: "Digital Multimeter, Can Multimeter, AMM Multimeter"
})

 var a = 0;
 function loadTools() {
    var query = firebase.database().ref("Ecommerce/Categories/-N8lvCT5lnYJNUcWWlaB/products");
    query.once("value", function (snapshot) {
      
      snapshot.forEach(function (childSnapshot) {
        var mydiv = document.getElementById("products-div-components");
        
        var title = childSnapshot.val().title;
        var price = childSnapshot.val().price;
        var discount = childSnapshot.val().discount;
        var thumbnail = childSnapshot.val().thumbnail_url;
        var key = childSnapshot.val().key;

        var discPrice = price - discount;
        a++;
         mydiv.innerHTML += 
         `<div  onClick="openProduct(\`` +
      key +
      `\`,)"  class="product-div-one">

      
      <img style="border-radius: 10px;"  src="${thumbnail}" height="100px" width="100px" alt="">

      <h6 style=" height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal;text-align: left; margin-bottom: 0px;overflow: hidden; text-overflow: ellipsis; max-lines: 3; width: 100px; white-space: normal;">${title}</h6>

      <div style="display: flex; align-items: center;">
<h5  style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 15px; margin-right: 0px; font-weight: bold;text-align: left;">₹${discPrice}</h5>
<h5 class="original-price" style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: normal;text-align: left;">₹${price}</h5>

      </div>
      
      <!-- <div style="color: white; background-color: orangered; margin: 0px;">
        <h6>20% OFF</h6>
      </div> -->
    </div>

  </div>
         `;
         
      });
    });
  }

  function loadToolsMobile() {
    var query = firebase.database().ref("Ecommerce/Categories/-N8lvCT5lnYJNUcWWlaB/products");
    query.once("value", function (snapshot) {
      
      snapshot.forEach(function (childSnapshot) {
        var mydiv = document.getElementById("products-div-components-m");
        
        var title = childSnapshot.val().title;
        var price = childSnapshot.val().price;
        var discount = childSnapshot.val().discount;
        var thumbnail = childSnapshot.val().thumbnail_url;
        var key = childSnapshot.val().key;
        var discPrice = price - discount;
        a++;
         mydiv.innerHTML += 
         `<div  onClick="openProduct(\`` +
      key +
      `\`,)"  class="product-div-one">

      
      <img style="border-radius: 10px;"  src="${thumbnail}" height="100px" width="100px" alt="">

      <h6 style=" height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal;text-align: left; margin-bottom: 0px;overflow: hidden; text-overflow: ellipsis; max-lines: 3; width: 100px; white-space: normal;">${title}</h6>

      <div style="display: flex; align-items: center;">
<h5  style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 15px; margin-right: 0px; font-weight: bold;text-align: left;">₹${discPrice}</h5>
<h5 class="original-price" style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: normal;text-align: left;">₹${price}</h5>

      </div>
      
      <!-- <div style="color: white; background-color: orangered; margin: 0px;">
        <h6>20% OFF</h6>
      </div> -->
    </div>

  </div>
         `;


      });
    });
  }


 function loadComponents() {
    var query = firebase.database().ref("Ecommerce/Categories/-N6l8PzgYxniHSJZK5-0/products");
    query.once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var mydiv = document.getElementById("products-div-tools");

        var title = childSnapshot.val().title;
        var price = childSnapshot.val().price;
        var discount = childSnapshot.val().discount;
        var thumbnail = childSnapshot.val().thumbnail_url;
        var key = childSnapshot.val().key;

        var discPrice = price - discount;
        a++;
         mydiv.innerHTML += 
         `<div onClick="openProduct(\`` +
      key +
      `\`,)" class="product-div-one">

      
      <img style="border-radius: 10px;" src="${thumbnail}" height="100px" width="100px" alt="">

      <h6 style=" height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal;text-align: left; margin-bottom: 0px;overflow: hidden; text-overflow: ellipsis; max-lines: 3; width: 100px; white-space: normal;">${title}</h6>

      <div style="display: flex; align-items: center;">
<h5  style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 15px; margin-right: 0px; font-weight: bold;text-align: left;">₹${discPrice}</h5>
<h5 class="original-price" style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: normal;text-align: left;">₹${price}</h5>

      </div>
      
      <!-- <div style="color: white; background-color: orangered; margin: 0px;">
        <h6>20% OFF</h6>
      </div> -->
    </div>

  </div>
         `;
  
      });
    });
  }


  function loadComponentsMobile() {
    var query = firebase.database().ref("Ecommerce/Categories/-N6l8PzgYxniHSJZK5-0/products");
    query.once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var mydiv = document.getElementById("products-div-tools-m");

        var title = childSnapshot.val().title;
        var price = childSnapshot.val().price;
        var discount = childSnapshot.val().discount;
        var thumbnail = childSnapshot.val().thumbnail_url;
        var key = childSnapshot.val().key;

        var discPrice = price - discount;
        a++;
         mydiv.innerHTML += 
         `<div onClick="openProduct(\`` +
      key +
      `\`,)"  class="product-div-one">

      
      <img style="border-radius: 10px;" src="${thumbnail}" height="100px" width="100px" alt="">

      <h6 style=" height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal;text-align: left; margin-bottom: 0px;overflow: hidden; text-overflow: ellipsis; max-lines: 3; width: 100px; white-space: normal;">${title}</h6>

      <div style="display: flex; align-items: center;">
<h5  style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 15px; margin-right: 0px; font-weight: bold;text-align: left;">₹${discPrice}</h5>
<h5 class="original-price" style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: normal;text-align: left;">₹${price}</h5>

      </div>
      
      <!-- <div style="color: white; background-color: orangered; margin: 0px;">
        <h6>20% OFF</h6>
      </div> -->
    </div>

  </div>
         `;
  
      });
    });
  }




  function loadProductOne(){
    var query = firebase.database().ref("Ecommerce/Categories/-N8lvCT5lnYJNUcWWlaB/top_key");
    query.once("value", function (snapshot) {
      var key = snapshot.val();
      var query2 = firebase.database().ref("Ecommerce/Categories/-N8lvCT5lnYJNUcWWlaB/products/"+key);
 

      query2.once("value", function(snapshot2){

          var mydiv = document.getElementById("banner-div");
          var title = snapshot2.val().title;
          var price = snapshot2.val().price;
          var des = snapshot2.val().description;
          var thumbnail = snapshot2.val().thumbnail_url;
          var discount = snapshot2.val().discount; 

          var discPrice = price - discount;
  
          mydiv.innerHTML = `  <div class="product-details fade-in">
              <h1 style="font-family: Sans-serif;">${title}</h1>
              <p style="font-family: Sans-serif; font-weight: 200; font-size: 14px;">${des}</p>
            
              <div class="wrapper" style="margin-top: 60px;">
                <a class="button" href="#">Add To Cart <i style="margin-left: 10px;" class="fas fa-shopping-cart"></i></a>
            </div>
            
            <!-- Filter: https://css-tricks.com/gooey-effect/ -->
            <svg style="visibility: hidden; position: absolute;" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />    
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                    </filter>
                </defs>
            </svg>
              <button class="buy-now" style="font-family: Sans-serif; font-size: 13px;">View Product</button>
          </div>
          <div class="product-image" style="background-color: white;">
              <img style="border-radius: 20px; margin-top: 20px;" src="${thumbnail}" alt="Product Image">
          </div>
  `
 
  $("#loader").css("display", "none");
  $("#all-data-div").css("display", "block");
  $(".main-div-m").css("display", "block");
  $("#loader-m").css("display", "none");
         
       
      })
    
    });
  }


  // Get the dropdown elements
const dropdownButton = document.getElementById('login-done');
const dropdownContent = document.getElementById('profile');




// Function to show dropdown
const showDropdown = () => {
    dropdownContent.style.display = 'block';
};

// Function to hide dropdown
const hideDropdown = () => {
    dropdownContent.style.display = 'none';
};

// Event listeners for hover
dropdownButton.addEventListener('mouseover', showDropdown);

dropdownContent.addEventListener('mouseover', showDropdown);
dropdownContent.addEventListener('mouseout', hideDropdown);
  

 

// Assuming you have an input with id="searchInput"
const searchInput = document.getElementById('searchInput-m');


/// Event listener for input field on pressing Enter
searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

// Function to handle search submission
function handleSearch() {
  var text = $("#searchInput-m").val();


  if(text.trim() != ""){
    localStorage.setItem("recent-search",text);
    window.location.href="products.html";
  }
  else{ 
    window.location.href="products.html";
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


document.addEventListener('scroll', function () {
    const tagLine = document.getElementById('tag-line');
    const searchDiv = document.getElementById('search-div-m');
  

    const tagLineRect = tagLine.getBoundingClientRect();

    if (tagLineRect.bottom <= 0) { // If tag-line is not visible
        searchDiv.classList.add('fixed');
        $(".search-left").css("width","76%");
        $(".search-right").css("width","10%");
      
    } else {
        searchDiv.classList.remove('fixed');
        $(".search-left").css("width","80%");
        $(".search-right").css("width","15%");
    }
});


function loadSuggestions() {
  var query = firebase.database().ref("CircuitSource/Web/home_screen/top_categories");
  query.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var mydiv = document.getElementById("category-div-m");
      var title = childSnapshot.val().title;
      

    
      
       mydiv.innerHTML += 
       `
            <a  onClick="searchCategory(\`` +
      title +
      `\`,)" style="text-decoration: none; color: black; margin-right: 10px;" ><h5  style="" class="home-category">${title}</h5>

            </a>

              

       `;

      

    });
  });
}
function openProduct(key){
  localStorage.setItem("search-key", key);
  window.location.href = "productoverview.html";
}

// Function to handle search submission
function searchCategory(text) {

  if(text.trim() != ""){
    localStorage.setItem("recent-search",text);
    window.location.href="products.html";
  }
 }



 // edit account
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
  const profileImage = document.getElementById('profile-image-pc').src;
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
          database.ref(`CircuitSource/Users/${phoneNumber}`).set({
            profile_url: downloadURL,
            username: username,
            email: email
          });
          const image2 = document.getElementById('p-image-pc');
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
 
}

function triggerFileInput() {
  document.getElementById('image-input').click();
}

function loadImage(event) {
  const image = document.getElementById('profile-image-pc');
  image.src = URL.createObjectURL(event.target.files[0]);
}

function checkDevice(deviceId) {
  myFunction(deviceId);
  // Reference to the path in your Realtime Database
  const deviceRef = database.ref(`CircuitSource/Users/${number}/login_devices/${deviceId}`);

  deviceRef.once('value')
    .then(snapshot => {
      if (!snapshot.exists()) {
        // Device ID does not exist in the database
        // Update localStorage
        localStorage.setItem("userislogin", "false");
        localStorage.removeItem("number");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        localStorage.removeItem("deviceId");

        console.log("Device Verification failed");
        window.location.reload();
      }
      else{
        console.log("Device Verified");
      }
    })
    .catch(error => {
      console.error("Error checking device:", error);
    });
}
