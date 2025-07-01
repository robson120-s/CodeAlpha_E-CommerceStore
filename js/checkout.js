const backendUrl = 'http://localhost:3001';
const token = localStorage.getItem('token');

if (!token) {
  alert("Please log in to checkout.");
  window.location.href = 'login.html';
}

document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullname = document.getElementById('fullname').value;
  const address = document.getElementById('address').value;

  const res = await fetch(`${backendUrl}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ fullname, address })
  });

  const data = await res.json();
  alert(data.message);

  if (res.ok) {
    // Redirect or show order summary
    window.location.href = '../index.html';
  }
});
