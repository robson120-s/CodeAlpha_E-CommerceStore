const backendUrl = 'http://localhost:3001';
const token = localStorage.getItem('token');

if (!token) {
  alert('You must be logged in to view your cart.');
  window.location.href = './login_signup.html';
}

function loadCart() {
  fetch(`${backendUrl}/cart`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';

    if (data.length === 0) {
      container.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }

    data.forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p><strong>${item.name}</strong> - $${item.price} × ${item.quantity}</p>
        <button onclick="removeItem(${item.id}, ${item.product_id})">Remove</button>
        <hr/>
      `;
      container.appendChild(div);
    });
  });
}

function removeItem(cartId, productId) {
  fetch(`${backendUrl}/cart/remove`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ product_id: productId })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    loadCart(); // Reload cart after removal
  });
}

function goToCheckout() {
  window.location.href = 'checkout.html';
}

loadCart();
