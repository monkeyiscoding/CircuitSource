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




  checkSearch();
  



  if(isMobileScreen){
    loadProductMobile();
    loadSuggestionsMobile();
  }

  if(!isMobileScreen){
    checkLogin();
    loardCartCount();
  
    loadMostSearchd();
    loadCategory();
    loadSuggestions();
  }

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

  

    // Assuming you have an input with id="searchInput"
const searchInput = document.getElementById('searchInput');

var previousSearch = "";

  
 

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

 

  var a = 0;



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
  mydiv.innerHTML = "";
  $("#loader-product").css("display", "flex");
  mydiv.classList.remove('grid-container');
  var query = firebase.database().ref("CircuitSource/all_products");
  
  query.once("value", function(snapshot) {
      if (!snapshot.exists()) {
          $("#loader-product").css("display", "none");
          $("#all-data-div-product").css("display", "none");
          $("#loader-product-main").css("display", "none");
          mydiv.innerHTML = "<p>No products found</p>";
          return;
      }

      snapshot.forEach(function(childSnapshot) {
          var product = childSnapshot.val();
          var title = product.title;
          var price = product.price;
          var discount = product.discount;
          var thumbnail = product.thumbnail_url;
          var key = product.key;

          var discPrice = price - discount;

          $("#loader-product-main").css("display", "none");
          $("#loader-product").css("display", "none");
          $("#loader-m").css("display", "none");
          $(".main-div-m").css("display", "block");
          $("#all-data-div-product").css("display", "flex");
          $("#all-data-div-product-m").css("display", "block");

          mydiv.classList.add('grid-container');

          var productHTML = `
              <div style="cursor: pointer;" onClick="openProduct('${key}')" class="product-div-one-search fade-in" style="background-color: white; border-radius: 5px; border: 0.2px solid grey;">
                  <div style="margin-right: auto; background-color: white; box-shadow: 0px 0px 5px rgb(213, 213, 213); border-radius: 100px; border: 0.5px solid orangered; width: 30px; height: 30px; align-items: center; text-align: center; justify-content: center; color: #000; margin-left: 10px;">
                      <i class="fa-regular fa-heart" style="margin-top:7px;"></i>
                  </div>
                  <img style="border-radius: 10px;" src="${thumbnail}" height="130px" width="130px" alt="">
                  <h6 style="height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal; text-align: center; margin-bottom: 0px; overflow: hidden; text-overflow: ellipsis; max-lines: 3; white-space: normal;">${title}</h6>
                  <div style="display: flex; align-items: center; text-align: center; width: 100%; justify-content: center;">
                      <h5 style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 15px; margin-right: 0px; font-weight: bold; text-align: center;">₹${discPrice}</h5>
                      <h5 class="original-price" style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: normal; text-align: center;">₹${price}</h5>
                  </div>
                  <button class="add-to-cart-btn" data-key="${key}" data-title="${title}" data-price="${price}" data-discount="${discount}" data-thumbnail="${thumbnail}" style="border-radius:5px; display: flex; height: 30px; margin-left: auto; margin-right: auto; background-color: orangered; color: white;">
                      <h6 id="cart-text" style="display: flex; margin-right: 5px;">Add To Cart</h6>
                      <div style="margin-left: 10px; margin-right: 10px; display: none;" id="cart-loader" class="loader-dots"></div>
                  </button>
              </div>
          `;

          mydiv.innerHTML += productHTML;
      });

      // Attach event listeners to "Add to Cart" buttons
      document.querySelectorAll('.add-to-cart-btn').forEach(button => {
          button.addEventListener('click', function(event) {
              event.stopPropagation(); // Prevent the click from triggering the product open

                // Check if user is logged in
                var lc = localStorage.getItem("userislogin");
                if (lc !== "true") {
                    window.location.href = "login.html"; // Redirect to login page
                    return;
                }
  
                else{
                  
                var productKey = this.getAttribute('data-key');
                var cTitle = this.getAttribute('data-title');
                var price = this.getAttribute('data-price');
                var discount = this.getAttribute('data-discount');
                var thumbnail_url = this.getAttribute('data-thumbnail');
                var quantity = 1; // Assuming default quantity is 1
                var number = localStorage.getItem("number");
  
                var query = firebase.database().ref("CircuitSource/Users/" + number + "/my_cart/" + productKey);
  
                // Check if product is already in cart
                query.once("value", snapshot => {
                    if (snapshot.exists()) {
                        myFunction("Already in cart");
                    } else {
                        $("#cart-text", this).css("display", "none");
                        $("#cart-i", this).css("display", "none");
                        $("#cart-loader", this).css("display", "flex");
  
                        query.update({
                            title: cTitle,
                            description: '',
                            key: productKey,
                            quantity: quantity,
                            price: price,
                            discount: discount,
                            thumbnail_url: thumbnail_url,
                        }, function(error) {
                            $("#cart-text", this).css("display", "flex");
                            $("#cart-i", this).css("display", "flex");
                            $("#cart-loader", this).css("display", "none");
  
                            if (error) {
                                console.error('Error adding to cart: ', error);
                                myFunction("Error adding to cart");
                            } else {
                                myFunction("Added to cart");
                            }
                        }.bind(this));
                    }
                });
                }
          });
      });

  }).catch(function(error) {
      console.error('Error fetching products: ', error);
      $("#loader-product").css("display", "none");
      $("#all-data-div-product").css("display", "none");
      $("#loader-product-main").css("display", "none");
      mydiv.innerHTML = "<p>Error loading products. Please try again later.</p>";
  });
}



