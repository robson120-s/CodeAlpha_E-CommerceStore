// const { json } = require("body-parser");

const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const showLogin = document.getElementById("show-login");
    const showSignup = document.getElementById("show-signup");
    const signbtn = document.querySelectorAll(".signin");
    const loginbtn = document.querySelectorAll(".login");

    showLogin.onclick = () => {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      loginbtn.style.color ="blue";
    };

    showSignup.onclick = () => {
      signupForm.style.display = "block";
      loginForm.style.display = "none";
    };

    // Optional: set initial state
signbtn.classList.add('active-toggle');

loginbtn.addEventListener('click', () => {
  loginbtn.classList.add('active-toggle');
  signbtn.classList.remove('active-toggle');
});

signbtn.addEventListener('click', () => {
  signbtn.classList.add('active-toggle');
  loginbtn.classList.remove('active-toggle');
});
    


    //////Authentication 
    
    const backendurl = "http://localhost:3001";

    if (signupForm){
        signupForm.addEventListener('submit',async (e) => {
            e.preventDefault();
            const name =document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const res= await fetch ('${backendurl}/signin', {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({name, email, password})
            })

            const data =await res.json();

            if(res.ok){
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', name);

                window.location.href = './shop.html';
            }
            else{
                alert(data.message);
            }
        });
    }


    if(loginForm){
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email= document.getElementById('lemail').value;
            const password = document.getElementById('lpasswrd').value;

            const res = await fetch('${backedurl}/login',{
                method: 'POST',
                header: {'Content-Type': 'application/json'},
                body: JSON.stringify({email,password})

            })

            const data = await res.json();
            if(res.ok){
                localStorage.setItem('token',data.token);
                localStorage.setItem('username', data.name || email);
                window.location.href= './index.html';
            }else{
                alert(data.message);
            }
        })
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











