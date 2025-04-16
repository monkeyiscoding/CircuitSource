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

  if(isMobileScreen()){
      loadImagesMobile();
      loadDataMobile();
      loadPointsMobile();
     
  }

  if(!isMobileScreen()){
    loadImages();
    loadPoints();
    loadData();
  
  }

  checkLogin();
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
   var key = localStorage.getItem("search-key");
   var category = localStorage.getItem("search-category");
  //mydiv.classList.remove('grid-container');
  var catKey = "";
  if(category.toLowerCase().includes("tools")){
    catKey = "-N8lvCT5lnYJNUcWWlaB";
  }
  else{
    catKey = "-N6l8PzgYxniHSJZK5-0";
  }
  var query = firebase.database().ref("Ecommerce/Categories/"+catKey+"/products/"+key+"/Images");
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

function loadImagesMobile() {
  var mydiv = document.getElementById("all-images-m");
  var mytitle = document.getElementById("title-m");
 var key = localStorage.getItem("search-key")
//mydiv.classList.remove('grid-container');
var category = localStorage.getItem("search-category");
//mydiv.classList.remove('grid-container');
var catKey = "";
if(category.toLowerCase().includes("tools")){
  catKey = "-N8lvCT5lnYJNUcWWlaB";
}
else{
  catKey = "-N6l8PzgYxniHSJZK5-0";
}
var query = firebase.database().ref("Ecommerce/Categories/"+catKey+"/products/"+key+"/Images");
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
    var myImage2 = document.getElementById("full-image-m");
    myImage.src = url;
    myImage2.src = url;

}


function loadPoints() {
    var mydiv = document.getElementById("points-div");
   var key = localStorage.getItem("search-key")
   var key = localStorage.getItem("search-key")
  //mydiv.classList.remove('grid-container');
  var category = localStorage.getItem("search-category");
  //mydiv.classList.remove('grid-container');
  var catKey = "";
  if(category.toLowerCase().includes("tools")){
    catKey = "-N8lvCT5lnYJNUcWWlaB";
  }
  else{
    catKey = "-N6l8PzgYxniHSJZK5-0";
  }
  var query = firebase.database().ref("Ecommerce/Categories/"+catKey+"/products/"+key+"/details");
  query.once("value", function (snapshot) {


    snapshot.forEach(function (childSnapshot) {

        
     var title = childSnapshot.val().title;

     // mydiv.classList.add('grid-container');

     mydiv.innerHTML  += `  <h5 style="font-weight: normal; margin-top: 0px; margin-bottom: 10px;"> <i class="fa-solid fa-check-to-slot" style="margin-right: 5px;" ></i>${title}</h5>
                      
                       
                  `
    

    });
  });


  
}


function loadPointsMobile() {
  var mydiv = document.getElementById("points-div-m");
  var key = localStorage.getItem("search-key");
  var category = localStorage.getItem("search-category");

  var catKey = category.toLowerCase().includes("tools")
    ? "-N8lvCT5lnYJNUcWWlaB"
    : "-N6l8PzgYxniHSJZK5-0";

  var query = firebase.database().ref("Ecommerce/Categories/" + catKey + "/products/" + key + "/details");

  query.once("value", function (snapshot) {
    const details = [];
    
    snapshot.forEach(function (childSnapshot) {
      details.push(childSnapshot.val().title);
    });

    mydiv.innerHTML = ""; // Clear old content

    if (details.length === 1 && details[0].trim() === ".") {
      // Default points if only "." exists
      const defaultPoints = [
        "Verified Product",
        "Tested Quality",
        "Secure Packaging",
        "Same Day Dispatch",
        "7 Days Return Policy"
      ];

      defaultPoints.forEach(point => {
        mydiv.innerHTML += `
          <h5 style="font-weight: normal; margin-top: 0px; margin-bottom: 10px;">
            <i class="fa-solid fa-check-to-slot" style="margin-right: 5px;"></i>${point}
          </h5>
        `;
      });
    } else {
      // Show actual details
      details.forEach(title => {
        mydiv.innerHTML += `
          <h5 style="font-weight: normal; margin-top: 0px; margin-bottom: 10px;">
            <i class="fa-solid fa-check-to-slot" style="margin-right: 5px;"></i>${title}
          </h5>
        `;
      });
    }
  });
}

