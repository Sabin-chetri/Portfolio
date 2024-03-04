let nav_itm = document.querySelector(".nav-item");
let burger = document.querySelector(".burger");
burger.addEventListener("click",()=>{
    nav_itm.classList.toggle("active");
})