// function whatValueIsAcc(hashMap) {
//   let accumulator = 0;
//
//   // for (var m in hashMap) {
//   //   for (var i = 0; i < hashMap[m].length; i++) {
//   //     console.log(hashMap[m][i]);
//   //   }
//   Object.keys(hashMap).forEach(function(i) {
//     if (i === "acc") {
//       accumulator += acc;
//     } else if (i === "jmp") {
//       //jump to the value of hashMap[i + hashMap[i]]
//     }
//       //console.log(i, hashMap[i]);
//   });
// }
//
// console.log(whatValueIsAcc({
//   "nop" : +0,
//   "acc" : +1,
//   "jmp" : +4,
//   "acc" : +3,
//   "jmp" : -3,
//   "acc" : -99,
//   "acc" : +1,
//   "jmp" : -4,
//   "acc" : +6
// }));

const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('data8raw.js');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

const lines = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    // console.log(`Line from file: ${line}`);
    lines.push(line);
  }
  console.log(lines);
  return lines;
}

async function forEight() {
  const arrOfObjects = await processLineByLine();

  var accumulator = 0
  var stepIndex = 0
  var stepsCompleted = []

  var processStep = (index) => {
      var cmd = arrOfObjects[index]

      if(!stepsCompleted.some(s => s.command === cmd && s.index === index)){
          var iArray = cmd.match(/([a-z]{3})\s([-+0-9]+)/i)
          if(iArray){
              var instruction = { command: cmd, index, operation: iArray[1], argument: Number(iArray[2]) }
              console.log(instruction)
              switch (instruction.operation) {
                  case 'acc':
                      accumulator += instruction.argument
                      stepIndex += 1
                      break;
                  case 'jmp':
                      stepIndex += instruction.argument
                      break;
                  case 'nop':
                  default:
                      stepIndex += 1
                      break;
              }
              // debugger
              stepsCompleted.push(instruction)
              processStep(stepIndex)
          }
      }
  }

  processStep(stepIndex)
  console.log(stepIndex, accumulator)
}


async function forEight2() {
  const arrOfObjects = await processLineByLine();

  var accumulator = 0
  var stepIndex = 0
  var stepsCompleted = []
  var swapped = []
  var didSwap = false

  var processStep = (index) => {
      if(index < arrOfObjects.length) {
          var cmd = arrOfObjects[index]
          if(cmd) {
            if(!stepsCompleted.some(s => s.command === cmd && s.index === index)){
                var iArray = cmd.match(/([a-z]{3})\s([-+0-9]+)/i)
                if(iArray){
                  var instruction = { command: cmd, index, operation: iArray[1], argument: Number(iArray[2]) }
                  stepsCompleted.push(instruction)
                    // console.log(instruction)
                    switch (instruction.operation) {
                        case 'acc':
                            accumulator += instruction.argument
                            stepIndex += 1
                            break;
                        case 'jmp':
                            if(!didSwap && !swapped.some(s => s.command === cmd && s.index === index)) {
                                // swap with nop, do nothing
                                // debugger
                                // console.log('swapped',instruction)
                                didSwap = true
                                swapped.push(instruction)
                                stepIndex += 1
                            } else {
                                stepIndex += instruction.argument
                                // console.log('not swapped',instruction)
                            }
                            break;
                        case 'nop':
                            if(!didSwap && !swapped.some(s => s.command === cmd && s.index === index)) {
                                // swap with jmp, do jump
                                // debugger
                                // console.log('swapped',instruction)
                                didSwap = true
                                swapped.push(instruction)
                                stepIndex += instruction.argument
                            } else {
                                stepIndex += 1
                                // console.log('not swapped',instruction)
                            }
                            break;
                        default:
                          stepIndex += 1
                            break;
                    }
                    // debugger
                    setTimeout(() => processStep(stepIndex), 1)
                } else {
                  console.error('invalid arrOfObjects at index', index)
                }
            } else {
                //console.warn('looped, trying again', accumulator, swapped.length, swapped.slice(-1)[0])
                accumulator = 0
                stepIndex = 0
                didSwap = false
                stepsCompleted = []
                // debugger
                processStep(stepIndex)
            }
          }
      } else {
        console.error('total accumulator:', accumulator, 'index:', index)
      }
    }
  processStep(stepIndex)

}

forEight2().then(function(res) {
  console.log(res);
});
