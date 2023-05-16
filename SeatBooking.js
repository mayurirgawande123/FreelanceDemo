const Movie = localStorage.getItem('MovieName');
document.getElementById('movieTitle').innerText = Movie;


document.addEventListener("DOMContentLoaded", function (e) {
  let selected_seats = JSON.parse(localStorage.getItem('selectedSeats'));
  console.log(selected_seats, 'ddddddddddd', document.getElementsByClassName('box-row'));
  for (let i = 0; i < document.getElementsByClassName('box-row').length; i++) {
    let boxRows = document.getElementsByClassName('box-row')[i].childNodes;
    console.log(document.getElementsByClassName('box-row')[i].childNodes[0].textContent, 'fffffffffff', boxRows);
    for (let j = 0; j < boxRows.length; j++) {
      console.log(document.getElementsByClassName('box-row')[i].childNodes[0].textContent.concat(boxRows[j].textContent), 'boxRows[j]', boxRows[j]);
      if (selected_seats.find(item => item === document.getElementsByClassName('box-row')[i].childNodes[0].textContent.concat(boxRows[j].textContent))) {
        boxRows[j].classList.add('selected');
      }
    }
  }
});


const MainContainer = document.getElementById("seatStructure");
const r = 14;
const c = 16;
let boxNumber = 1;
let selectedSeats = [];
table(r, c);

//1 function without storage 
function table(r, c) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  for (var i = 0; i < r; i++) {
    var box = document.createElement('div');
    box.classList.add("box-row");
    box.setAttribute('id', 'RowNo-' + i); // Assign unique ID for each row

    box.style.color = "green";
    box.style.display = "flex";

    if (i === 3) {
      box.style.marginBottom = "60px";
    }

    let rowBoxNumber = boxNumber;
    var letterBox = document.createElement('div');
    letterBox.innerText = letters[i];
    letterBox.classList.add('letterbox1');
    letterBox.setAttribute('id', 'letterNo-' + i); // Assign unique ID for each letter box
    box.appendChild(letterBox);

    for (var j = 0; j < c; j++) {
      var childbox = document.createElement('div');
      childbox.className = 'box';
      childbox.setAttribute('id', 'BoxNo-' + rowBoxNumber); // Assign unique ID for each seat box

      childbox.innerText = rowBoxNumber;
      childbox.style.textAlign = "center";

      childbox.addEventListener('click', function () {
        selectSeat(this);
      });

      box.appendChild(childbox);
      rowBoxNumber++;
      if ((j === 3) || (j === 11)) {
        childbox.classList.add('me-5');
      }
    }
    MainContainer.appendChild(box);
    // console.log(MainContainer);
  }
}


// // function for seat enable and disable 
function Ticket() {
  const seatType = document.getElementById("seat-type").value;
  const seatQty = document.getElementById("seat-qty").value;

  const boxRows = document.getElementsByClassName("box-row");
  // console.log(boxRows.length);

  if (seatType === "Standard" && seatQty >= 1 && seatQty <= 10) {
    for (let i = 0; i < boxRows.length; i++) {
      if (i < 4) {
        boxRows[i].classList.remove("enable");
      } else {
        boxRows[i].classList.add("enable");
      }

    }
  } else if (seatType === "Premium" && seatQty >= 1 && seatQty <= 10) {
    for (let i = 0; i < boxRows.length; i++) {
      if (i < 4) {
        boxRows[i].classList.add("enable");
      } else {
        boxRows[i].classList.remove("enable");
      }
    }
  } else {
    for (let i = 0; i < boxRows.length; i++) {
      boxRows[i].classList.remove("enable");
    }
  }
}
//...............................................................................................................................
//  Below code are checking with storage 
let seatsRemain = 0;
function selectSeat(seat) {
  // console.log(seat.parentNode, 'seat');
  const seatQty = seatsRemain === 0 ? +document.getElementById("seat-qty").value : seatsRemain;
  const currentRow = seat.parentNode;
  const currentRowId = currentRow.getAttribute('id');
  const rowNumber = currentRowId.split('-')[1]; // Extracting the RowNo from the ID

  const boxRows = document.getElementsByClassName("box-row");

  // // Reset previously selected seats in all rows
  // // console.log(seatsRemain, 'seatsRemain');
  // if (!seatsRemain) {
  //   for (let i = 0; i < boxRows.length; i++) {
  //     const rowSeats = boxRows[i].getElementsByClassName("box");
  //     for (let j = 0; j < rowSeats.length; j++) {
  //       rowSeats[j].classList.remove("selected");
  //     }
  //   }
  // }

  
  
  // Select new seats
  const rowSeats = currentRow.getElementsByClassName("box");
  const clickedIndex = Array.from(rowSeats).indexOf(seat);
  // console.log(clickedIndex, 'clickedIndex', +seatQty, 'rowSeats', rowSeats);

  // console.log(clickedIndex);

  for (let i = clickedIndex; i < clickedIndex + seatQty; i++) {

    if (rowSeats[i].classList.contains('me-5') || i === rowSeats.length - 1) {
      const box = rowSeats[i];
      box.classList.add("selected");
      selectedSeats.push(box.id); // Add the selected seat ID to the array
      seatsRemain = seatQty - selectedSeats.length;
      console.log(seatsRemain, 'seatsRemain', seatQty, 'selectedSeats.length', selectedSeats.length);
      if (i === (clickedIndex + seatQty - 1)) {
        seatsRemain = 0;
        selectedSeats.length = 0;
      }
      box.classList.add("disabled");
      return;
    }
    else {
      const box = rowSeats[i];
      box.classList.add("selected");
      selectedSeats.push(box.id); // Add the selected seat ID to the array
      box.classList.add("disabled");
    }
    console.log(clickedIndex, 'ddd', seatQty, 'seatQty', seatsRemain, 'selectedSeats.length)', selectedSeats.length);
    if (i === (clickedIndex + seatQty - 1)) {
      seatsRemain = 0;
      selectedSeats.length = 0;
    }
  }

  const selectedSeatIds = Array.from(currentRow.getElementsByClassName("selected")).map(seat => seat.id);

  // Disable previously selected seats
  const storedSelectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
  for (let i = 0; i < storedSelectedSeats.length; i++) {
    const seatId = storedSelectedSeats[i];
    const seat = document.getElementById(seatId);
    if (seat) {
      seat.classList.add("disabled");
    }
  }
}

// storing only SeatNo
function updateTextArea() {
  const selectedSeats = document.getElementsByClassName("selected");
  const seats = [];
  for (let i = 0; i < selectedSeats.length; i++) {
    const seat = selectedSeats[i];
    const seatLetter = seat.parentNode.getElementsByClassName("letterbox1")[0].innerText;
    const seatNumber = seat.innerText;
    seats.push(`${seatLetter}${seatNumber}`);
  }
  const seatsJSON = JSON.stringify(seats);

  // Retrieve the previously stored selected seats from local storage
  const storedSelectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];

  // Merge the newly selected seats with the previously stored seats
  const mergedSeats = [...storedSelectedSeats, ...seats];

  // Store the merged seats in local storage
  localStorage.setItem("selectedSeats", JSON.stringify(mergedSeats));

  // Write the selected seats to the text area
  const textArea = document.getElementById("selectedSeats");
  textArea.value = seatsJSON;
}



