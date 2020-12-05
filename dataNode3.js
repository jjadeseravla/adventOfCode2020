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
console.log(grid[0]);
    const location = new Location(grid[0].length,slope);
    let trees = 0;
    while(location.y<grid.length-1){
        location.move();
        if(grid[location.y][location.x] == '#') {
            trees++;
        }
    }

    return trees;
}

function Location(hillWidth,slope){
    this.x = 0;
    this.y = 0;
    this.width = hillWidth;
    this.move = ()=>{
        this.x+=slope[0];
        this.y+=slope[1];
        if(this.x > this.width-1) this.x-=this.width;
    };
}

// Part 2
// function part2() {
//     const slopes = [[1,1],[3,1],[5,1],[7,1],[1,2]];
//     let trees = 1;
//     for(const sl of slopes){
//         trees *= part1(sl);
//     }

// return trees;
// }

part1().then(function(res) {
  console.log(res);
});
