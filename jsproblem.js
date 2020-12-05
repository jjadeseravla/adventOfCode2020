function miniMaxSum(a) {
  // const sortedArr =  a.sort(function (a, b) {
  //   return a - b ;
  // })
  //
  // sortedArr.splice(0, 1);
  //
  // return sortedArr.reduce(function (acc, curr) {
  //   return acc + curr
  // }, 0);
  let max = a[0];
  let min = a[0];
  let sum = 0;

  return a.map(function(num) {
    console.log(a.indexOf(num));
    if (max < a.indexOf(num)) {
      max = a.indexOf(num);
    }
  })
}

console.log(miniMaxSum([1, 3, 5, 9, 7]));
//ans 16 24

function problem(array, moveLeftBy) {
  const newArr = array.concat(); //make a copy of array as shift mutates it

for (var i = 0; i < moveLeftBy; i++) {
  const frontItem = newArr.shift(); // first element removed in array and return it eg.1

  newArr.push(frontItem); //push frontItem to back so now [2, 3, 4, 5, 1]
}

  return newArr;
}

console.log(problem([1, 2, 3, 4, 5], 4));
                    //ans [5, 1, 2, 3, 4]


//represent _ as sea level, a step up as / and step  down  \, Garys  hike:
//
// _/|     _
//   \    /
//    \/\/
//this example should n = 8 and s = [U,D,D,D,U,D,U,U]

//he takes n steps, for every step he took he noted uphill U, or downhill D.
//he starts at sealevel and each  step down up represents  1 unit change in altitude.
//eg. garys path is 8 = "DDUUUUDD" - enters a valley 2 units deep, then 2 units  back
//back to sealevel then 2 units mountain then 2  units back to sea level.
//function must return an int of valleys Gary has traversed.
//n - steps gary takes
//s string describing path

function countingValleys(n, s) {
  let valleys = 0;
  let elevationTracker = 0; //represents sea sealevel

  for (let i = 0; i < n; i++) {
    if (s[i] == 'D') {
      elevationTracker --;
    } else { //'U'
      if (elevationTracker == -1) {
        valleys ++;
      }
      elevationTracker ++;
    }
  }
  return valleys;
}

console.log(countingValleys(8, "DDUUUUDD"));
//                          ans 2

function minimumDistanceOfPair(a) {
  let min = a.length;

  for (let i = 0; i < a.length; i++) {
    for (let j = i+1; j < a.length; j++) {
      if (a[i] == a[j]) {
        if (j - i < min) {
          min = j - i;
        }
      }
    }
  }
  if (min == a.length) {
    return -1;
  }
  return min;
}

console.log(minimumDistanceOfPair([4, 3, 4, 1, 9, 3, 4, 5, 5]));
console.log(minimumDistanceOfPair([1, 2, 3, 4, 5, 1]));
//ans 1 and ans 5