function loadProductMobile() {
    var mydiv = document.getElementById("items-div-m");
    mydiv.innerHTML = "";
    $("#loader-product").css("display", "flex");
    mydiv.classList.remove('grid-container');
    var query = firebase.database().ref("CircuitSource/all_products");
    
    query.once("value", function(snapshot) {
        if (!snapshot.exists()) {
            $("#loader-product-m").css("display", "none");
            $("#all-data-div-product-m").css("display", "none");
            $("#loader-product-m").css("display", "none");
            mydiv.innerHTML = "<p>No products found</p>";
            return;
        }
  
        snapshot.forEach(function(childSnapshot) {
            var product = childSnapshot.val();
            var title = product.title;
            var price = product.price;
            var discount = product.discount;
            var thumbnail = product.thumbnail_url;
            var key = product.key;
  
            var discPrice = price - discount;
  
            $("#loader-product-m").css("display", "none");
            $("#loader-productm").css("display", "none");
            $("#loader-m").css("display", "none");
            $(".main-div-m").css("display", "block");
            $("#all-data-div-product-m").css("display", "flex");
            $("#all-data-div-product-m").css("display", "block");
  
            mydiv.classList.add('grid-container');
  
            var productHTML = `
                <div style="cursor: pointer;" onClick="openProduct('${key}')" class="product-div-one-search fade-in" style="background-color: white; border-radius: 5px; border: 0.2px solid grey;">
                    <div style="margin-right: auto; background-color: white; box-shadow: 0px 0px 5px rgb(213, 213, 213); border-radius: 100px; border: 0.5px solid orangered; width: 30px; height: 30px; align-items: center; text-align: center; justify-content: center; color: #000; margin-left: 10px;">
                        <i class="fa-regular fa-heart" style="margin-top:7px;"></i>
                    </div>
                    <img style="border-radius: 10px;" src="${thumbnail}" height="130px" width="130px" alt="">
                    <h6 style="height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal; text-align: center; margin-bottom: 0px; overflow: hidden; text-overflow: ellipsis; max-lines: 3; white-space: normal;">${title}</h6>
                    <div style="display: flex; align-items: center; text-align: center; width: 100%; justify-content: center;">
                        <h5 style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 15px; margin-right: 0px; font-weight: bold; text-align: center;">₹${discPrice}</h5>
                        <h5 class="original-price" style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: normal; text-align: center;">₹${price}</h5>
                    </div>
                    <button class="add-to-cart-btn" data-key="${key}" data-title="${title}" data-price="${price}" data-discount="${discount}" data-thumbnail="${thumbnail}" style="border-radius:5px; display: flex; height: 30px; margin-left: auto; margin-right: auto; background-color: orangered; color: white;">
                        <h6 id="cart-text" style="display: flex; margin-right: 5px;">Add To Cart</h6>
                        <div style="margin-left: 10px; margin-right: 10px; display: none;" id="cart-loader" class="loader-dots"></div>
                    </button>
                </div>
            `;
  
            mydiv.innerHTML += productHTML;
        });
  
        // Attach event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent the click from triggering the product open
  
                  // Check if user is logged in
                  var lc = localStorage.getItem("userislogin");
                  if (lc !== "true") {
                      window.location.href = "login.html"; // Redirect to login page
                      return;
                  }
    
                  else{
                    
                  var productKey = this.getAttribute('data-key');
                  var cTitle = this.getAttribute('data-title');
                  var price = this.getAttribute('data-price');
                  var discount = this.getAttribute('data-discount');
                  var thumbnail_url = this.getAttribute('data-thumbnail');
                  var quantity = 1; // Assuming default quantity is 1
                  var number = localStorage.getItem("number");
    
                  var query = firebase.database().ref("CircuitSource/Users/" + number + "/my_cart/" + productKey);
    
                  // Check if product is already in cart
                  query.once("value", snapshot => {
                      if (snapshot.exists()) {
                          myFunction("Already in cart");
                      } else {
                          $("#cart-text", this).css("display", "none");
                          $("#cart-i", this).css("display", "none");
                          $("#cart-loader", this).css("display", "flex");
    
                          query.update({
                              title: cTitle,
                              description: '',
                              key: productKey,
                              quantity: quantity,
                              price: price,
                              discount: discount,
                              thumbnail_url: thumbnail_url,
                          }, function(error) {
                              $("#cart-text", this).css("display", "flex");
                              $("#cart-i", this).css("display", "flex");
                              $("#cart-loader", this).css("display", "none");
    
                              if (error) {
                                  console.error('Error adding to cart: ', error);
                                  myFunction("Error adding to cart");
                              } else {
                                  myFunction("Added to cart");
                              }
                          }.bind(this));
                      }
                  });
                  }
            });
        });
    }).catch(function(error) {
        console.error('Error fetching products: ', error);
        $("#loader-product").css("display", "none");
        $("#all-data-div-product").css("display", "none");
        $("#loader-product-main").css("display", "none");
        mydiv.innerHTML = "<p>Error loading products. Please try again later.</p>";
    });
  }


