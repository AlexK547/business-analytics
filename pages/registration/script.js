import users from '../../assets/scripts/users.js';

const user = document.querySelector('.login__form-name');
const password = document.querySelector('.login__form-password');
const loginBtn = document.querySelector('.login__btn');
const loginText = document.querySelector('.login__text');

let userName = "";
let userPassword = "";
let userRole = "";
let isOpenAccess = false;

function setLocalStorage() {
  localStorage.setItem('userName', user.value);
  localStorage.setItem('userPassword', password.value);
  localStorage.setItem('userRole', userRole);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('userName')) {
    userName = localStorage.getItem('userName');
  }
  if (localStorage.getItem('userPassword')) {
    userPassword = localStorage.getItem('userPassword');
  }
  if (localStorage.getItem('userRole')) {
    userRole = localStorage.getItem('userRole');
  }
}
window.addEventListener('load', getLocalStorage);

loginBtn.addEventListener("click", () => {

  users.forEach((item) => {
    if (user.value === item.name && password.value === item.password) {
      isOpenAccess = true;
      userRole = item.role;
      setLocalStorage();
    }
  });

  if (!isOpenAccess) {
    loginText.classList.remove("login__text-access");
    loginText.textContent = "Неверно указано имя или пароль";
  } else {
    loginText.classList.add("login__text-access");
    loginText.textContent = "Ожидайте 2 секунды";
    setTimeout(() => {
      window.location.href = '../categories/';
    }, 2000);
  }
});