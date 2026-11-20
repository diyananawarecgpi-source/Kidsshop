
const products = [
  {id:1,name:"Cute Baby Dress",category:"Clothing",price:599,emoji:"👗",image:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500"},
  {id:2,name:"Kids T-Shirt",category:"Clothing",price:399,emoji:"👕",image:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500"},
  {id:3,name:"Teddy Bear",category:"Toys",price:499,emoji:"🧸",image:"https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500"},
  {id:4,name:"Building Blocks",category:"Toys",price:699,emoji:"🧩",image:"https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500"},
  {id:5,name:"Kids Sneakers",category:"Footwear",price:899,emoji:"👟",image:"https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500"},
  {id:6,name:"Cute Baby Shoes",category:"Footwear",price:499,emoji:"👞",image:"https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500"},
  {id:7,name:"Kids School Bag",category:"Accessories",price:799,emoji:"🎒",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"},
  {id:8,name:"Kids Sunglasses",category:"Accessories",price:299,emoji:"🕶️",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"}
];

let cart = [];

function renderProducts() {
  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("category-filter").value;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search) &&
    (category === "All" || p.category === category)
  );

  const list = document.getElementById("product-list");

  if (!filtered.length) {
    list.innerHTML = "<p>No products found. Try another search!</p>";
    return;
  }

  list.innerHTML = filtered.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" loading="lazy"
           onerror="this.style.display='none'">
      <div class="product-info">
        <h3>${p.emoji} ${p.name}</h3>
        <p>${p.category}</p>
        <div class="price">₹${p.price}</div>
        <button class="add-btn" onclick="addToCart(${p.id})">
          + Add to Cart
        </button>
      </div>
    </div>
  `).join("");
}

function filterCategory(category) {
  document.getElementById("category-filter").value = category;
  renderProducts();
  document.getElementById("products").scrollIntoView();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...product, quantity:1});
  }

  updateCart();
  alert(product.name + " added to cart!");
}

function updateCart() {
  const count = cart.reduce((sum,item) => sum + item.quantity,0);
  const total = cart.reduce((sum,item) => sum + item.price * item.quantity,0);

  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent = total;

  document.getElementById("cart-items").innerHTML =
    cart.length ? cart.map(item => `
      <div class="cart-item">
        <div>
          <b>${item.emoji} ${item.name}</b>
          <p>₹${item.price} × ${item.quantity}</p>
        </div>
        <button onclick="removeItem(${item.id})">Remove</button>
      </div>
    `).join("") : "<p>Your cart is empty 🛒</p>";
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("show");
}

function login() {
  const name = prompt("Enter your name:");
  if (!name || !name.trim()) return;

  const email = prompt("Enter your email address:");
  if (!email || !email.trim()) return;

  alert("Welcome to LittleNest, " + name + "! ❤️");
}

function checkout() {
  if (!cart.length) {
    alert("Your cart is empty!");
    return;
  }

  const name = prompt("Enter your full name:");
  if (!name || !name.trim()) return;

  const phone = prompt("Enter your mobile number:");
  if (!phone || !/^[0-9]{10}$/.test(phone)) {
    alert("Please enter a valid 10 digit mobile number.");
    return;
  }

  const address = prompt("Enter your complete delivery address:");
  if (!address || !address.trim()) return;

  const total = cart.reduce((sum,item) =>
    sum + item.price * item.quantity,0);

  const confirmOrder = confirm(
    "Order Summary\n" +
    "Name: " + name + "\n" +
    "Phone: " + phone + "\n" +
    "Address: " + address + "\n" +
    "Total: ₹" + total + "\n\n" +
    "Place order with Cash on Delivery?"
  );

  if (confirmOrder) {
    alert("Thank you " + name + "! Your demo order has been placed. ❤️");
    cart = [];
    updateCart();
    toggleCart();
  }
}

renderProducts();
updateCart();