function loadSearchProduct(value) {
  var query = firebase.database().ref("CircuitSource/all_products");
  var mydiv = document.getElementById("items-div");

  mydiv.innerHTML = "";

  $("#loader-product").css("display", "flex");
  mydiv.classList.remove('grid-container');

  query.once("value", function(snapshot) {
      if (!snapshot.exists()) {
          $("#loader-product").css("display", "none");
          $("#all-data-div-product").css("display", "none");
          $("#loader-product-main").css("display", "none");
          mydiv.innerHTML = "<p>No products found</p>";
          return;
      }

      snapshot.forEach(function(childSnapshot) {
          var product = childSnapshot.val();
          var title = product.title;
          var price = product.price;
          var discount = product.discount;
          var thumbnail = product.thumbnail_url;
          var key = product.key;

          var discPrice = price - discount;

          $("#loader-product-main").css("display", "none");
          $("#loader-product").css("display", "none");
          $("#all-data-div-product").css("display", "flex");

          if (previousSearch != "") {
              searchInput.value = previousSearch;
          }

          mydiv.classList.add('grid-container');

          if (title.trim().toLowerCase().includes(value.trim().toLowerCase())) {
              var productHTML = `
                  <div style="cursor: pointer;" onClick="openProduct('${key}')" class="product-div-one-search fade-in" style="background-color: white; border-radius: 5px; border: 0.2px solid grey;">
                      <div style="margin-right: auto; background-color: white; box-shadow: 0px 0px 5px rgb(213, 213, 213); border-radius: 100px; border: 0.5px solid orangered; width: 30px; height: 30px; align-items: center; text-align: center; justify-content: center; color: #000; margin-left: 10px;">
                          <i class="fa-regular fa-heart" style="margin-top:7px;"></i>
                      </div>
                      <img style="border-radius: 10px;" src="${thumbnail}" height="130px" width="130px" alt="">
                      <h6 style="height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal; text-align: center; margin-bottom: 0px; overflow: hidden; text-overflow: ellipsis; max-lines: 3; white-space: normal;">${title}</h6>
                      <div style="display: flex; align-items: center; text-align: center; width: 100%; justify-content: center;">
                          <h5 style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 15px; margin-right: 0px; font-weight: bold; text-align: center;">₹${discPrice}</h5>
                          <h5 class="original-price" style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: normal; text-align: center;">₹${price}</h5>
                      </div>
                      <button class="add-to-cart-btn" data-key="${key}" data-title="${title}" data-price="${price}" data-discount="${discount}" data-thumbnail="${thumbnail}" style="border-radius:5px; display: flex; height: 30px; margin-left: auto; margin-right: auto; background-color: orangered; color: white;">
                          <h6 id="cart-text" style="display: flex; margin-right: 5px;">Add To Cart</h6>
                          
                          <div style="margin-left: 10px; margin-right: 10px; display: none;" id="cart-loader" class="loader-dots"></div>
                      </button>
                  </div>
              `;

              mydiv.innerHTML += productHTML;

              $("#not-found").css("display", "none");
          } else {
              if (mydiv.innerHTML == "") {
                  $("#not-found").css("display", "block");
              }
          }
      });

      // Attach event listeners to "Add to Cart" buttons
      document.querySelectorAll('.add-to-cart-btn').forEach(button => {
          button.addEventListener('click', function(event) {
              event.stopPropagation(); // Prevent the click from triggering the product open

              // Check if user is logged in
              var lc = localStorage.getItem("userislogin");
              if (lc !== "true") {
                  window.location.href = "login.html"; // Redirect to login page
                  return;
              }

              else{
                
              var productKey = this.getAttribute('data-key');
              var cTitle = this.getAttribute('data-title');
              var price = this.getAttribute('data-price');
              var discount = this.getAttribute('data-discount');
              var thumbnail_url = this.getAttribute('data-thumbnail');
              var quantity = 1; // Assuming default quantity is 1
              var number = localStorage.getItem("number");

              var query = firebase.database().ref("CircuitSource/Users/" + number + "/my_cart/" + productKey);

              // Check if product is already in cart
              query.once("value", snapshot => {
                  if (snapshot.exists()) {
                      myFunction("Already in cart");
                  } else {
                      $("#cart-text", this).css("display", "none");
                      $("#cart-i", this).css("display", "none");
                      $("#cart-loader", this).css("display", "flex");

                      query.update({
                          title: cTitle,
                          description: '',
                          key: productKey,
                          quantity: quantity,
                          price: price,
                          discount: discount,
                          thumbnail_url: thumbnail_url,
                      }, function(error) {
                          $("#cart-text", this).css("display", "flex");
                          $("#cart-i", this).css("display", "flex");
                          $("#cart-loader", this).css("display", "none");

                          if (error) {
                              console.error('Error adding to cart: ', error);
                              myFunction("Error adding to cart");
                          } else {
                              myFunction("Added to cart");
                          }
                      }.bind(this));
                  }
              });
              }

          });
      });
  }).catch(function(error) {
      console.error('Error fetching products: ', error);
      $("#loader-product").css("display", "none");
      $("#all-data-div-product").css("display", "none");
      $("#loader-product-main").css("display", "none");
      mydiv.innerHTML = "<p>Error loading products. Please try again later.</p>";
  });
}



