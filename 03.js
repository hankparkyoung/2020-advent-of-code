const fs = require('fs');
const input = fs.readFileSync('../inputs/2020-03.txt', 'utf-8').split('\n');
const test = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#',
]
const slope = { x: 3, y: -1};

const isTree = coordinate => coordinate === '#';

const numOfTrees = (map, slope) => {
  // map is array of mapRows
  // slope is { x, y } movement 
  const position = { x: 0, y: 0 };
  const rowLength = map[0].length;

  const trees = map.slice(1).reduce((totalTrees, mapRow) => {
    position.x += slope.x;
    position.y -= slope.y; // inverse slope

    if (position.x >= rowLength) {
      position.x -= rowLength;
    }

    if (position.y < map.length && isTree(map[position.y][position.x])) {
      totalTrees += 1;
    }

    return totalTrees;
  }, 0);
  
  return trees;
}

// console.log(numOfTrees(test, slope));
// console.log(numOfTrees(input, slope));

const slopes = [
  { x: 1, y: -1 },
  { x: 3, y: -1 },
  { x: 5, y: -1 },
  { x: 7, y: -1 },
  { x: 1, y: -2 },
];

const answer = input => slopes.reduce((ans, slope) => {
  return ans * numOfTrees(input, slope);
}, 1);

console.log(answer(test));
console.log(answer(input));
