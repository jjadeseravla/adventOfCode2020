const data5 = require('./data5');

function boardingPass(seatLocation) {
  const arrOfSeatLocation = seatLocation.split("");
  const rows = 128;
  let seats = Array.from(Array(128).keys());
  // let bottomRow = 0;
  // let topRow = 127;
  let columns = Array.from(Array(8).keys());;

  for (var i = 0; i < arrOfSeatLocation.length; i++) {
    if (arrOfSeatLocation[i] == "F") {
      seats = seats.slice(0, (Math.ceil(seats.length/2)));
    } else if (arrOfSeatLocation[i] == "B") {
      seats = seats.slice((Math.floor(seats.length/2)));
    } else if (arrOfSeatLocation[i] == "R") {
      columns = columns.slice((Math.floor(columns.length/2)));
    } else if (arrOfSeatLocation[i] == "L") {
      columns = columns.slice(0, (Math.ceil(columns.length/2)));
    }
  }
  //console.log(parseInt(seats[0], 10) * 8) + parseInt(columns[0], 10);
  return (parseInt(seats[0], 10) * 8) + parseInt(columns[0], 10);
}


function loopData5(data) {
  let newArr = [];
  //console.log(boardingPass("FBFBBFFRLR"));
  for (var i = 0; i < data.length; i++) {
    newArr.push(boardingPass(data[i]));

  }
  return sortedSeats(newArr);
}

function sortedSeats(theSeatsUnsorted) {
  let newArrThis = [];
  const seats = theSeatsUnsorted.sort(function(a, b) {
    return a - b;
  })
  console.log(seats);
  for (var i = 0; i < seats.length; i++) {
    // if (seats[i+1] != seats[i] +1) {
    if (seats[i + 1] - seats[i] > 1) {
      newArrThis.push(seats[i])
      // console.log(seats[i]);
    }
  }
  console.log("the one", newArrThis);
  return seats[i];
}

//console.log(boardingPass("FBFBBFFRLR"));
console.log("THISSSSSSSSSS", loopData5(data5.data));
