const burgerButton = document.querySelector(".burger-menu");
const dropDownMenu = document.querySelector(".dropdown-menu");

burgerButton.addEventListener("click",function(){
  dropDownMenu.classList.toggle("show");
})