function loadSearchProductMobile(value) {
    var query = firebase.database().ref("CircuitSource/all_products");
    var mydiv = document.getElementById("items-div-m");
  
    mydiv.innerHTML = "";
  
    $("#loader-product-m").css("display", "flex");
    mydiv.classList.remove('grid-container');
  
    query.once("value", function(snapshot) {
        if (!snapshot.exists()) {
            $("#loader-product-m").css("display", "none");
            $("#all-data-div-product-m").css("display", "none");
            $("#loader-product-main-m").css("display", "none");
            mydiv.innerHTML = "<p>No products found</p>";
            return;
        }
  
        snapshot.forEach(function(childSnapshot) {
            var product = childSnapshot.val();
            var title = product.title;
            var price = product.price;
            var discount = product.discount;
            var thumbnail = product.thumbnail_url;
            var key = product.key;
  
            var discPrice = price - discount;
  
            $("#loader-product-main-m").css("display", "none");
            $("#loader-product-m").css("display", "none");
            $("#all-data-div-product-m").css("display", "flex");
  
            if (previousSearch != "") {
                searchInput.value = previousSearch;
            }
  
            mydiv.classList.add('grid-container');
  
            if (title.trim().toLowerCase().includes(value.trim().toLowerCase())) {
                var productHTML = `
                    <div style="cursor: pointer;" onClick="openProduct('${key}')" class="product-div-one-search fade-in" style="background-color: white; border-radius: 5px; border: 0.2px solid grey;">
                        <div style="margin-right: auto; background-color: white; box-shadow: 0px 0px 5px rgb(213, 213, 213); border-radius: 100px; border: 0.5px solid orangered; width: 30px; height: 30px; align-items: center; text-align: center; justify-content: center; color: #000; margin-left: 10px;">
                            <i class="fa-regular fa-heart" style="margin-top:7px;"></i>
                        </div>
                        <img style="border-radius: 10px;" src="${thumbnail}" height="130px" width="130px" alt="">
                        <h6 style="height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal; text-align: center; margin-bottom: 0px; overflow: hidden; text-overflow: ellipsis; max-lines: 3; white-space: normal;">${title}</h6>
                        <div style="display: flex; align-items: center; text-align: center; width: 100%; justify-content: center;">
                            <h5 style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 15px; margin-right: 0px; font-weight: bold; text-align: center;">₹${discPrice}</h5>
                            <h5 class="original-price" style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: normal; text-align: center;">₹${price}</h5>
                        </div>
                        <button class="add-to-cart-btn" data-key="${key}" data-title="${title}" data-price="${price}" data-discount="${discount}" data-thumbnail="${thumbnail}" style="border-radius:5px; display: flex; height: 30px; margin-left: auto; margin-right: auto; background-color: orangered; color: white;">
                            <h6 id="cart-text" style="display: flex; margin-right: 5px;">Add To Cart</h6>
                            
                            <div style="margin-left: 10px; margin-right: 10px; display: none;" id="cart-loader" class="loader-dots"></div>
                        </button>
                    </div>
                `;
  
                mydiv.innerHTML += productHTML;
  
                $("#not-found-m").css("display", "none");
            } else {
                if (mydiv.innerHTML == "") {
                    $("#not-found-m").css("display", "block");
                }
            }
        });
  
        // Attach event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent the click from triggering the product open
  
                // Check if user is logged in
                var lc = localStorage.getItem("userislogin");
                if (lc !== "true") {
                    window.location.href = "login.html"; // Redirect to login page
                    return;
                }
  
                else{
                  
                var productKey = this.getAttribute('data-key');
                var cTitle = this.getAttribute('data-title');
                var price = this.getAttribute('data-price');
                var discount = this.getAttribute('data-discount');
                var thumbnail_url = this.getAttribute('data-thumbnail');
                var quantity = 1; // Assuming default quantity is 1
                var number = localStorage.getItem("number");
  
                var query = firebase.database().ref("CircuitSource/Users/" + number + "/my_cart/" + productKey);
  
                // Check if product is already in cart
                query.once("value", snapshot => {
                    if (snapshot.exists()) {
                        myFunction("Already in cart");
                    } else {
                        $("#cart-text", this).css("display", "none");
                        $("#cart-i", this).css("display", "none");
                        $("#cart-loader", this).css("display", "flex");
  
                        query.update({
                            title: cTitle,
                            description: '',
                            key: productKey,
                            quantity: quantity,
                            price: price,
                            discount: discount,
                            thumbnail_url: thumbnail_url,
                        }, function(error) {
                            $("#cart-text", this).css("display", "flex");
                            $("#cart-i", this).css("display", "flex");
                            $("#cart-loader", this).css("display", "none");
  
                            if (error) {
                                console.error('Error adding to cart: ', error);
                                myFunction("Error adding to cart");
                            } else {
                                myFunction("Added to cart");
                            }
                        }.bind(this));
                    }
                });
                }
  
            });
        });
    }).catch(function(error) {
        console.error('Error fetching products: ', error);
        $("#loader-product").css("display", "none");
        $("#all-data-div-product").css("display", "none");
        $("#loader-product-main").css("display", "none");
        mydiv.innerHTML = "<p>Error loading products. Please try again later.</p>";
    });
  }
  
  


