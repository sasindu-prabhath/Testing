const products = [
  { id: 1, name: 'Coffee', price: 2.5 },
  { id: 2, name: 'Tea', price: 2.0 },
  { id: 3, name: 'Sandwich', price: 5.0 },
  { id: 4, name: 'Salad', price: 4.0 }
];

const cart = new Map();

function renderProducts() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `<strong>${p.name}</strong><br/>$${p.price.toFixed(2)}`;
    const btn = document.createElement('button');
    btn.textContent = 'Add';
    btn.onclick = () => addToCart(p);
    div.appendChild(btn);
    list.appendChild(div);
  });
}

function addToCart(product) {
  const item = cart.get(product.id) || { ...product, qty: 0 };
  item.qty += 1;
  cart.set(product.id, item);
  renderCart();
}

function removeFromCart(id) {
  if (!cart.has(id)) return;
  const item = cart.get(id);
  item.qty -= 1;
  if (item.qty <= 0) {
    cart.delete(id);
  } else {
    cart.set(id, item);
  }
  renderCart();
}

function renderCart() {
  const items = document.getElementById('cart-items');
  items.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.qty}`;
    const span = document.createElement('span');
    const itemTotal = item.price * item.qty;
    span.textContent = `$${itemTotal.toFixed(2)}`;
    li.appendChild(span);
    li.onclick = () => removeFromCart(item.id);
    items.appendChild(li);
    total += itemTotal;
  });
  document.getElementById('cart-total').textContent = total.toFixed(2);
}

function checkout() {
  if (cart.size === 0) {
    alert('Cart is empty');
    return;
  }
  alert('Order placed!');
  cart.clear();
  renderCart();
}

document.getElementById('checkout-button').addEventListener('click', checkout);
renderProducts();
