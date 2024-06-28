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


  checkLogin();


function checkLogin(){
  var lc = localStorage.getItem("userislogin");
  var name = localStorage.getItem("username");
  var email = localStorage.getItem("email");
  var number = localStorage.getItem("number");

  

  if(lc == "true"){
    $("#login-pending").css("display","none");
    $("#login-done").css("display","flex");
    $("#name").html(name);
    $("#number").html(number);
  }


  else{
    $("#login-pending").css("display","flex");
    $("#login-done").css("display","none");
  }

}


  $("#loader-product-main").css("display","flex")
  loadMostSearchd();
  loadCategory();
  loadProduct();

  var a = 0;

  // Assuming you have an input with id="searchInput"
const searchInput = document.getElementById('searchInput');


/// Event listener for input field on pressing Enter
searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

// Function to handle search submission
function handleSearch() {
    // Get the value of the search input field
    const searchText = searchInput.value.trim().toLowerCase();

    // Perform the search action (example: log the search value)
    console.log('Search submitted:', searchText);


    if(searchText.trim() != ""){
        loadSearchProduct(searchText);
    }
    
    

    // You can also perform other actions here, such as redirecting to a search results page or fetching data from a server
}



function loadProduct() {
    var mydiv = document.getElementById("items-div");
    mydiv.innerHTML= "";
    $("#loader-product").css("display","flex")
  mydiv.classList.remove('grid-container');
  var query = firebase.database().ref("Ecommerce/Categories/-N8lvCT5lnYJNUcWWlaB/products");
  query.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
  
      var title = childSnapshot.val().title;
      var price = childSnapshot.val().price;
      var discount = childSnapshot.val().discount;
      var thumbnail = childSnapshot.val().thumbnail_url;

      var discPrice = price - discount;
      a++;
      $("#loader-product").css("display","none")
      $("#all-data-div-product").css("display","flex")
      $("#loader-product-main").css("display","none")
      mydiv.classList.add('grid-container');


        mydiv.innerHTML += 
        `<div class="product-div-one-search fade-in" style="background-color: white; border-radius: 5px; border: 0.2px solid grey;">
 
     
           <div  style="margin-right: auto;background-color: white; box-shadow: 0px 0px 5px rgb(213, 213, 213); border-radius: 100px; border: 0.5px solid orangered; width: 30px; height: 30px;  align-items: center; text-align: center; justify-content: color: #000; margin-left: 10px"><i class="fa-regular fa-heart" style="margin-top:7px;"></i></div>
       
     <img style="border-radius: 10px;" src="${thumbnail}" height="130px" width="130px" alt="">
 
   
     <h6 style=" height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal;text-align: center; margin-bottom: 0px;overflow: hidden; text-overflow: ellipsis; max-lines: 3; white-space: normal;">${title}</h6>
 
     <div style="display: flex; align-items: center; text-align: center; width: 100%; justify-content: center;">
     <h5  style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 15px; margin-right: 0px; font-weight: bold;text-align: center;">₹${discPrice}</h5>
     <h5 class="original-price" style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: normal;text-align: center;">₹${price}</h5>
     </div>
     
     <!-- <div style="color: white; background-color: orangered; margin: 0px;">
       <h6>20% OFF</h6>
     </div> -->
     
     <button style="background-color: orangered; color: white; font-size: 10px; justify-self: center;text-align:center;margin-left: auto; margin-right: auto;"> Add to cart</button>
          
       
  
 
   
 
 </div>
        `;
 
      


    });
  });
}

