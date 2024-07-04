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
  loadImages();
  loadData();
  loadPoints();

  loardCartCount();




function loardCartCount(){
    number = localStorage.getItem("number");
    query = firebase.database().ref("CircuitSource/Users/" + number + "/my_cart");
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
  function loadImages() {
    var mydiv = document.getElementById("all-images");
    var mytitle = document.getElementById("title");
   var key = localStorage.getItem("search-key")
  //mydiv.classList.remove('grid-container');
  var query = firebase.database().ref("CircuitSource/all_products/"+key+"/Images");
  query.once("value", function (snapshot) {


    snapshot.forEach(function (childSnapshot) {

        
     var url = childSnapshot.val().url;

     // mydiv.classList.add('grid-container');

     mydiv.innerHTML  += `<img onClick="setImage(\`` +
        url +
        `\`,)" style="cursor: pointer;" class="product-image-option-deactive" src="${url}" alt="">
                  `
    

    });
  });


  
}


function setImage(url){
    var myImage = document.getElementById("full-image");
    myImage.src = url;

}
function loadPoints() {
    var mydiv = document.getElementById("points-div");
   var key = localStorage.getItem("search-key")
  //mydiv.classList.remove('grid-container');
  var query = firebase.database().ref("CircuitSource/all_products/"+key+"/details");
  query.once("value", function (snapshot) {


    snapshot.forEach(function (childSnapshot) {

        
     var title = childSnapshot.val().title;

     // mydiv.classList.add('grid-container');

     mydiv.innerHTML  += `  <h5 style="font-weight: normal; margin-top: 0px; margin-bottom: 10px;"> <i class="fa-solid fa-check-to-slot" style="margin-right: 5px;" ></i>${title}</h5>
                      
                       
                  `
    

    });
  });


  
}

var cTitle = "";
var des = "";
var url = "";
var mQuantity = "";
var price= "";
var discount = "s"
var productKey = "";
;function loadData(){
    var mytitle = document.getElementById("title");
    
    var myDes = document.getElementById("des");
    var myImage = document.getElementById("full-image");
    var myQuantity = document.getElementById("quantity");
    var mydiv = document.getElementById("all-images");
    

    var key = localStorage.getItem("search-key")

    var query = firebase.database().ref("CircuitSource/all_products/"+key);
  query.once("value", function (snapshot) {

    var title = snapshot.val().title;
    cTitle = title;
    des = snapshot.val().description;
    price = snapshot.val().price;
    discount = snapshot.val().discount;
    productKey = snapshot.val().key;
    url = snapshot.val().thumbnail_url;
    mQuantity = snapshot.val().minimum_quantity;
    $("#quantity").val(mQuantity);
    myQuantity.value = "1";
    if(mQuantity < 1){
        myQuantity.value = 1;
    }

    else if (mQuantity > 1){
        myQuantity.value = mQuantity;
    }


    mytitle.innerHTML = title;
    myDes.innerHTML = des;
    myImage.src = url;

    mydiv.innerHTML  += `<img onClick="setImage(\`` +
    url +
    `\`,)" style="cursor: pointer;" class="product-image-option-deactive" src="${url}" alt="">
              `

    $("#loader-product-main").css("display", "none")
    $("#main").css("display", "block")

  });
}

$("#search").click(function() {
  var text = $("#searchInput").val();

  if(text.trim() != ""){
    localStorage.setItem("recent-search",text);
    window.open("products.html");
  }
 
})

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
    var text = $("#searchInput").val();

    if(text.trim() != ""){
      localStorage.setItem("recent-search",text);
      window.open("products.html");
    } }
  
  
  getKeyWordsAndShowRelated();

  async function getKeyWordsAndShowRelated(title){


    var words = [];
    var mydiv = document.getElementById("points-div");
    var key = localStorage.getItem("search-key")
   //mydiv.classList.remove('grid-container');
   var query1 = firebase.database().ref("CircuitSource/all_products/"+key+"/keywords");
   await query1.once("value", function (snapshot) {
 
 
     snapshot.forEach(function (childSnapshot) {
 
         
      var title = childSnapshot.val().title;

      words.push(title);
 
     });
   });



   var mydiv = document.getElementById("items-div");
   mydiv.innerHTML= "";
   $("#loader-product").css("display","flex")
 mydiv.classList.remove('grid-container');
 var query = firebase.database().ref("CircuitSource/all_products");
 query.once("value", function (snapshot) {
   snapshot.forEach(function (childSnapshot) {
 
     var title = childSnapshot.val().title;
     var price = childSnapshot.val().price;
     var discount = childSnapshot.val().discount;
     var thumbnail = childSnapshot.val().thumbnail_url;
     var key = childSnapshot.val().key;

     var discPrice = price - discount;
 
     $("#loader-product").css("display","none")
     $("#items-div").css("display","flex")
     $("#loader-product-main").css("display","none")
     
    //  mydiv.classList.add('grid-container');


    words.forEach(word => {
      if (title.trim().toLowerCase().includes(word.trim().toLowerCase()) && title != cTitle ) {
         mydiv.innerHTML += 
       `<div style="cursor: pointer; width: 180px;" onClick="openProduct(\`` +
       key +
       `\` )" class="product-div-one-search fade-in" style="background-color: white; border-radius: 5px; border: 0.2px solid grey;">

    
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
      } 
  });
       

     


   });
 });

 
  }
  

  $("#add-to-cart").click(function() {
    var quantity = $("#quantity").val();
    var number = localStorage.getItem("number");
    var query = firebase.database().ref("CircuitSource/Users/"+number+"/my_cart/"+productKey);

    if(quantity < parseInt(mQuantity)){
      $("#note-quantity").css("display","block")
      $("#note-quantity").html("Add minimum quantity - "+mQuantity)

    }

    else{
      $("#note-quantity").css("display","none")
      $("#cart-text").css("display","none")
      $("#cart-i").css("display","none");
      $("#cart-loader").css("display","flex");
query.update({
      title: cTitle,
      description: des,
      key: productKey,
      quantity: quantity,
      price: price,
      discount: discount,
      thumbnail_url: url,
    },function (error){
      $("#cart-text").css("display","flex")
      $("#cart-i").css("display","flex");
      $("#cart-loader").css("display","none");
      myFunction("Added to cart");
    })
    }
    


   
  })

  function myFunction(text) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerHTML = text;
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
  