function openProduct(key){
  localStorage.setItem("search-key", key);
  window.location.href = "productoverview.html";
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
          <div style="cursor: pointer;" onClick="searchText(\`` +
        title +
        `\`,)" class="suggestion-text">
              <h5 class="" style="margin: 0px; font-weight: normal; ">${searchedCount}. ${title}</h5>
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
      var key = childSnapshot.val().key;

      cCount++;
      
       mydiv.innerHTML += 
       `
              <div onClick="searchText(\`` +
        key +
        `\`,)" style="border: 0.3px solid rgb(186, 186, 186); margin-right: 20px; border-radius: 5px; padding: 10px; margin-bottom: 12px; cursor: pointer;">
          <h5 style="margin-left: 10px; font-weight: bold; margin: 0px;">${cCount}. ${title}</h5>

          <h6 style="margin-left: 0px; font-weight: normal; margin: 0px; margin-left: 15px; margin-top: 3px;color: gray;">${des}</h6>
      
      </div>

       `;

    });
  });
}



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



  function loadSuggestionsMobile() {
    var query = firebase.database().ref("CircuitSource/top_suggestions");
    query.once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var mydiv = document.getElementById("top-suggestion-div-m");
        var title = childSnapshot.val().title;
        var key = childSnapshot.val().key;
  
        cCount++;
        
         mydiv.innerHTML += 
         `
              <a onClick="searchSuggestionMobile(\`` +
        key +
        `\`,)" style="text-decoration: none; color: black; margin-right: 10px;" ><h5 style="" class="not-active-suggestion">${title}</h5>

              </a>

                
  
         `;

        
  
      });
    });
  }


  function searchSuggestion(value){
  
  var myInput = document.getElementById("searchInput");
  
  

  if(value.trim().toLowerCase() == "all"){
   loadProduct();
  }

  else{
    loadSearchProduct(value);

  }
  

  }

  function searchSuggestionMobile(value){
  
    var myInput = document.getElementById("searchInput-m");
    
    
  
    if(value.trim().toLowerCase() == "all"){
     loadProductMobile();
    }
  
    else{
      loadSearchProductMobile(value);
  
    }
    
  
    }


  function searchText(value){
  
    var myInput = document.getElementById("searchInput");
    
    myInput.value = value
  
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
   


 $("#search").click(function() {
  var text = $("#searchInput").val();

  loadSearchProduct(text);
})

$("#search-m").click(function() {
    var text = $("#searchInput-m").val();
  
    loadSearchProductMobile(text);
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


function checkSearch(){
  var st = localStorage.getItem("recent-search");
  if(st.toString().trim() != ""){
    previousSearch = st;
    loadSearchProduct(st);
    localStorage.setItem("recent-search","");
    
  }

  else{
    loadProduct();
  }
}

  // Check if the screen width is less than a certain threshold (e.g., 768px for tablets)
  function isMobileScreen() {
    return window.innerWidth < 908;
  }