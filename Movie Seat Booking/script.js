const container = document.querySelector('.container');
const seat = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const moveSelect = document.getElementById('movie');
// The + sign makes the variable and int
// additional method that can be used is parseInt()
let ticketPrice = +moveSelect.value;
// update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  count.innerHTML = selectedSeatsCount;
  total.innerHTML = selectedSeatsCount * ticketPrice;
}

// Movie select event
moveSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  // classList, returns the (value and class) of item clicked on
  // if it has class seat and not a class of occupied
  // sometimes the seat can be occupied which means it has two classes .seat .occupied
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    // classList API
    // this will add and remove the class selected
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});
