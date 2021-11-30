const fs = require('fs');
const input = fs.readFileSync('../inputs/2020-01.txt', 'utf-8').split('\n');
const test = '1721 979 366 299 675 145'.split(' ');

// Find the two entries that sum to 2020 and multiply the two

const findPair = (array, target) => {
  const findPairMap = array.reduce((pairMap, num) => {
    const pairing = target - num;
    if (pairMap && pairMap[pairing]) {
      pairMap.answer = num * pairing;
    } else {
      pairMap[num] = 1;
    }
    // can you break a .reduce before iterating through the whole array?
    return pairMap;
  }, {})

  return findPairMap.answer;
};

// console.log(findPiar(test, 2020));
// console.log(findPair(input, 2020));

// Find the three entries that sum to 2020 and multiply the three

const findTriple = (array, target) => {
  let answer;
  for (let index = 0; index <= array.length; index++) {
    const tempArray = array.slice(index + 1);
    const tempTarget = target - array[index];
    
    if (findPair(tempArray, tempTarget)) {
      answer = array[index] * findPair(tempArray, tempTarget);
    }
  }

  return answer;
};

// console.log(findTriple(test, 2020));
console.log(findTriple(input, 2020));
