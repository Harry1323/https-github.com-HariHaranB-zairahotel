console.log("Check admin page");

let editIndex = -1;

// CREATE or UPDATE
function addMenuItem() {
  const name = document.getElementById("itemName").value.trim();
  const price = document.getElementById("itemPrice").value.trim();
  const image = document.getElementById("itemImage").value.trim();
  const desc = document.getElementById("itemDesc").value.trim();

  if (!name || !price || !image) {
    alert("Please fill all required fields (Name, Price, Image).");
    return;
  }

  const item = { name, price, image, desc };
  let menu = JSON.parse(localStorage.getItem("menu")) || [];

  if (editIndex === -1) {
    // Add new item
    menu.push(item);
    alert("Item added!");
  } else {
    // Update existing item
    menu[editIndex] = item;
    alert("Item updated!");
    editIndex = -1;
    document.querySelector("button").innerText = "Add Item";
  }

  localStorage.setItem("menu", JSON.stringify(menu));
  renderMenuList();
  clearForm();
}

// READ
function renderMenuList() {
  const list = document.getElementById("menuList");
  const menu = JSON.parse(localStorage.getItem("menu")) || [];

  list.innerHTML = "";
  menu.forEach((item, index) => {
    list.innerHTML += `
      <div class="menu-card">
        <img src="${item.image}" alt="${item.name}">
        <h4>${item.name} - ₹${item.price}</h4>
        <p>${item.desc || ""}</p>
        <button onclick="editItem(${index})" style="margin-right:10px;">✏️ Edit</button>
        <button onclick="deleteItem(${index})">🗑️ Delete</button>
      </div>
    `;
  });
}

// DELETE
function deleteItem(index) {
  if (confirm("Are you sure you want to delete this item?")) {
    let menu = JSON.parse(localStorage.getItem("menu")) || [];
    menu.splice(index, 1);
    localStorage.setItem("menu", JSON.stringify(menu));
    renderMenuList();
  }
}

// UPDATE (Pre-fill form)
function editItem(index) {
  const menu = JSON.parse(localStorage.getItem("menu")) || [];
  const item = menu[index];

  document.getElementById("itemName").value = item.name;
  document.getElementById("itemPrice").value = item.price;
  document.getElementById("itemImage").value = item.image;
  document.getElementById("itemDesc").value = item.desc;

  editIndex = index;
  document.querySelector("button").innerText = "Update Item";
}

function clearForm() {
  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemImage").value = "";
  document.getElementById("itemDesc").value = "";
}

renderMenuList();