var cTitle = "";
var des = "";
var url = "";
var mQuantity = "";
var price= "";
var discount = "s"
var productKey = "";
function loadData(){
    var mytitle = document.getElementById("title");
    
    var myDes = document.getElementById("des");
    var myImage = document.getElementById("full-image");
    var myQuantity = document.getElementById("quantity");
    var mydiv = document.getElementById("all-images");
    

    var key = localStorage.getItem("search-key")

    var category = localStorage.getItem("search-category");
    //mydiv.classList.remove('grid-container');
    var catKey = "";
    if(category.toLowerCase().includes("tools")){
      catKey = "-N8lvCT5lnYJNUcWWlaB";
    }
    else{
      catKey = "-N6l8PzgYxniHSJZK5-0";
    }
    var query = firebase.database().ref("Ecommerce/Categories/"+catKey+"/products/"+key+"");
    console.log("Ecommerce/Categories/"+catKey+"/products/"+key+"");
  query.once("value", function (snapshot) {

    if (!snapshot.exists()) {
      console.error("Product not found!");
      return;
    }
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
    getKeyWordsAndShowRelated(title);
  });
}

function loadDataMobile(){
  var mytitle = document.getElementById("title-m");
  
  var myDes = document.getElementById("des-m");
  var myImage = document.getElementById("full-image-m");
  var myQuantity = document.getElementById("quantity-m");
  var mydiv = document.getElementById("all-images-m");
  

  var key = localStorage.getItem("search-key")

  var category = localStorage.getItem("search-category");
  //mydiv.classList.remove('grid-container');
  var catKey = "";
  if(category.toLowerCase().includes("tools")){
    catKey = "-N8lvCT5lnYJNUcWWlaB";
  }
  else{
    catKey = "-N6l8PzgYxniHSJZK5-0";
  }
  var query = firebase.database().ref("Ecommerce/Categories/"+catKey+"/products/"+key+"");
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

  $("#loader-m").css("display", "none")
  $("#main-m").css("display", "block")

  $(".main-div-m").css("display", "block")
  getKeyWordsAndShowRelatedMobile(title);

});
}

$("#search").click(function() {
  var text = $("#searchInput").val();

  if(text.trim() != ""){
    localStorage.setItem("recent-search",text);
    window.open("products.html");
  }
 
})

$("#search-m").click(function() {
  var text = $("#searchInput-m").val();

  if(text.trim() != ""){
    localStorage.setItem("recent-search",text);
    window.location.href = "products.html";
  }
 
})

  // Assuming you have an input with id="searchInput"
  const searchInput = document.getElementById('searchInput');
   // Assuming you have an input with id="searchInput"
   const searchInputm = document.getElementById('searchInput-m');


  /// Event listener for input field on pressing Enter
  searchInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
          handleSearch();
      }
  });

   /// Event listener for input field on pressing Enter
   searchInputm.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        handleSearchMobile();
    }
});
  
  // Function to handle search submission
  function handleSearch() {
    var text = $("#searchInput").val();

    if(text.trim() != ""){
      localStorage.setItem("recent-search",text);
      window.location.href = "products.html";
    } }
  
  
  // Function to handle search submission
  function handleSearchMobile() {
    var text = $("#searchInput-m").val();

    if(text.trim() != ""){
      localStorage.setItem("recent-search",text);
      window.location.href = "products.html";
    } }
  
  


