const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.booked)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();
let ticketprice = +movieSelect.value;

//set movieSelect data in the local local Storage
function setmoviedata(movind, movpri) {
  localStorage.setItem("selmovind", movind);
  localStorage.setItem("selmovpri", movpri);
}

//update the number of seats selected and the total price of the tickets
function updateall() {
  const selseats = document.querySelectorAll(".row .seat.selected");
  //using space operator, indexOf and map for calculating index of the selected seats
  const seatind = [...selseats].map((seat) => [...seats].indexOf(seat));
  //set the localstorage
  localStorage.setItem("selseats", JSON.stringify(seatind));
  //count the number of seats and then update the count and price in the inner html file
  const numseat = selseats.length;
  count.innerText = numseat;
  total.innerText = numseat * ticketprice;
  setmoviedata(movieSelect.selectedIndex, movieSelect.value);
}

//get data from localstorage and populate UI
function populateUI() {
  // for selected seats
  const selseats = JSON.parse(localStorage.getItem("selseats"));
  if (selseats !== null && selseats.length > 0) {
    seats.forEach((seat, index) => {
      if (selseats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  // for movieSelect titles
  const selmovind = localStorage.getItem("selmovind");
  if (selmovind !== null) {
    movieSelect.selectedIndex = selmovind;
  }
}

//event when a movieSelect is selected
movieSelect.addEventListener("change", (e) => {
  ticketprice = +e.target.value;
  setmoviedata(e.target.selectedIndex, e.target.value);
  updateall();
});

//event when the seats are selected
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("booked")
  ) {
    e.target.classList.toggle("selected");
    updateall();
  }
});

//initial count and total
updateall();