function loadSearchProduct(value) {
  var query = firebase.database().ref("Products/-N6l8PzgYxniHSJZK5-0/products");
  var mydiv = document.getElementById("items-div");

  mydiv.innerHTML = "";


  $("#loader-product").css("display","flex")
  mydiv.classList.remove('grid-container');
  query.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
     
      var title = childSnapshot.val().title;
      var price = childSnapshot.val().price;
      var discount = childSnapshot.val().discount;
      var thumbnail = childSnapshot.val().thumbnail_url;

      var discPrice = price - discount;
      a++;

      $("#loader-product-main").css("display","none")
      $("#loader-product").css("display","none")
      $("#all-data-div-product").css("display","flex")
      
      mydiv.classList.add('grid-container');


      
         if(title.trim().toLowerCase().includes(value.trim().toLowerCase())){

        mydiv.innerHTML += 
        `<div class="product-div-one-search fade-in" style="background-color: white; border-radius: 5px; border: 0.2px solid grey;">
 
     
           <div  style="margin-right: auto;background-color: white; box-shadow: 0px 0px 5px rgb(213, 213, 213); border-radius: 100px; border: 0.5px solid orangered; width: 30px; height: 30px;  align-items: center; text-align: center; justify-content: color: #000; margin-left: 10px"><i class="fa-regular fa-heart" style="margin-top:7px;"></i></div>
       
     <img style="border-radius: 10px;" src="${thumbnail}" height="130px" width="130px" alt="">
 
   
     <h6 style=" height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal;text-align: center; margin-bottom: 0px;overflow: hidden; text-overflow: ellipsis; max-lines: 3; white-space: normal;">${title}</h6>
 
     <div style="display: flex; align-items: center; text-align: center; width: 100%; justify-content: center;">
     <h5  style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 15px; margin-right: 0px; font-weight: bold;text-align: center;">₹${discPrice}</h5>
     <h5 class="original-price" style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: normal;text-align: center;">₹${price}</h5>
     </div>
     
     <!-- <div style="color: white; background-color: orangered; margin: 0px;">
       <h6>20% OFF</h6>
     </div> -->
     
     <button style="background-color: orangered; color: white; font-size: 10px; justify-self: center;text-align:center;margin-left: auto; margin-right: auto;"> Add to cart</button>
          
       
  
 
   
 
 </div>
        `;

        $("#not-found").css("display","none")
 
      }

      else{

        if(mydiv.innerHTML == ""){
            $("#not-found").css("display","block")
        }
        
 
      }
      

     


    });
  });
}


var searchedCount = 0;

function loadMostSearchd() {
  var query = firebase.database().ref("CircuitSource/top_searched_web");
  query.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var mydiv = document.getElementById("most-searched-div");

      var title = childSnapshot.val().title;
      searchedCount++;

      
       mydiv.innerHTML += 
       `
          <div class="suggestion-text">
              <h5 class="" style="margin: 0px; font-weight: normal; cursor: pointer;">${searchedCount}. ${title}</h5>
              <div style="width: auto;"></div>
              <i class="fa-solid fa-arrow-right" style="float: right; right: 10px;"></i>
          </div>
       `;

    });
  });
}



var cCount = 0;
function loadCategory() {
  var query = firebase.database().ref("CircuitSource/top_category");
  query.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var mydiv = document.getElementById("category-div");
      var title = childSnapshot.val().title;
      var des = childSnapshot.val().description;

      cCount++;
      
       mydiv.innerHTML += 
       `
              <div style="border: 0.3px solid rgb(186, 186, 186); margin-right: 20px; border-radius: 5px; padding: 10px; margin-bottom: 12px; cursor: pointer;">
          <h5 style="margin-left: 10px; font-weight: bold; margin: 0px;">${cCount}. ${title}</h5>

          <h6 style="margin-left: 0px; font-weight: normal; margin: 0px; margin-left: 15px; margin-top: 3px;color: gray;">${des}</h6>
      
      </div>

       `;

    });
  });
}

loadSuggestions();

function loadSuggestions() {
    var query = firebase.database().ref("CircuitSource/top_suggestions");
    query.once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var mydiv = document.getElementById("top-suggestion-div");
        var title = childSnapshot.val().title;
        var key = childSnapshot.val().key;
  
        cCount++;
        
         mydiv.innerHTML += 
         `
              <a onClick="searchSuggestion(\`` +
        key +
        `\`,)" style="text-decoration: none; color: black; margin-right: 10px;" ><h5 style="" class="not-active-suggestion">${title}</h5>

              </a>

                
  
         `;

        
  
      });
    });
  }


  function searchSuggestion(value){
  
  var myInput = document.getElementById("searchInput");
  
  myInput.value = value;

  if(value.trim().toLowerCase() == "all"){
   loadProduct();
  }

  else{
    loadSearchProduct(value);

  }
  

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
   