// Common related products logic (desktop)
async function getKeyWordsAndShowRelated(cTitle) {
  let mydiv = document.getElementById("items-div");
  const key = localStorage.getItem("search-key");
  const category = localStorage.getItem("search-category");

  const catKey = category.toLowerCase().includes("tools")
    ? "-N8lvCT5lnYJNUcWWlaB"
    : "-N6l8PzgYxniHSJZK5-0";

  const words = cTitle
    .split(" ")
    .map(w => w.trim().toLowerCase())
    .filter(w => w.length > 2);

  mydiv.innerHTML = "";
  $("#loader-product").css("display", "flex");
  mydiv.classList.remove("grid-container");

  const query = firebase.database().ref("Ecommerce/Categories/" + catKey + "/products");

  query.once("value", function (snapshot) {
    $("#loader-product").css("display", "none");
    $("#items-div").css("display", "flex");
    $("#loader-product-main").css("display", "none");

    snapshot.forEach(function (childSnapshot) {
      const product = childSnapshot.val();
      if (product.title === cTitle) return;

      const titleLower = product.title.toLowerCase();
      const matched = words.some(word => titleLower.includes(word));
      if (!matched) return;

      const discPrice = product.price - product.discount;

      const productHTML = `
        <div style="cursor: pointer; width: 180px;" onClick="openProduct('${product.key}')" class="product-div-one-search fade-in">
          <div style="margin-right: auto; background-color: white; box-shadow: 0px 0px 5px rgb(213, 213, 213); border-radius: 100px; border: 0.5px solid orangered; width: 30px; height: 30px; align-items: center; text-align: center; justify-content: center; color: #000; margin-left: 10px;">
            <i class="fa-regular fa-heart" style="margin-top:7px;"></i>
          </div>
          <img style="border-radius: 10px;" src="${product.thumbnail_url}" height="130px" width="130px" alt="">
          <h6 style="height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal; text-align: center; margin-bottom: 0px; overflow: hidden; text-overflow: ellipsis; max-lines: 3; white-space: normal;">${product.title}</h6>
          <div style="display: flex; align-items: center; text-align: center; width: 100%; justify-content: center;">
            <h5 style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 15px; margin-right: 0px; font-weight: bold;">₹${discPrice}</h5>
            <h5 class="original-price" style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: normal;">₹${product.price}</h5>
          </div>
          <button class="add-to-cart-btn" 
                  data-key="${product.key}" 
                  data-title="${product.title}" 
                  data-price="${product.price}" 
                  data-discount="${product.discount}" 
                  data-thumbnail="${product.thumbnail_url}" 
                  data-category="${catKey}"
                  style="border-radius:5px; display: flex; height: 30px; margin-left: auto; margin-right: auto; background-color: orangered; color: white;">
            <h6 id="cart-text" style="display: flex; margin-right: 5px;">Add To Cart</h6>
            <div style="margin-left: 10px; margin-right: 10px; display: none;" id="cart-loader" class="loader-dots"></div>
          </button>
        </div>
      `;
      mydiv.innerHTML += productHTML;
    });

    attachCartListeners(".add-to-cart-btn");
  });
}

// Mobile version
async function getKeyWordsAndShowRelatedMobile(cTitle) {
  const mydiv = document.getElementById("items-div-m");
  const key = localStorage.getItem("search-key");
  const category = localStorage.getItem("search-category");

  let catKey = category.toLowerCase().includes("tools")
    ? "-N8lvCT5lnYJNUcWWlaB"
    : "-N6l8PzgYxniHSJZK5-0";

  const words = cTitle.split(" ")
    .map(w => w.trim().toLowerCase())
    .filter(w => w.length > 2);

  mydiv.innerHTML = "";
  $("#loader-product-m").css("display", "flex");
  $("#items-div-m").css("display", "none");

  const query = firebase.database().ref("Ecommerce/Categories/" + catKey + "/products");

  query.once("value", function (snapshot) {
    $("#loader-product-m").css("display", "none");
    $("#items-div-m").css("display", "flex");

    let hasResults = false;
    let displayedCount = 0;
    const maxItems = 30;

    snapshot.forEach(function (childSnapshot) {
      if (displayedCount >= maxItems) return;

      const product = childSnapshot.val();
      if (!product.title || product.title === cTitle) return;

      const titleLower = product.title.toLowerCase();
      const matched = words.some(word => titleLower.includes(word));
      if (!matched) return;

      const discPrice = product.price - product.discount;
      hasResults = true;
      displayedCount++;

      mydiv.innerHTML += `
        <div style="cursor: pointer; width: 180px; margin-right: 10px;" onClick="openProduct('${product.key}')" class="product-div-one-search fade-in">
          <div style="margin-right: auto; background-color: white; box-shadow: 0px 0px 5px rgb(213, 213, 213); border-radius: 100px; border: 0.5px solid orangered; width: 30px; height: 30px; align-items: center; text-align: center; justify-content: center; color: #000; margin-left: 10px;">
            <i class="fa-regular fa-heart" style="margin-top:7px;"></i>
          </div>
          <img style="border-radius: 10px;" src="${product.thumbnail_url}" height="130px" width="130px" alt="">
          <h6 style="height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal; text-align: center; margin-bottom: 0px; overflow: hidden; text-overflow: ellipsis; max-lines: 3; white-space: normal;">${product.title}</h6>
          <div style="display: flex; align-items: center; text-align: center; width: 100%; justify-content: center;">
            <h5 style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 15px; font-weight: bold;">₹${discPrice}</h5>
            <h5 class="original-price" style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: normal;">₹${product.price}</h5>
          </div>
          <button class="add-to-cart-btn-m" 
                  data-key="${product.key}" 
                  data-title="${product.title}" 
                  data-price="${product.price}" 
                  data-discount="${product.discount}" 
                  data-thumbnail="${product.thumbnail_url}" 
                  data-category="${catKey}" 
                  style="border-radius:5px; display: flex; height: 30px; margin: 10px auto 0; background-color: orangered; color: white; align-items: center; justify-content: center;">
            <h6 style="margin-right: 5px;">Add To Cart</h6>
            <div class="loader-dots" style="margin-left: 10px; margin-right: 10px; display: none;"></div>
          </button>
        </div>
      `;
    });

    if (!hasResults) {
      mydiv.innerHTML = `<p style="padding: 10px;">No related products found.</p>`;
    }

    attachCartListeners(".add-to-cart-btn-m");
  });
}

