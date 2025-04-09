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

  // Call on page load or tab switch
  loadMyOrders();
  checkLogin();

  function checkLogin(){
    var lc = localStorage.getItem("userislogin");
   //var lc = "true";
   
  
    if(lc == "true"){
        $("#cart-icon").css("margin-right"," 50px");
      $("#login-pending").css("display","none");
     
      
      checkDevice(deviceId);
    }
  
  
  
  
  }
  
  
  function loadMyOrders() {
    const ordersDiv = document.getElementById("orders-div");
    const loader = document.getElementById("loading");
    const no = document.getElementById("no-orders");
    const number = localStorage.getItem("number");
  
    if (!number) {
      ordersDiv.innerHTML = "<p>Please login to view your orders.</p>";
      return;
    }
  
    const ordersRef = firebase.database().ref(`Users/${number}/my_orders`);
  
    ordersRef.once("value", snapshot => {
      if (!snapshot.exists()) {
        loader.style.display = "none"
        no.style.display = "block"
        return;
      }
  loader.style.display = "none"
      ordersDiv.innerHTML = ""; // Clear previous content
  
      const orders = [];
  
      snapshot.forEach(orderSnap => {
        const order = orderSnap.val();
        orders.push(order);
      });
  
      // ✅ Sort by timestamp descending (latest first)
      orders.sort((a, b) => {
        const aTime = new Date(`${a.placing_date} ${a.placing_time}`).getTime();
        const bTime = new Date(`${b.placing_date} ${b.placing_time}`).getTime();
        return bTime - aTime;
      });
  
      // Render sorted orders
      orders.forEach(order => {
        const itemImages = Object.values(order.item_list || {}).map(item => `
            <div style="margin-right: 10px;">
              <img src="${item.thumbnail_url}" alt="${item.title}" 
                   style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover; border: 1px solid #ccc; padding: 2px;">
            </div>
          `).join("");
  
        const orderCard = `
          <div onClick="openProduct('${order.key}')" style="box-shadow: 0 2px 10px rgba(0,0,0,0.08); padding: 15px 20px; border-radius: 12px; margin-bottom: 20px; background-color: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <p style="margin: 0; font-size: 14px; color: #666;">
                <i class="fa-regular fa-calendar"></i> ${order.placing_date} at ${order.placing_time}
              </p>
              <span style="padding: 5px 12px; border-radius: 50px; font-size: 13px; background-color: ${
                order.status === "pending" ? "#ffe0b2" : "#c8e6c9"
              }; color: #444;">${order.status}</span>
            </div>
  
            <div style="margin: 10px 0; font-size: 14px; color: #444;">
              <p style="margin: 6px 0;"><i class="fa-solid fa-truck"></i> Delivery: ${order.delivery} (₹${order.delivery_amount})</p>
              <p style="margin: 6px 0;"><i class="fa-solid fa-location-dot"></i> ${order.shipping_address}</p>
            </div>
  
            <div style="margin: 10px 0; overflow-x: auto; white-space: nowrap; display: flex;">
              ${itemImages}
            </div>
  
            <hr style="margin: 12px 0; border: 0.5px solid #eee;" />
  
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 15px; font-weight: 500;">Total Amount</span>
              <span style="font-size: 16px; font-weight: bold; color: black;">₹${order.payable_amount}</span>
            </div>
          </div>
        `;
  
        ordersDiv.innerHTML += orderCard;
      });
    });
  }

  function openProduct(key){
    localStorage.setItem("trackKey", key);
    window.location.href = "trackorder.html";
  }
