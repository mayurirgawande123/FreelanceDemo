
// document.getElementById('movieStore').addEventListener('click', function () {

//     var MovieName = document.getElementById('movie-1').innerText;

//     // Save the name in localStorage.
//     JSON.stringify(localStorage.setItem('MovieName', MovieName));
// });



var movieListItems = document.getElementsByClassName('flex-column');

for (var i = 0; i < movieListItems.length; i++) {
  movieListItems[i].addEventListener('click', function() {
    var movieName = this.querySelector('h6').innerText;
    localStorage.setItem('MovieName', movieName);
  });
}



