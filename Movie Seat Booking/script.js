const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
// The + sign makes the variable and int
// additional method that can be used is parseInt()
let ticketPrice = +movieSelect.value;

// populates UI using localStorage info
populateUI();

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy selected seats into array
  // Map through array
  // return a new array of indexes
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  // seatsIndex is an array so we need to stringify it
  // store in local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerHTML = selectedSeatsCount;
  total.innerHTML = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
// parses the JSON stringify value back to an array
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  // make sure selectedSeats exists and make sure its not an empty array
  if ((selectedSeats !== null) & (selectedSeats.length > 0)) {
    seats.forEach((seat, index) => {
      // checking to see if selectesSeats in local storage is found in the seats nodelist
      // -1 means empty. Anything above means it exists
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    // selectedIndex is a value that is part of a dropdown menu which.
    // movieSelect input type is the dropdown menu aka (select)
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  setMovieData(e.target.selectedIndex, e.target.value);
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

// Initial count and total set
updateSelectedCount();
