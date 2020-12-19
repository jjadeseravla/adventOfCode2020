//check all fields are populated but ignore cid
//how many passports are valid

const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('data4.js');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

const lines = [];
let passport = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    // console.log(`Line from file: ${line}`);
    if (line.length !== 0) {
      passport.push(line)
    } else {
      //move to next passport element
      lines.push(passport);
      passport = [];
    }
  }
  return lines;
}

// processLineByLine().then(function(res) {
//   console.log(res);
// });

async function loopThroughData() {
  const data = await processLineByLine();
  //return data;
  let ans = [];
  for (var i = 0; i < data.length; i++) {
    if (isValidPassport(data[i].join(' ')) == true) {
      ans.push(data[i]);
    }
  }
  return ans.length;
}

// loopThroughData().then(function(res) {
//   console.log(res);
// });

function isValidPassport(passportInfo, arrOfSubstrings=["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"]) {
  var count = 0;
  let theValid = [];
  for (var i in arrOfSubstrings) {
    if (passportInfo.indexOf(arrOfSubstrings[i]) === -1) {
      return false;
    }
  }
  theValid.push(passportInfo)
  return true;
}

 function dataIntoObject(data) { //not working properly
  //const data = await processLineByLine();
  const arr = data.split(" ");

  let map = {};

  for (var i = 0; i < arr.length; i++) {
    let parts = arr[i].split(':');
    map[parts[0]] = parts[1].substr(1, parts[1].length - 2).toString(); //this line
  }
  return map;
}

function checkIfMapDataValid(data) {
  const map = dataIntoObject(data);
console.log(map);
  for (const [key, value] of Object.entries(map)) {
    console.log(key.type());
  }

}


  console.log(checkIfMapDataValid("ecl:gry pid:860033327 eyr:2020 hcl:#fffffdbyr:1937 iyr:2017 cid:147 hgt:183cm"));


console.log(isValidPassport("ecl:gry pid:860033327 eyr:2020 hcl:#fffffdbyr:1937 iyr:2017 cid:147 hgt:183cm"));
console.log(isValidPassport("iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884hcl:#cfa07d byr:1929"));
console.log(isValidPassport("hcl:#ae17e1 iyr:2013eyr:2024ecl:brn pid:760753108 byr:1931hgt:179cm"));
console.log(isValidPassport("hcl:#cfa07d eyr:2025 pid:166559648iyr:2011 ecl:brn hgt:59in"));
