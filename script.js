const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Convert it into integer b using '+ sign
let ticketPrice = +movieSelect.value;

populateUI();

// Saveselected movie index and ticketPrice
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex' , movieIndex);
    localStorage.setItem('selectedMoviePrice' , moviePrice);
}

// Calculate ticket price based on selected seats
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Copy selected seats into array through spread operator [...], Map through array, Return a new array
    const seatIndex = [...selectedSeats].map(function (seat){
        return [...seats].indexOf(seat);
        // OR const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    });

    // Stored in Local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

    const selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;
}

// Get data from local storage and populate UI
function populateUI() {
    const selectedSeats = localStorage.getItem('selectedSeats');

    if(selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat , index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Event Listeners
movieSelect.addEventListener('change' , e =>{
    ticketPrice = e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
}) ;

container.addEventListener('click' , e =>{
    if(e.target.classList.contains('seat') && !(e.target.classList.contains('occupied'))) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// Intial count and total set
updateSelectedCount();