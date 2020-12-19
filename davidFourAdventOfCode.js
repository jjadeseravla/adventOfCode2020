
const fs = require('fs');
const readline = require('readline');
async function readInData() {
const fileStream = fs.createReadStream('./data4.js');
const rl = readline.createInterface({

input: fileStream,
crlfDelay: Infinity
});

const lines = [];
let multilineParts = [];
for await (const line of rl) {
//console.log(line)
  if(line.length <= 0) {
    lines.push(multilineParts.join(' '));
    multilineParts = []
    }else {
    multilineParts.push(line)
    }
  }
return lines
}

readInData().then((result)=> {
//console.log(result[result.length -1])
const formattedData = result.map((row) => {
  const parts = row.split(' ')
  const test = parts.map((part) => {
  const keyValue = part.split(':')
    return {
        key: keyValue[0],
        value: keyValue[1],
      }
})

const obj = test.reduce((acc, current) => {
  return {
    ...acc,
    [current.key]: current.value,
  }
}, {})
return obj;
})

const requiredKey = [

'byr',

'iyr',

'eyr',

'hgt',

'hcl',

'ecl',

'pid',

// 'cid',

]
// byr (Birth Year) - four digits; at least 1920 and at most 2002.

// iyr (Issue Year) - four digits; at least 2010 and at most 2020.

// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.

// hgt (Height) - a number followed by either cm or in:

// If cm, the number must be at least 150 and at most 193.

// If in, the number must be at least 59 and at most 76.

// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.

// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.

// pid (Passport ID) - a nine-digit number, including leading zeroes.

// cid (Country ID) - ignored, missing or not.

const validator = {
'byr': isValidDigitLengthAndRange(4, 1920, 2002),
'iyr': isValidDigitLengthAndRange(4, 2010, 2020),
'eyr': isValidDigitLengthAndRange(4, 2020, 2030),
'hgt': isNumberFollowedWithString,
'hcl': isValidHairColor,
'ecl': isValidEyeColor,
'pid': isValidPid
}

const valid = formattedData.filter((row) => {
  return requiredKey.every((key) => {
  // console.log(row[key])
  if (!row[key]) {
  return false;
}

console.log(key, validator[key])
  if(row[key] && validator[key] && !validator[key](row[key])) {
    return false
  }
  return true;
  })
})
console.log(valid.length)
// console.log(formattedData)
})

function isValidDigitLengthAndRange(requiredLength, startRange, endRange){
  return (value) => {
  if (value.length !== requiredLength) {
    return false;
  }
  const numeric = parseInt(value, 10);
  if (numeric < startRange) {
    return false;
    }
  if (numeric > endRange) {
    return false;
    }
  return true
  }
}

function isNumberFollowedWithString(value){
    if (value.match(/\d{2}in/)) {
      var number = parseInt(value.substring(0,
      2));
    if (number >= 59 && number <= 76) {
    // console.log("true", number);
        return true;
      } else {
        return false;
      }
    } else if (value.match(/\d{3}cm/)) {
      var number = parseInt(value.substring(0,
      3));
        if (number >= 150 && number <= 193) {
    // console.log("true", number);
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function isValidHairColor (value) {
  if (value.match(/#[0-9,a-f]{6}/))
{

return true;

} else {

return false;

}

}




function isValidEyeColor (value) {

var eyeclrs = ["amb", "blu", "brn", "gry",
"grn", "hzl", "oth"];

if (eyeclrs.indexOf(value) !== -1) {

return true;

} else {

return false;

}

}




function isValidPid (value) {

if (value.length === 9) {

return true;

} else {

return false;

}

}




// console.log('true',isNumberFollowedWithString()('60in'))

// console.log('true',isNumberFollowedWithString()('190cm'))

// console.log('false',isNumberFollowedWithString()('190in'))

// console.log('false',isNumberFollowedWithString()('190'))







// four digits; at least 1920 and at most 2002.

// console.log('false', isValidDigitLengthAndRange(4, 1920, 2002)('1910'));

// console.log('true ', isValidDigitLengthAndRange('1920', 4, 1920, 2002));

// console.log('true ', isValidDigitLengthAndRange('1921', 4, 1920, 2002));

// console.log('false ', isValidDigitLengthAndRange('2003', 4, 1920, 2002));

// console.log('false ', isValidDigitLengthAndRange('191', 4, 1920, 2002));
