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

loadTools();
loadComponents();
loadProductOne();
checkLogin();



function checkLogin(){
  var lc = localStorage.getItem("userislogin");

  if(lc == "true"){
    $("#login-pending").css("display","none");
    $("#login-done").css("display","flex");
  }

  else{
    $("#login-pending").css("display","flex");
    $("#login-done").css("display","none");
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

        var discPrice = price - discount;
        a++;
         mydiv.innerHTML += 
         `<div class="product-div-one">

      
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
         $("#all-data-div").css("display", "block");
         $("#loader").css("display", "none");
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

        var discPrice = price - discount;
        a++;
         mydiv.innerHTML += 
         `<div class="product-div-one">

      
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
  
          mydiv.innerHTML = `  <div class="product-details">
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
              <button class="buy-now" style="font-family: Sans-serif; font-size: 13px;">BUY NOW</button>
          </div>
          <div class="product-image" >
              <img style="border-radius: 20px;" src="${thumbnail}" alt="Product Image">
          </div>
  `
  
       
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
  

 
