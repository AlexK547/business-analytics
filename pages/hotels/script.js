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


const btnLoad = document.querySelector(".buttons__input");
const btnClear = document.querySelector(".btn-clear");
const btnDownload = document.querySelector(".btn-download");

const table = document.querySelector(".table");

let dataLoad = [];
let tableHeadElements = ["Дата заезда", "Дата выезда", "Количество дней проживания", "Доход", "Средний доход"];

btnLoad.addEventListener('change', () => {
  readXlsxFile(btnLoad.files[0], { dateFormat: 'mm/dd/yyyy' } ).then((rows) => {
    dataLoad = [];
    rows.forEach( (element, index) => {
      dataLoad.push(element);
    });
    createBodyTable();
  });
});

function createHeadTable() {
  let thead = document.createElement("thead");
  thead.classList.add("table__thead");
  let tr = document.createElement("tr");
  tr.classList.add("table__tr");
  for (let i = 0; i < tableHeadElements.length; i++) {
    let th = document.createElement("th");
    th.classList.add("table__th");
    th.textContent = tableHeadElements[i];
    tr.append(th);
  }
  thead.append(tr);
  table.append(thead);
}

createHeadTable();

function createBodyTable() {
  let incomeTotal = 0;
  let tbody = document.createElement("tbody");
  tbody.classList.add("table__tbody");
  if (dataLoad.length < 2) return;

  for (let i = 1; i < dataLoad.length; i++) {
    let tr = document.createElement("tr");
    tr.classList.add("table__tr");

    let elem = dataLoad[i];

    let dataStart = elem[6].slice(0, 10);
    let td1 = document.createElement("td");
    td1.classList.add("table__td");
    td1.textContent = dataStart;
    let dataEnd = elem[7].slice(0, 10);
    let td2 = document.createElement("td");
    td2.classList.add("table__td");
    td2.textContent = dataEnd;
    let dataTotal = Math.ceil(+elem[30]);
    let td3 = document.createElement("td");
    td3.classList.add("table__td");
    td3.textContent = dataTotal;
    let income = Math.round(+elem[32] * 100) / 100;
    let td4 = document.createElement("td");
    td4.classList.add("table__td");
    td4.textContent = income;
    incomeTotal += income;
    let incomeAverage = Math.round(100 * income / dataTotal) / 100;
    if (!incomeAverage) incomeAverage = 0;
    let td5 = document.createElement("td");
    td5.classList.add("table__td");
    td5.textContent = incomeAverage;

    tr.append(td1, td2, td3, td4, td5);
    tbody.append(tr);
  }
  let tr = document.createElement("tr");
  tr.classList.add("table__tr");
  let td1 = document.createElement("td");
  td1.classList.add("table__td_total");
  td1.textContent = "Итого получено:";
  td1.setAttribute("colspan", 3);
  let td2 = document.createElement("td");
  td2.classList.add("table__td_total");
  td2.textContent = Math.round(incomeTotal * 100) / 100;
  let td3 = document.createElement("td");
  td3.classList.add("table__td");
  td3.textContent = "";
  tr.append(td1, td2, td3);
  tbody.append(tr);

  table.append(tbody);
}

btnClear.addEventListener("click", () => {
  if (document.querySelector(".table__tbody")) {
    document.querySelector(".table__tbody").textContent = "";
    dataLoad = [];
  }
})