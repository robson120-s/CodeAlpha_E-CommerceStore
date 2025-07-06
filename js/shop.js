
  document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');

    addToCartButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const card = button.closest('.product-card');
        const token = localStorage.getItem('token');

        if (!token) {
          alert('Please log in to add items to your cart.');
          window.location.href = 'login_signup.html';
          return;
        }

        const product = {
          id: card.getAttribute('data-id'),
          name: card.getAttribute('data-name'),
          price: parseFloat(card.getAttribute('data-price')),
          quantity: 1
        };

        try {
          const res = await fetch('http://localhost:3001/cart/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
    product_id: product.id,
    quantity: 1
  })
          });

          const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        alert('✅ ' + data.message);
      } catch (err) {
        console.error('Cart Add Error:', err);
        alert('Something went wrong: ' + err.message);
      }
      });
    });
});

