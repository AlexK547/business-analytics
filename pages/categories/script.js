const user = document.querySelector(".header__user");
const exitBtn = document.querySelector(".header__exit");

function getLocalStorage() {
  if (localStorage.getItem('userName')) {
    user.textContent = localStorage.getItem('userName');
  }
}
window.addEventListener('load', getLocalStorage);

exitBtn.addEventListener("click", () => {
  localStorage.clear();
  setTimeout(() => {
    window.location.href = '../registration/';
  }, 1000);
});