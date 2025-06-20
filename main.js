// Signup
document.getElementById("btn1").addEventListener("click", function () {
  let name = document.getElementById("name").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let password = document.getElementById("password").value.trim();

  if (name === "" || phone === "" || password === "") {
    alert("All fields are required!");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Enter a valid 10-digit phone number.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  const user = { name, phone, password };
  localStorage.setItem("user", JSON.stringify(user));
  alert("Signup successful! Now login.");
  closeModal("signupModal");
  updateProfileUI();
});

// Login
document.getElementById("loginBtn").addEventListener("click", function () {
  let phone = document.getElementById("loginPhone").value.trim();
  let password = document.getElementById("loginPassword").value.trim();

  if (phone === "" || password === "") {
    alert("Please fill in all fields.");
    return;
  }

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("No user found. Please sign up first.");
    return;
  }

  if (storedUser.phone === phone && storedUser.password === password) {
    alert("Login successful! Welcome " + storedUser.name);
    closeModal("loginModal");
    updateProfileUI();
  } else {
    alert("Invalid phone or password.");
  }
});

// Modal Functions
function openModal(id) {
  document.getElementById(id).style.display = "flex";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
function toggleProfile() {
  const menu = document.getElementById("profileMenu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// Profile Info
function updateProfileUI() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    document.getElementById("profileName").innerText = storedUser.name;
    document.getElementById("profilePhone").innerText = storedUser.phone;
  }
}
updateProfileUI();

// Cart
let cart = [];

function addToCart(itemName) {
  const item = cart.find((i) => i.name === itemName);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name: itemName, qty: 1 });
  }
  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const price = 150; // Static price
    total += price * item.qty;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} x ${item.qty}</span>
        <span>₹${price * item.qty}</span>
      </div>
    `;
  });

  cartCount.innerText = cart.reduce((acc, i) => acc + i.qty, 0);
  cartTotal.innerText = total;
}

function toggleCart() {
  document.getElementById("cartPanel").classList.toggle("open");
}

function makePayment() {
  if (cart.length === 0) {
    alert("Cart is empty!");
  } else {
    // alert("Payment Successful! Thank you for your order 🍽️");
    // openModal("paymentModal");
    open('./payment.html', '_blank');
    cart = [];
    updateCartUI();
    toggleCart();
  }
}

function buyNow(itemName) {
  alert(`Thank you for buying ${itemName} 🍗! Order placed successfully.`);
}




// auto display by admin to the user 
function loadMenuItems() {
  const menu = JSON.parse(localStorage.getItem("menu")) || [];
  const container = document.getElementById("menuContainer");

  if (!container) return;

  container.innerHTML = "";

  menu.forEach(item => {
    container.innerHTML += `
      <div class="menu-card">
        <img src="${item.image}" alt="${item.name}">
        <div class="info">
          <h4>${item.name} - ₹${item.price}</h4>
          <p style="font-size: 14px; color: #ccc;">${item.desc || ""}</p>
          <div class="btn-row">
            <button onclick="addToCart('${item.name}')">Add to Cart</button>
            <button onclick="buyNow('${item.name}')">Buy</button>
          </div>
        </div>
      </div>
    `;
  });
}

window.onload = () => {
  loadMenuItems(); // show dynamic menu
  updateProfileUI(); // profile info
};


// firebase 



