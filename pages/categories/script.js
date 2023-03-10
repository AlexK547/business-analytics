const user = document.querySelector(".header__user");
const exitBtn = document.querySelector(".header__exit");
const buttonsCategories = document.querySelectorAll(".categories__item");

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

buttonsCategories.forEach((item, index) => {
  item.addEventListener("click", () => {
    let url = "";

    switch (index) {
      case 0:
        url = "../hotels";
        break;
      case 1:
        url = "../futurepage";
        break;
      case 2:
        url = "../futurepage";
        break;
      case 3:
        url = "../futurepage";
        break;
    }

    setTimeout(() => {
      window.location.href = url;
    }, 1000);
  });
});