function attachCartListeners(selector) {
  document.querySelectorAll(selector).forEach(button => {
    button.addEventListener('click', function (event) {
      event.stopPropagation();
      const lc = localStorage.getItem("userislogin");
      if (lc !== "true") {
        window.location.href = "login.html";
        return;
      }

      const productKey = this.getAttribute("data-key");
      const cTitle = this.getAttribute("data-title");
      const price = this.getAttribute("data-price");
      const discount = this.getAttribute("data-discount");
      const thumbnail_url = this.getAttribute("data-thumbnail");
      const categoryKey = this.getAttribute("data-category");
      const number = localStorage.getItem("number");
      const quantity = 1;

      const cartRef = firebase.database().ref("CircuitSource/Users/" + number + "/my_cart/" + productKey);

      // Check stock before adding
      firebase.database().ref(`Ecommerce/Categories/${categoryKey}/products/${productKey}/stock`).once("value", stockSnap => {
        const stock = parseInt(stockSnap.val() || "0");
        if (stock <= 0) {
          myFunction("Out of stock");
          return;
        }

        cartRef.once("value", snapshot => {
          if (snapshot.exists()) {
            myFunction("Already in cart");
          } else {
            $(this).find("#cart-text").hide();
            $(this).find(".loader-dots").show();

            cartRef.set({
              title: cTitle,
              description: '',
              key: productKey,
              quantity: Math.min(quantity, stock),
              price: price,
              discount: discount,
              thumbnail_url: thumbnail_url,
            }, (error) => {
              $(this).find("#cart-text").show();
              $(this).find(".loader-dots").hide();
              if (error) {
                console.error("Error adding to cart:", error);
                myFunction("Error adding to cart");
              } else {
                myFunction("Added to cart");
              }
            });
          }
        });
      });
    });
  });
}

  $("#add-to-cart").click(function() {
    var lc = localStorage.getItem("userislogin");

    if(lc == "true"){
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
    
    }

    else{
      window.location.href = "login.html";
    }
   


   
  })

  $("#add-to-cart-m").click(function() {
    var lc = localStorage.getItem("userislogin");

    if(lc == "true"){
 var quantity = $("#quantity-m").val();
    var number = localStorage.getItem("number");
    var query = firebase.database().ref("CircuitSource/Users/"+number+"/my_cart/"+productKey);

    if(quantity < parseInt(mQuantity)){
      $("#note-quantity-m").css("display","block")
      $("#note-quantity-m").html("Add minimum quantity - "+mQuantity)

    }

    else{
      $("#note-quantity-m").css("display","none")
      $("#cart-text-m").css("display","none")
      $("#cart-i-m").css("display","none");
      $("#cart-loader-m").css("display","flex");
query.update({
      title: cTitle,
      description: des,
      key: productKey,
      quantity: quantity,
      price: price,
      discount: discount,
      thumbnail_url: url,
    },function (error){
      $("#cart-text-m").css("display","flex")
      $("#cart-i-m").css("display","flex");
      $("#cart-loader-m").css("display","none");
      myFunction("Added to cart");
    })
    }
    
    }

    else{
      window.location.href = "login.html";
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
  

   // Check if the screen width is less than a certain threshold (e.g., 768px for tablets)
 function isMobileScreen() {
  return window.innerWidth < 908;
}