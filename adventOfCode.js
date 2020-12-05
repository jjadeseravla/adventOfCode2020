//const data = require('./data1');
const data2 = require('./data2');
//
// //find two numbers in arr that added make 2020 and return the
// //multiplication of them
//
// function twoEntriesSumTo2020(arr) {
//
//   let newArr = [];
//
//   for (var i = 0; i < arr.length; i++) {
//     for (var j = 0; j < arr.length; j++) {
//       var sum = arr[i] + arr[j];
//       if (sum === 2020) {
//         console.log(arr[i], arr[j]);
//         var element = arr[i]*arr[j];
//         newArr.push(element);
//       }
//     }
//   }
//   return newArr;
// }
//
// console.log(twoEntriesSumTo2020(data1.data));
//
// function threeEntriesSumto2020(data, sum) {
//
//
//         // Fix the first element as A[i]
//         for (var i = 0; i < data.length - 2; i++) {
//
//             // Fix the second element as A[j]
//             for (var j = i + 1; j < data.length - 1; j++) {
//
//                 // Now look for the third number
//                 for (var k = j + 1; k < data.length; k++) {
//                     if (data[i] + data[j] + data[k] == sum) {
//                         console.log("Triplet is " + data[i] + ", " + data[j] + ", " + data[k]);
//                         return data[i] * data[j] * data[k];
//                     }
//                 }
//             }
//         }
//
//         // If we reach here, then no triplet was found
//         return false;
//
// }
//
// console.log(threeEntriesSumto2020([1721, 979, 366, 299, 675, 1456], 2020));
// console.log(threeEntriesSumto2020(data1.data, 2020));
//
// //each line gives password policy and then the password eg;
// //1-3 a: abcde
// //1-3 b" cdefg
// //2-9 c: cccccccc
// //password policy indicates lowest and highest amount a given lette must appear for
// //password to be valid, eg. 1-3 a means that password must contain a at least 1
// //time and most 3 times.
// //in above eg, 2 passwods are valid.  middle one is not as there are no b's and
// //it said must have 1-3 b.
// //how many passwords are valid according to their policies?

// function loopData2(data) {
//   let count = 0;
//   console.log(data[0]);
//   //console.log(data[0][0]);
//   for (var i = 0; i < data.length; i++) {
//     const isValid = validPasswords(data[i][0], data[i][1], data[i][2], data[i][3]);
//     if (isValid) {
//       count++;
//     }
//   }
//   return count;
// }
//
// function validPasswords(min, max, letter, password) {
//   console.log(password);
//   var passwordArr = password.split("");
//
//   let newArr = [];
//
//   for (var i = 0; i < passwordArr.length; i++) {
//     if (passwordArr[i] === letter) {
//       newArr.push(letter);
//     }
//   }
//   if (newArr.length >= min && newArr.length <= max) {
//     return true
//   }
//   return false;
// }


//need to check if index 1 is equal to a OR index 3 is equal to a
// console.log(validPasswords(1, 3, "a", "abcde")); -valid
// console.log(validPasswords(1, 3, "b", "cdefg")); - invalid - none are b
// console.log(validPasswords(2, 9, "c", "cccccccc")); -invalid - both are c
function loopData2Again(data) {
  let count = 0;
  for (var i = 0; i < data.length; i++) {
    const isValid = validPasswordsAgain(data[i][0], data[i][1], data[i][2], data[i][3]);
    if (isValid) {
      count++;
    }
  }
  return count;
}

function validPasswordsAgain(min, max, letter, password) {
  var passwordArr = password.split("");

  let newArr = [];
  let count = 0;

    if (passwordArr[min -1] === letter && passwordArr[max-1] === letter) {
      return false;
    }
    else if (passwordArr[min -1] === letter || passwordArr[max-1] === letter) {
      return true;
    }
    return false;

}

//console.log(validPasswordsAgain(1, 3, "a", "abcde"));
console.log(loopData2Again(data2.data));
