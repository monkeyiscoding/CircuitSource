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
    $("#profile-m").css("display","flex");
    $("#login-button-m").css("display","none");
    $("#name").html(name);
    $("#number").html(number);

  }


  else{
    $("#login-pending").css("display","flex");
    $("#login-done").css("display","none");
    $("#profile-m").css("display","none");
    $("#login-button-m").css("display","flex");
  }

}


var addressCheck = false;
var count = 0;
var tPrice = 0;
var cartTotal = 0;
var cartTotalDiscount = 0;
var totaltax = 0;


if(isMobileScreen()){
  loadCartProductMobile();

}

if(!isMobileScreen()){
  loadCartProduct();
}

//updateCart();
loardCartCount();
loadDefaultAddress();




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


function loadCartProduct() {

    var mydiv = document.getElementById("cart-items-div");
    
    $("#loader-items").css("display", "flex");
    mydiv.classList.remove('grid-container');
    var number = localStorage.getItem("number");
    var query = firebase.database().ref("CircuitSource/Users/" + number + "/my_cart");
  
    query.on("value", function(snapshot) {
        mydiv.innerHTML = "";
        count = 0;
        tPrice = 0;
        cartTotal = 0;
        cartTotalDiscount = 0;
        totaltax = 0;
        updateCart();
        if(snapshot.exists()){
            $("#no-cart").css("display", "none");
           
            
            
        }

        else{
            $("#no-cart").css("display", "block");
           
        }

        
    snapshot.forEach(function(childSnapshot) {
       
        var title = childSnapshot.val().title;
        var price = childSnapshot.val().price;
        var discount = childSnapshot.val().discount;
        var thumbnail = childSnapshot.val().thumbnail_url;
        var key = childSnapshot.val().key;
        var des = childSnapshot.val().description;
        var quantity = childSnapshot.val().quantity;
  
        var discPrice = price - discount;
        
        // Dynamically create elements for each cart item
        var cartItem = document.createElement('div');
        cartItem.style.width = '100%';
        cartItem.style.marginTop = '20px';
        cartItem.innerHTML = `
        
          <div class="cart-item" style="width: 100%; display: flex; align-items: center; justify-content: space-between;">
          
            <div style="display: flex;">
              <img style="width: 70px; background-color: rgb(241, 240, 240); padding: 15px; border-radius: 10px;" src="${thumbnail}" alt="">
              <div style="margin-left: 15px; align-items: start;">
                <h5 style="margin-bottom: 0px; font-weight: 400; max-width: 300px; height: 30px; overflow: hidden; text-overflow: ellipsis;">${title}</h5>
            
               <div style="display: flex; align-items: center; justify-content: left; text-align: left; height; 10px; padding: 0px;">
              <h4 id="price" style="color: orangered;">₹${discPrice}</h4>
              <h4 id="mrp" class="original-price" style="margin-top: 0px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: 200;">₹${price}</h4>
            </div>
                </div>
              
            </div>
            
           
            
            <div style="display: flex; align-items: center;">
              <div style="display: flex; align-items: center;">
                <h5 style="font-weight: 200; color: rgb(200, 196, 196); margin-right: 10px;">Quantity</h5>
                <input min="1" class="quantity-input" value="${quantity}" data-initial-value="${quantity}" style="width: 60px; height: 30px; border-radius: 5px; border: 0.5px solid grey; text-align: center;" type="number">
                <button class="delete-button" style="background-color: transparent; border: none; margin-left: 10px; cursor: pointer; margin-bottom: 5px; text-align: center;">
                  <i  class="fas fa-trash-alt" style="color: red; font-size: 20px; border: 1px solid white; width: 30px; height: 30px; border-radius: 100px; padding: 10px;"></i>
                </button>
                <button class="save-button" style="opacity: 0; transform: translateX(100%); background-color: orangered; color: white; font-size: 12px; border-radius: 100px; margin-left: 10px; margin-bottom: 10px; transition: opacity 0.5s ease, transform 0.5s ease;">Update</button>
                
              </div>
            </div>
          </div>
          <hr style="border: 0.4px solid rgb(246, 244, 244);">
        `;
        
        // Append the created cart item to the cart-items-div
        mydiv.appendChild(cartItem);
  
        // Event handling for input change in quantity
        var quantityInput = cartItem.querySelector('.quantity-input');
        var deleteButton = cartItem.querySelector('.delete-button');
        var saveButton = cartItem.querySelector('.save-button');
        
        var initialValue = quantityInput.dataset.initialValue; // Get initial value
        
        quantityInput.addEventListener('input', function() {
          var currentValue = quantityInput.value.trim(); // Trimmed value to handle spaces
          if (currentValue !== initialValue && currentValue !== '' && currentValue != 0) {
            // Show save button and hide delete button with wipe animation
            saveButton.style.opacity = '1';
            saveButton.style.transform = 'translateX(0)';
          } else if (currentValue == 0) {
            // Hide save button with wipe animation
            saveButton.style.opacity = '0';
            saveButton.style.transform = 'translateX(100%)';
          } else {
            // Hide save button with wipe animation
            saveButton.style.opacity = '0';
            saveButton.style.transform = 'translateX(100%)';
          }
        });
  
        // Event handling for save button click
        saveButton.addEventListener('click', function() {
          // Update the quantity in Firebase or perform save action
          // For demonstration, let's assume you update Firebase here
          var newQuantity = quantityInput.value;
          firebase.database().ref("CircuitSource/Users/" + number + "/my_cart/" + key).update({
            quantity: newQuantity
          }).then(function() {
            alert('Quantity updated successfully');
            // Hide save button after saving
            updateCart();
            saveButton.style.opacity = '0';
            saveButton.style.transform = 'translateX(100%)';
            quantityInput.dataset.initialValue = newQuantity; // Update initial value after save
          }).catch(function(error) {
            console.error('Error updating quantity: ', error);
          });
        });
  
        // Event handling for delete button click
        deleteButton.addEventListener('click', function() {
          // Delete the item from Firebase or perform delete action
          firebase.database().ref("CircuitSource/Users/" + number + "/my_cart/" + key).remove().then(function() {
            myFunction('Item deleted successfully');
            // Remove the cart item from the DOM
            cartItem.remove();
            updateCart();
          }).catch(function(error) {
            console.error('Error deleting item: ', error);
          });
        });
  
      });
  
      $("#loader-items").css("display", "none");
      $("#cart-items-div").css("display", "block");
      
  
    });
  }
  

  function loadCartProductMobile() {
    var mydiv = document.getElementById("cart-items-div-m");
    
    $("#loader-items-m").css("display", "flex");
    mydiv.classList.remove('grid-container');
    var number = localStorage.getItem("number");
    var query = firebase.database().ref("CircuitSource/Users/" + number + "/my_cart");
  
    query.on("value", function(snapshot) {
        mydiv.innerHTML = "";
        count = 0;
        tPrice = 0;
        cartTotal = 0;
        cartTotalDiscount = 0;
        totaltax = 0;
        updateCartMobile();
        if(snapshot.exists()){
            $("#no-cart-m").css("display", "none");
            $("#openBottomSheet").css("display", "block");
            $("#item-count-m").css("display", "block");
        }

        else{
            $("#no-cart-m").css("display", "block");
            $("#openBottomSheet").css("display", "none");
            $("#item-count-m").css("display", "none");
        }

        
    snapshot.forEach(function(childSnapshot) {
       
        var title = childSnapshot.val().title;
        var price = childSnapshot.val().price;
        var discount = childSnapshot.val().discount;
        var thumbnail = childSnapshot.val().thumbnail_url;
        var key = childSnapshot.val().key;
        var des = childSnapshot.val().description;
        var quantity = childSnapshot.val().quantity;
  
        var discPrice = price - discount;
        
        // Dynamically create elements for each cart item
        var cartItem = document.createElement('div');
        cartItem.style.width = '100%';
        cartItem.style.marginTop = '20px';
        cartItem.innerHTML = `
        
          <div class="cart-item" style="width: 100%; display: flex; align-items: center; justify-content: space-between;">
          
            <div style="display: flex;">
              <img style="width: 100px; height: 100px; background-color: rgb(241, 240, 240); padding: 10px; border-radius: 10px;" src="${thumbnail}" alt="">
              <div style="margin-left: 15px; align-items: start;">
                <h5 style="margin-bottom: 0px; font-weight: 400; max-width: 300px; height: 30px; overflow: hidden; text-overflow: ellipsis;">${title}</h5>
            
               <div style="display: flex; align-items: center; justify-content: left; text-align: left; height; 10px; padding: 0px;">
              <h4 id="price" style="color: orangered;">₹${discPrice}</h4>
              <h4 id="mrp" class="original-price" style="margin-top: 0px; margin-bottom: 0px; font-family: Sans-serif; margin-left: 5px; margin-right: 15px; font-weight: 200;">₹${price}</h4>
            
            
              </div>
              <div style="display: flex; align-items: center;">
              <div style="display: flex; align-items: center;">
                <h5 style="font-weight: 200; color: rgb(200, 196, 196); margin-right: 10px;">QT.</h5>
                <input min="1" class="quantity-input" value="${quantity}" data-initial-value="${quantity}" style="width: 30px; height: 20px; border-radius: 5px; border: 0.5px solid grey; text-align: center;" type="number">
                <button class="delete-button" style="background-color: transparent; border: none; margin-left: 10px; cursor: pointer; margin-bottom: 5px; text-align: center;">
                  <i  class="fas fa-trash-alt" style="color: red; font-size: 20px; border: 1px solid white; width: 30px; height: 30px; border-radius: 100px; padding: 10px;"></i>
                </button>
                <button class="save-button" style="opacity: 0; transform: translateX(100%); background-color: orangered; color: white; font-size: 12px; border-radius: 100px; margin-left: 10px; margin-bottom: 10px; transition: opacity 0.5s ease, transform 0.5s ease;">Update</button>
                
              </div>
            </div>
                </div>
              
            </div>
            
           
            
            
          </div>
          <hr style="border: 0.4px solid rgb(246, 244, 244);">
        `;
        
        // Append the created cart item to the cart-items-div
        mydiv.appendChild(cartItem);
  
        // Event handling for input change in quantity
        var quantityInput = cartItem.querySelector('.quantity-input');
        var deleteButton = cartItem.querySelector('.delete-button');
        var saveButton = cartItem.querySelector('.save-button');
        
        var initialValue = quantityInput.dataset.initialValue; // Get initial value
        
        quantityInput.addEventListener('input', function() {
          var currentValue = quantityInput.value.trim(); // Trimmed value to handle spaces
          if (currentValue !== initialValue && currentValue !== '' && currentValue != 0) {
            // Show save button and hide delete button with wipe animation
            saveButton.style.opacity = '1';
            saveButton.style.transform = 'translateX(0)';
          } else if (currentValue == 0) {
            // Hide save button with wipe animation
            saveButton.style.opacity = '0';
            saveButton.style.transform = 'translateX(100%)';
          } else {
            // Hide save button with wipe animation
            saveButton.style.opacity = '0';
            saveButton.style.transform = 'translateX(100%)';
          }
        });
  
        // Event handling for save button click
        saveButton.addEventListener('click', function() {
          // Update the quantity in Firebase or perform save action
          // For demonstration, let's assume you update Firebase here
          var newQuantity = quantityInput.value;
          firebase.database().ref("CircuitSource/Users/" + number + "/my_cart/" + key).update({
            quantity: newQuantity
          }).then(function() {
            alert('Quantity updated successfully');
            // Hide save button after saving
            updateCart();
            saveButton.style.opacity = '0';
            saveButton.style.transform = 'translateX(100%)';
            quantityInput.dataset.initialValue = newQuantity; // Update initial value after save
          }).catch(function(error) {
            console.error('Error updating quantity: ', error);
          });
        });
  
        // Event handling for delete button click
        deleteButton.addEventListener('click', function() {
          // Delete the item from Firebase or perform delete action
          firebase.database().ref("CircuitSource/Users/" + number + "/my_cart/" + key).remove().then(function() {
            myFunction('Item deleted successfully');
            // Remove the cart item from the DOM
            cartItem.remove();
            updateCart();
          }).catch(function(error) {
            console.error('Error deleting item: ', error);
          });
        });
  
      });
  
      $("#loader-items-m").css("display", "none");
      $("#cart-items-div-m").css("display", "block");
      $("#loader-m").css("display", "none");
      $(".main-div-m").css("display", "block");
      
  
    });
  }



  function updateCart() {
   
    count = 0;
    tPrice = 0;
    cartTotal = 0;
    cartTotalDiscount = 0;
    totaltax = 0;
    number = localStorage.getItem("number");
    query = firebase.database().ref("CircuitSource/Users/" + number + "/my_cart");


    query.once("value", function(snapshot) {
        
      snapshot.forEach(function(childSnapshot) {
        count++;
        $("#item-count").html("Items ("+count+")");
        var title = childSnapshot.val().title;
        var price = childSnapshot.val().price;
        var discount = childSnapshot.val().discount;
        var thumbnail = childSnapshot.val().thumbnail_url;
        var key = childSnapshot.val().key;
        var des = childSnapshot.val().description;
        var quantity = childSnapshot.val().quantity;
  
        var discPrice = price - discount;
        cartTotal += price * quantity;
        cartTotalDiscount += discount * quantity;

        tPrice += price* quantity
        $("#item-total").html("₹"+tPrice.toFixed(2))
        $("#total-discount").html("-₹"+cartTotalDiscount.toFixed(2))
       
        var dp = tPrice - cartTotalDiscount;
        totaltax = dp / 100 * 18;
        
        $("#total-tax").html("₹"+totaltax.toFixed(2))
        var t = dp - discount + totaltax
        $("#total-amount").html("₹"+t.toFixed(2))
      
  
      });
  
     
  
    });
  }
  
  function updateCartMobile() {
   
    count = 0;
    tPrice = 0;
    cartTotal = 0;
    cartTotalDiscount = 0;
    totaltax = 0;
    number = localStorage.getItem("number");
    query = firebase.database().ref("CircuitSource/Users/" + number + "/my_cart");


    query.once("value", function(snapshot) {
        
      snapshot.forEach(function(childSnapshot) {
        count++;
        $("#item-count-m").html("Items ("+count+")");
        var title = childSnapshot.val().title;
        var price = childSnapshot.val().price;
        var discount = childSnapshot.val().discount;
        var thumbnail = childSnapshot.val().thumbnail_url;
        var key = childSnapshot.val().key;
        var des = childSnapshot.val().description;
        var quantity = childSnapshot.val().quantity;
  
        var discPrice = price - discount;
        cartTotal += price * quantity;
        cartTotalDiscount += discount * quantity;

        tPrice += price* quantity
        $("#item-total-m").html("₹"+tPrice.toFixed(2))
        $("#total-discount-m").html("-₹"+cartTotalDiscount.toFixed(2))
       
        var dp = tPrice - cartTotalDiscount;
        totaltax = dp / 100 * 18;
        
        $("#total-tax-m").html("₹"+totaltax.toFixed(2))
        var t = dp - discount + totaltax
        $("#total-amount-m").html("₹"+t.toFixed(2))
      
  
      });
  
     
  
    });
  }
  

  function openDialogCheck(){

    var lc = localStorage.getItem("userislogin");
    if(lc == "true"){
        if(addressCheck){
            window.location.href = "address.html";
        }
        else{
            openDialog();
        }
    }
    else{
        window.location.href = "login.html";
    }
    
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

    var query = firebase.database().ref("CircuitSource/Users/"+number+"/address_list")

    var key = query.push().key;
    var query2 = firebase.database().ref("CircuitSource/Users/"+number+"/address_list/"+key)
    var query3 = firebase.database().ref("CircuitSource/Users/"+number+"/primary_address")

  
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
  


  var number = localStorage.getItem("number");
  function loadDefaultAddress(){
    var query = firebase.database().ref("CircuitSource/Users/"+number)
    
    query.on("value", function(snapshot) {
    
        var key = snapshot.val().primary_address;
       
        var query2 = firebase.database().ref("CircuitSource/Users/"+number+"/address_list/"+key)

        query2.once("value", function(snapshot) {

            if(snapshot.exists()){
                addressCheck = true;
            }
            var address = snapshot.val().address;
            var pin = snapshot.val().pincode;
            var city = snapshot.val().city;
            var state = snapshot.val().state;
            var phone = snapshot.val().phone;

            $("#default-address").html(address+"\n\n"+city+", "+state+", "+pin);
            $("#default-address-m").html(address+"<br>"+city+", "+state+", "+pin+"<br><br>"+number);
        })

    })
  }




// scripts.js
document.getElementById('openBottomSheet').addEventListener('click', function() {
  var bottomSheetBack = document.getElementById('bottomSheetBack');
  bottomSheetBack.style.display = 'block';
  var bottomSheet = document.getElementById('bottomSheet');
  bottomSheet.style.display = 'block';
});

document.getElementById('closeBottomSheetNow').addEventListener('click', function() {
  var bottomSheet = document.getElementById('bottomSheet');
  bottomSheet.style.display = 'none';
  var bottomSheetBack = document.getElementById('bottomSheetBack');
  bottomSheetBack.style.display = 'none';
});

 // Check if the screen width is less than a certain threshold (e.g., 768px for tablets)
 function isMobileScreen() {
  return window.innerWidth < 908;
}
