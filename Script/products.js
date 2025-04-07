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


  let productOffset = 0;
let allMobileProducts = [];

  if(isMobileScreen()){
    loadSuggestionsMobile();

  }

  if(!isMobileScreen()){
    loadMostSearchd();
    loadCategory();
    loadSuggestions();
    
  }


  checkSearch();
  checkLogin();
  loardCartCount();

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
  

    // Assuming you have an input with id="searchInput"
const searchInput = document.getElementById('searchInput');

var previousSearch = "";

  
 

function checkLogin(){
    var lc = localStorage.getItem("userislogin");
   //var lc = "true";
   
  
    if(lc == "true"){
        $("#cart-icon").css("margin-right"," 50px");
      $("#login-pending").css("display","none");
     
      
      checkDevice(deviceId);
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
    const mydiv = document.getElementById("items-div");
    mydiv.innerHTML = "";
    $("#loader-product").css("display", "flex");
    mydiv.classList.remove("grid-container");
  
    const allProducts = [];
  
    const paths = [
      "Ecommerce/Categories/-N6l8PzgYxniHSJZK5-0/products", // Components
      "Ecommerce/Categories/-N8lvCT5lnYJNUcWWlaB/products"  // Tools
    ];
  
    const promises = paths.map(path => firebase.database().ref(path).once("value"));
  
    Promise.all(promises)
      .then(snapshots => {
        snapshots.forEach(snapshot => {
          snapshot.forEach(childSnapshot => {
            allProducts.push(childSnapshot.val());
          });
        });
  
        if (allProducts.length === 0) {
          $("#loader-product").css("display", "none");
          $("#all-data-div-product").css("display", "none");
          $("#loader-product-main").css("display", "none");
          mydiv.innerHTML = "<p>No products found</p>";
          return;
        }
  
        $("#loader-product-main").css("display", "none");
        $("#loader-product").css("display", "none");
        $("#loader-m").css("display", "none");
        $(".main-div-m").css("display", "block");
        $("#all-data-div-product").css("display", "flex");
        $("#all-data-div-product-m").css("display", "block");
        mydiv.classList.add("grid-container");
  
// After merging all products
allProducts
  .slice(0, 100) // 👈 LIMIT to first 100 products
  .forEach(product => {
    const title = product.title;
    const price = product.price;
    const discount = product.discount;
    const thumbnail = product.thumbnail_url;
    const key = product.key;
    const category = product.category;
    const discPrice = price - discount;

    const productHTML = `
      <div style="cursor: pointer;" onClick="openProduct('${key}','${category}')" class="product-div-one-search fade-in">
          <div style="margin-right: auto; background-color: white; box-shadow: 0px 0px 5px rgb(213, 213, 213); border-radius: 100px; border: 0.5px solid orangered; width: 30px; height: 30px; align-items: center; text-align: center; justify-content: center; color: #000; margin-left: 10px;">
              <i class="fa-regular fa-heart" style="margin-top:7px;"></i>
          </div>
          <img style="border-radius: 10px;" src="${thumbnail}" height="130px" width="130px" alt="">
          <h6 style="height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal; text-align: center; margin-bottom: 0px; overflow: hidden; text-overflow: ellipsis; max-lines: 3; white-space: normal;">${title}</h6>
          <div style="display: flex; align-items: center; text-align: center; width: 100%; justify-content: center;">
              <h5 style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 15px; margin-right: 0px; font-weight: bold;">₹${discPrice}</h5>
              <h5 class="original-price" style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: normal;">₹${price}</h5>
          </div>
          <button class="add-to-cart-btn" data-key="${key}" data-title="${title}" data-price="${price}" data-discount="${discount}" data-thumbnail="${thumbnail}" style="border-radius:5px; display: flex; height: 30px; margin-left: auto; margin-right: auto; background-color: orangered; color: white;">
              <h6 id="cart-text" style="display: flex; margin-right: 5px;">Add To Cart</h6>
              <div style="margin-left: 10px; margin-right: 10px; display: none;" id="cart-loader" class="loader-dots"></div>
          </button>
      </div>
    `;

    mydiv.innerHTML += productHTML;
  });
        // Add to cart logic
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
          button.addEventListener('click', function (event) {
            event.stopPropagation();
  
            const lc = localStorage.getItem("userislogin");
            if (lc !== "true") {
              window.location.href = "login.html";
              return;
            }
  
            const productKey = this.getAttribute('data-key');
            const cTitle = this.getAttribute('data-title');
            const price = this.getAttribute('data-price');
            const discount = this.getAttribute('data-discount');
            const thumbnail_url = this.getAttribute('data-thumbnail');
            const number = localStorage.getItem("number");
            const quantity = 1;
  
            const cartRef = firebase.database().ref("CircuitSource/Users/" + number + "/my_cart/" + productKey);
  
            cartRef.once("value", snapshot => {
              if (snapshot.exists()) {
                myFunction("Already in cart");
              } else {
                $("#cart-text", this).css("display", "none");
                $("#cart-i", this).css("display", "none");
                $("#cart-loader", this).css("display", "flex");
  
                cartRef.update({
                  title: cTitle,
                  description: '',
                  key: productKey,
                  quantity: quantity,
                  price: price,
                  discount: discount,
                  thumbnail_url: thumbnail_url,
                }, function (error) {
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
          });
        });
  
      })
      .catch(function (error) {
        console.error('Error fetching products:', error);
        $("#loader-product").css("display", "none");
        $("#all-data-div-product").css("display", "none");
        $("#loader-product-main").css("display", "none");
        mydiv.innerHTML = "<p>Error loading products. Please try again later.</p>";
      });
}





function loadProductMobile() {
  const mydiv = document.getElementById("items-div-m");
  
  mydiv.innerHTML = "";
  productOffset = 0;
  $("#loader-product-m").css("display", "flex");
  mydiv.classList.remove("grid-container");

  const paths = [
    "Ecommerce/Categories/-N6l8PzgYxniHSJZK5-0/products",
    "Ecommerce/Categories/-N8lvCT5lnYJNUcWWlaB/products"
  ];

  const promises = paths.map(path => firebase.database().ref(path).once("value"));

  Promise.all(promises)
    .then(snapshots => {
      allMobileProducts = [];
      snapshots.forEach(snapshot => {
        snapshot.forEach(childSnapshot => {
          allMobileProducts.push(childSnapshot.val());
        });
      });

      $("#loader-product-m").css("display", "none");
      $(".main-div-m").css("display", "block");
      $("#all-data-div-product-m").css("display", "flex");
      mydiv.classList.add("grid-container");

      if (allMobileProducts.length === 0) {
        mydiv.innerHTML = "<p>No products found</p>";
        return;
      }

      renderMobileProducts();
    })
    .catch(function (error) {
      console.error("Error fetching products:", error);
      $("#loader-product-m").css("display", "none");
      $("#all-data-div-product-m").css("display", "none");
      $("#loader-product-main-m").css("display", "none");
      mydiv.innerHTML = "<p>Error loading products. Please try again later.</p>";
    });
}

function renderMobileProducts() {
  const mydiv = document.getElementById("items-div-m");


  const productsToShow = allMobileProducts.slice(productOffset, productOffset + 100);
  productOffset += 100;

  productsToShow.forEach(product => {
    const title = product.title;
    const price = product.price;
    const discount = product.discount;
    const thumbnail = product.thumbnail_url;
    const key = product.key;
    const category = product.category;
    const discPrice = price - discount;

    const productHTML = `
      <div style="cursor: pointer;" onClick="openProduct('${key}','${category}')" class="product-div-one-search fade-in">
        <div style="margin-right: auto; background-color: white; box-shadow: 0px 0px 5px rgb(213, 213, 213); border-radius: 100px; border: 0.5px solid orangered; width: 30px; height: 30px; align-items: center; text-align: center; justify-content: center; color: #000; margin-left: 10px;">
            <i class="fa-regular fa-heart" style="margin-top:7px;"></i>
        </div>
        <img style="border-radius: 10px;" src="${thumbnail}" height="130px" width="120px" alt="">
        <h6 style="height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal; text-align: center; margin-bottom: 0px; overflow: hidden; text-overflow: ellipsis; max-lines: 3; white-space: normal;">${title}</h6>
        <div style="display: flex; align-items: center; text-align: center; width: 100%; justify-content: center;">
            <h5 style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 15px; margin-right: 0px; font-weight: bold;">₹${discPrice}</h5>
            <h5 class="original-price" style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: normal;">₹${price}</h5>
        </div>
        <button class="add-to-cart-btn" data-key="${key}" data-title="${title}" data-price="${price}" data-discount="${discount}" data-thumbnail="${thumbnail}" style="border-radius:5px; display: flex; height: 30px; margin-left: auto; margin-right: auto; background-color: orangered; color: white;">
            <h6 id="cart-text" style="display: flex; margin-right: 5px;">Add To Cart</h6>
            <div style="margin-left: 10px; margin-right: 10px; display: none;" id="cart-loader" class="loader-dots"></div>
        </button>
      </div>
    `;

    mydiv.innerHTML += productHTML;
  });

  // Add to cart logic
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function (event) {
      event.stopPropagation();

      const lc = localStorage.getItem("userislogin");
      if (lc !== "true") {
        window.location.href = "login.html";
        return;
      }

      const productKey = this.getAttribute('data-key');
      const cTitle = this.getAttribute('data-title');
      const price = this.getAttribute('data-price');
      const discount = this.getAttribute('data-discount');
      const thumbnail_url = this.getAttribute('data-thumbnail');
      const number = localStorage.getItem("number");
      const quantity = 1;

      const cartRef = firebase.database().ref("CircuitSource/Users/" + number + "/my_cart/" + productKey);

      cartRef.once("value", snapshot => {
        if (snapshot.exists()) {
          myFunction("Already in cart");
        } else {
          $("#cart-text", this).css("display", "none");
          $("#cart-loader", this).css("display", "flex");

          cartRef.update({
            title: cTitle,
            description: '',
            key: productKey,
            quantity: quantity,
            price: price,
            discount: discount,
            thumbnail_url: thumbnail_url,
          }, function (error) {
            $("#cart-text", this).css("display", "flex");
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
    });
  });
}

// Button in HTML:
// <button id="show-more-btn" onclick="renderMobileProducts()" style="display:none; margin: 20px auto; padding: 10px 20px; background-color: orangered; color: white; border: none; border-radius: 5px;">Show More</button>



  function loadSearchProduct(value) {
    const mydiv = document.getElementById("items-div");
    mydiv.innerHTML = "";
    $("#loader-product").css("display", "flex");
    mydiv.classList.remove("grid-container");
  
    const searchVal = value.trim().toLowerCase();
    const allProducts = [];
  
    const paths = [
      "Ecommerce/Categories/-N6l8PzgYxniHSJZK5-0/products", // Components
      "Ecommerce/Categories/-N8lvCT5lnYJNUcWWlaB/products"  // Tools
    ];
  
    const promises = paths.map(path => firebase.database().ref(path).once("value"));
  
    Promise.all(promises)
      .then(snapshots => {
        snapshots.forEach(snapshot => {
          snapshot.forEach(childSnapshot => {
            allProducts.push(childSnapshot.val());
          });
        });
  
        $("#loader-product").css("display", "none");
        $("#loader-product-main").css("display", "none");
  
        const matchingProducts = allProducts.filter(p => 
          p.title && p.title.toLowerCase().includes(searchVal)
        );
  
        if (matchingProducts.length === 0) {
          $("#not-found").css("display", "block");
          $("#all-data-div-product").css("display", "none");
          mydiv.innerHTML = "<p>No products found</p>";
          return;
        }
  
        $("#not-found").css("display", "none");
        $("#all-data-div-product").css("display", "flex");
        mydiv.classList.add("grid-container");
  
        matchingProducts.forEach(product => {
          const discPrice = product.price - product.discount;
  
          const productHTML = `
            <div style="cursor: pointer;" onClick="openProduct('${product.key}','${product.category}')" class="product-div-one-search fade-in">
              <div style="margin-right: auto; background-color: white; box-shadow: 0px 0px 5px rgb(213, 213, 213); border-radius: 100px; border: 0.5px solid orangered; width: 30px; height: 30px; align-items: center; text-align: center; justify-content: center; color: #000; margin-left: 10px;">
                <i class="fa-regular fa-heart" style="margin-top:7px;"></i>
              </div>
              <img style="border-radius: 10px;" src="${product.thumbnail_url}" height="130px" width="130px" alt="">
              <h6 style="height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal; text-align: center; margin-bottom: 0px; overflow: hidden; text-overflow: ellipsis; max-lines: 3; white-space: normal;">${product.title}</h6>
              <div style="display: flex; align-items: center; justify-content: center;">
                <h5 style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; font-weight: bold;">₹${discPrice}</h5>
                <h5 class="original-price" style="margin-top: 10px; margin-left: 10px; margin-bottom: 0px; font-family: Sans-serif;">₹${product.price}</h5>
              </div>
              <button class="add-to-cart-btn"
                data-key="${product.key}" 
                data-title="${product.title}" 
                data-price="${product.price}" 
                data-discount="${product.discount}" 
                data-thumbnail="${product.thumbnail_url}"
                style="border-radius:5px; display: flex; height: 30px; margin: 10px auto 0; background-color: orangered; color: white;">
                <h6 id="cart-text" style="margin-right: 5px;">Add To Cart</h6>
                <div id="cart-loader" class="loader-dots" style="margin-left: 10px; margin-right: 10px; display: none;"></div>
              </button>
            </div>
          `;
  
          mydiv.innerHTML += productHTML;
        });
  
        // Add to cart functionality
        document.querySelectorAll(".add-to-cart-btn").forEach(button => {
          button.addEventListener("click", function (event) {
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
            const number = localStorage.getItem("number");
            const quantity = 1;
  
            const cartRef = firebase.database().ref("CircuitSource/Users/" + number + "/my_cart/" + productKey);
  
            cartRef.once("value", snapshot => {
              if (snapshot.exists()) {
                myFunction("Already in cart");
              } else {
                $(this).find("#cart-text").hide();
                $(this).find("#cart-loader").show();
  
                cartRef.set({
                  title: cTitle,
                  description: "",
                  key: productKey,
                  quantity: quantity,
                  price: price,
                  discount: discount,
                  thumbnail_url: thumbnail_url
                }, error => {
                  $(this).find("#cart-text").show();
                  $(this).find("#cart-loader").hide();
  
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
  
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        $("#loader-product").css("display", "none");
        $("#all-data-div-product").css("display", "none");
        $("#loader-product-main").css("display", "none");
        mydiv.innerHTML = "<p>Error loading products. Please try again later.</p>";
      });
  }


  function loadSearchProductMobile(value) {
    const mydiv = document.getElementById("items-div-m");
    mydiv.innerHTML = "";
  
    $("#loader-product-m").css("display", "flex");
    mydiv.classList.remove("grid-container");
  
    const searchVal = value.trim().toLowerCase();
    const allProducts = [];
  
    const paths = [
      "Ecommerce/Categories/-N6l8PzgYxniHSJZK5-0/products", // Components
      "Ecommerce/Categories/-N8lvCT5lnYJNUcWWlaB/products"  // Tools
    ];
  
    const promises = paths.map(path => firebase.database().ref(path).once("value"));
  
    Promise.all(promises)
      .then(snapshots => {
        snapshots.forEach(snapshot => {
          snapshot.forEach(childSnapshot => {
            allProducts.push(childSnapshot.val());
          });
        });
  
        $("#loader-product-m").css("display", "none");
        $("#loader-product-main-m").css("display", "none");
  
        const matchingProducts = allProducts.filter(p =>
          p.title && p.title.toLowerCase().includes(searchVal)
        );
  
        if (matchingProducts.length === 0) {
          $("#not-found-m").css("display", "block");
          $("#all-data-div-product-m").css("display", "none");
          mydiv.innerHTML = "<p>No products found</p>";
          return;
        }
  
        $("#not-found-m").css("display", "none");
        $("#all-data-div-product-m").css("display", "flex");
        mydiv.classList.add("grid-container");
  
        matchingProducts.slice(0, 100).forEach(product => {
          const discPrice = product.price - product.discount;
  
          const productHTML = `
            <div style="cursor: pointer;" onClick="openProduct('${product.key}','${product.category}')" class="product-div-one-search fade-in">
                <div style="margin-right: auto; background-color: white; box-shadow: 0px 0px 5px rgb(213, 213, 213); border-radius: 100px; border: 0.5px solid orangered; width: 30px; height: 30px; align-items: center; text-align: center; justify-content: center; color: #000; margin-left: 10px;">
                    <i class="fa-regular fa-heart" style="margin-top:7px;"></i>
                </div>
                <img style="border-radius: 10px;" src="${product.thumbnail_url}" height="130px" width="130px" alt="">
                <h6 style="height: 50px; margin-top: 20px; font-family: Sans-serif; margin-left: 15px; margin-right: 15px; font-weight: normal; text-align: center; margin-bottom: 0px; overflow: hidden; text-overflow: ellipsis; max-lines: 3; white-space: normal;">${product.title}</h6>
                <div style="display: flex; align-items: center; justify-content: center;">
                    <h5 style="margin-top: 10px; margin-bottom: 0px; font-family: Sans-serif; font-weight: bold;">₹${discPrice}</h5>
                    <h5 class="original-price" style="margin-top: 10px; margin-left: 10px; margin-bottom: 0px; font-family: Sans-serif;">₹${product.price}</h5>
                </div>
                <button class="add-to-cart-btn"
                  data-key="${product.key}" 
                  data-title="${product.title}" 
                  data-price="${product.price}" 
                  data-discount="${product.discount}" 
                  data-thumbnail="${product.thumbnail_url}"
                  style="border-radius:5px; display: flex; height: 30px; margin: 10px auto 0; background-color: orangered; color: white;">
                  <h6 id="cart-text" style="margin-right: 5px;">Add To Cart</h6>
                  <div id="cart-loader" class="loader-dots" style="margin-left: 10px; margin-right: 10px; display: none;"></div>
                </button>
            </div>
          `;
  
          mydiv.innerHTML += productHTML;
        });
  
        // Add to cart functionality
        document.querySelectorAll(".add-to-cart-btn").forEach(button => {
          button.addEventListener("click", function (event) {
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
            const number = localStorage.getItem("number");
            const quantity = 1;
  
            const cartRef = firebase.database().ref("CircuitSource/Users/" + number + "/my_cart/" + productKey);
  
            cartRef.once("value", snapshot => {
              if (snapshot.exists()) {
                myFunction("Already in cart");
              } else {
                $(this).find("#cart-text").hide();
                $(this).find("#cart-loader").show();
  
                cartRef.set({
                  title: cTitle,
                  description: "",
                  key: productKey,
                  quantity: quantity,
                  price: price,
                  discount: discount,
                  thumbnail_url: thumbnail_url
                }, error => {
                  $(this).find("#cart-text").show();
                  $(this).find("#cart-loader").hide();
  
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
  
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        $("#loader-product-m").css("display", "none");
        $("#all-data-div-product-m").css("display", "none");
        $("#loader-product-main-m").css("display", "none");
        mydiv.innerHTML = "<p>Error loading products. Please try again later.</p>";
      });
  }
  


function openProduct(key,category){
  localStorage.setItem("search-key", key);
  localStorage.setItem("search-category", category);
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
          <div style="cursor: pointer; display: flex; align-items: center; justify-content: space-between; width: 70%;" 
               onClick="searchText(\`${title}\`)" class="suggestion-text">
              <h5 style="margin: 0px; font-weight: normal; text-align: left;">${searchedCount}. ${title}</h5>
              <i class="fa-solid fa-arrow-right" style="margin-left: 10px;"></i>
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
    if(isMobileScreen()){
        loadSearchProductMobile(st);
    }

    if(!isMobileScreen()){
        loadSearchProduct(st);
    }
   
    localStorage.setItem("recent-search","");
    
  }

  else{
    if(isMobileScreen()){
        loadProductMobile();
    }

    if(!isMobileScreen()){
        loadProduct();
    }
    
  }
}


// Check if the screen width is less than a certain threshold (e.g., 768px for tablets)
function isMobileScreen() {
    return window.innerWidth < 908;
  }