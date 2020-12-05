const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('data3.js');

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
  return lines;
}



// Part 1
async function part1(slope=[3,1]) {
    const arrOfStrings = await processLineByLine(); //processLineByLine() is function above that makes data3 an array of strings
    const grid = arrOfStrings.map(ln => ln.split('')); //each string in the array is split into an array of characters, so a 2D array ie a grid
    const location = theLocation(grid[0].length,slope); //grid[0].length is width
    let trees = 0;
    while(location.getY()<grid.length-1){
        location.move();
        if(grid[location.getY()][location.getX()] == '#') {
            trees++;
        }
    }
    return trees;
}

function theLocation(width,slope){
  let x = 0;
  let y = 0;
  let move = ()=>{
    x+=slope[0];
    y+=slope[1];
    if(x > width-1) {
      x-=width;
    }
  };
  return {
    getX: function(){return x}, //the revealing module pattern : because previously using this and that would mutate, so need to put a getter so not stay static when return
    getY: function(){return y},
    move
  };
}

//Part 2
async function part2() {
    const slopes = [[1,1],[3,1],[5,1],[7,1],[1,2]];
    let trees = 1;
    for(const sl of slopes){
        trees *= await part1(sl);
    }

return trees;
}

// part1().then(function(res) {
//   console.log(res);
// });

part2().then(function(res) {
  console.log(res);
});
