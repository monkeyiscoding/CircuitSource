
const number = localStorage.getItem("number");; // In real scenario, fetch this dynamically
const trackKey = localStorage.getItem("trackKey");

const dbPath = `Users/${number}/my_orders/${trackKey}`;

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBpRrmTK4449iHbUW_jNE1CjaWYTdmGdaY",
  authDomain: "qphix-training-193c9.firebaseapp.com",
  databaseURL: "https://qphix-training-193c9-default-rtdb.firebaseio.com",
  projectId: "qphix-training-193c9",
  storageBucket: "qphix-training-193c9.appspot.com",
  messagingSenderId: "343406672827",
  appId: "1:343406672827:web:f2c02f8cfdb6c9afa3e29e"
};
firebase.initializeApp(firebaseConfig);

firebase.database().ref(dbPath).once("value", function(snapshot) {
  if (!snapshot.exists()) return;

  const data = snapshot.val();

  let steps = [
    { title: "Order Placed", desc: "Your order has been placed successfully" },
    { title: "Order Dispatched", desc: "Your order has been dispatched about to be out of delivery" },
    { title: "Out For Delivery", desc: "Your order is out for delivery and will be delivered soon" },
    { title: "Delivered", desc: "Your order has been delivered" },
  ];

  const statusIndex = data.status === "pending"
  ? 1
  : data.status === "out for delivery"
  ? 3
  : data.status === "delivered"
  ? 4
  : 0; // default/fallback
  let timelineHTML = steps.map((step, i) => {
    return `<div class="step" style="opacity: ${i < statusIndex ? 1 : 0.5}">
        <h4>${step.title}</h4>
        <p>${step.desc}</p>
      </div>`;
  }).join("");
  let itemList = data.item_list;
  if(data.status != "pending"){
    $("#track").css("display","block");
  }

// If it's an object (like in Firebase), convert to array
let itemsArray = Array.isArray(itemList) ? itemList : Object.values(itemList);

// Now get the length
let itemCount = itemsArray.length;


  const imageHTML = Object.values(data.item_list).map(item => `
    <img src="${item.thumbnail_url}" alt="item" />
  ` ).join("");

  const infoHTML = `
    <div class="header">
      <img src="https://yt3.googleusercontent.com/Bxg9bBFQmvSNHaMuNbbhSWTEpNb4uOYz4bYlGxdDty3BGmBQi5nhAnDchuWm1zmRI0G40f0MMw=s900-c-k-c0x00ffffff-no-rj" />
      <div>
        <h2 style="margin-bottom:0px; margin-top: 0px; margin-left: 10px;">Order (${ itemCount} - Items)</h2>
        <div style="font-size: 14px; color: gray;margin-left: 10px;">Rs. ${data.payable_amount}</div>
      </div>
    </div>
    <div class="timeline">
      ${timelineHTML}
    </div>

    <!-- Tracking ID Copy Box -->
<div class="copy-box" style="display:none;">
  <span>Tracking ID: <strong id="tracking-id">${data.tracking_id}</strong></span>
  <i class="fa-solid fa-copy copy-icon" onclick="copyToClipboard(${data.tracking_id})" title="Copy Tracking ID"></i>
</div>

<!-- Tracking URL Copy Box -->
<div class="copy-box" style="display:none;">
  <span>Tracking URL: <strong id="tracking-url">${data.tracking_url}</strong></span>
  <i class="fa-solid fa-copy copy-icon" onclick="copyToClipboard(${data.tracking_url})" title="Copy Tracking URL"></i>
</div>

    <button id="track" style=" display: none;width: 100%; height:50px; border-radius: 10px;background-color: black;"><h4 style="color: white; margin:0px;"> Track Order </h4></button>
    
    <h3>Orderd Items</h3>
    <div class="scroll-images">
      ${imageHTML}
    </div>
    <div class="details">
      <div><div class="icon-box"><i class="fa-solid fa-calendar-days"></i></div> Date: ${data.placing_date} ${data.placing_time}</div>
      <div><div class="icon-box"><i class="fa-solid fa-user"></i></div> Name: ${data.username}</div>
      <div><div class="icon-box"><i class="fa-solid fa-truck"></i></div> Delivery Type: ${data.delivery}</div>
      <div><div class="icon-box"><i class="fa-solid fa-envelope"></i>
</div> Email: ${data.email}</div>
      <div><div class="icon-box"><i class="fa-solid fa-location-dot"></i></div> Address: ${data.shipping_address}</div>
    </div>
  `;

  document.getElementById("order-container").innerHTML = infoHTML;


// ✅ Now that #track exists in DOM, check and show it
if (data.status !== "pending") {
    $("#track").css("display", "block");
    $(".copy-box").css("display", "block");
    document.getElementById("track").addEventListener("click", function () {
      // Open tracking URL in new tab
      if (data.tracking_url) {
        window.open(data.tracking_url, "_blank");
      }
  
      // Copy tracking ID to clipboard
      if (data.tracking_id) {
        navigator.clipboard.writeText(data.tracking_id).then(() => {
          alert("Tracking ID copied to clipboard!");
        }).catch(err => {
          console.error("Could not copy tracking ID:", err);
        });
      }
    });
  }
});
function copyToClipboard(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert(`${id.replace("tracking-", "").toUpperCase()} copied!`);
    }).catch(err => {
      alert("Failed to copy");
      console.error(err);
    });
  }
  document.getElementById("tracking-id").innerText = data.tracking_id || "Not available";
document.getElementById("tracking-url").innerText = data.tracking_url || "Not available";