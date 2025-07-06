// const { json } = require("body-parser");

  window.addEventListener('DOMContentLoaded', () => {
    const accountArea = document.getElementById('account-area');
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && username) {
      // ✅ Logged in → show welcome & logout
      accountArea.innerHTML = `
        <span class="nav-link">Hi, ${username}</span>
        <button class="btn btn-sm btn-outline-dark ms-2" id="logout-btn">Logout</button>
      `;
    } else {
      // 🚫 Not logged in → show login icon
      accountArea.innerHTML = `
        <a class="nav-link" href="login_signup.html">
          <img src="img/acc.svg" class="cart" alt="account" />
        </a>
      `;
    }

    // ✅ Logout functionality
    document.addEventListener('click', function (e) {
      if (e.target.id === 'logout-btn') {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = 'login_signup.html';
      }
    });
  });




const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const showLogin = document.getElementById("show-login");
const showSignup = document.getElementById("show-signup");
const signbtn = document.querySelectorAll(".signin");
const loginbtn = document.querySelectorAll(".login");

showLogin.onclick = () => {
  loginForm.style.display = "block";
  signupForm.style.display = "none";
  loginbtn.style.color = "blue";
};

showSignup.onclick = () => {
  signupForm.style.display = "block";
  loginForm.style.display = "none";
};

//     // Optional: set initial state
// signbtn.classList.add('active-toggle');

// loginbtn.addEventListener('click', () => {
//   loginbtn.classList.add('active-toggle');
//   signbtn.classList.remove('active-toggle');
// });

// signbtn.addEventListener('click', () => {
//   signbtn.classList.add('active-toggle');
//   loginbtn.classList.remove('active-toggle');
// });

//////Authentication

const backendurl = "http://localhost:3001";

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:3001/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", name);

      window.location.href = "./shop.html";
    } else {
      alert(data.message);
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.name || email);
        alert('Login successful!');
        window.location.href = "./shop.html";
      } else {
        alert(data.message);
      }
      console.log("Login response:", data);
    } catch (err) {
      console.error("login error:", err);
      alert("Something went wrong during LOGIN.");
    }
  });
}

// document.querySelectorAll('.view-detail-btn').forEach(button => {
//     button.addEventListener('click', function(e) {
//         e.preventDefault();
//         e.stopPropagation();

//         const productCard = this.closest('.product-card');

//         // Get all product data from data attributes
//         const productData = {
//             id: productCard.dataset.id,
//             name: productCard.dataset.name,
//             price: productCard.dataset.price,
//             originalPrice: productCard.dataset.originalPrice || productCard.dataset.price,
//             image: productCard.dataset.image,
//             description: productCard.dataset.description,
//             condition: productCard.dataset.condition,
//             brand: productCard.dataset.brand,
//             era: productCard.dataset.era,
//             size: productCard.dataset.size,
//             rating: productCard.dataset.rating,
//             reviewCount: productCard.dataset.reviewCount,
//             badges: {
//                 sale: productCard.querySelector('.badge-sale') ? true : false,
//                 vintage: productCard.querySelector('.badge-vintage') ? true : false
//             }
//         };

//         // Store product data temporarily
//         sessionStorage.setItem('currentProduct', JSON.stringify(productData));

//         // Redirect to product detail page
//         window.location.href = 'product-detail.html';
//     });
// });

// // Make entire product card clickable if desired
// document.querySelectorAll('.product-card').forEach(card => {
//     card.addEventListener('click', function(e) {
//         if (!e.target.closest('.btn-add-to-cart') && !e.target.closest('.view-detail-btn')) {
//             const viewBtn = this.querySelector('.view-detail-btn');
//             viewBtn.click();
//         }
//     });
// });

// //BACKEND SERVE
// const exp = require("express");
// const app=exp();

// const mysql = require("mysql2");
// const conn =mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "thrift_store",
// })
// //Error Handling

// conn.connect((err)=>{
//     if (err) console.log(err);
//     else console.log("Connected to MYSQL");

// })
// var sql= "SELECT * FROM users"
// //Sending Query
// conn.query(sql,(error,results, fields)=>{
//   if(error)
//     console.log(error) ;
//   else
//   console.log("The solution is: ", results);
// })
