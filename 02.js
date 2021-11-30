const fs = require('fs');
const input = fs.readFileSync('../inputs/2020-02.txt', 'utf-8').split('\n');
const test = [
  '1-3 a: abcde',
  '1-3 b: cdefg',
  '2-9 c: ccccccccc',
];

// Find the number of passwords that fulfill their policy:
  // 1-3 a: means the letter must appear at least 1 but no more than 3 times

const formatInput = input => {
  const formatted = input.map(validation => {
    const reqNumber = validation.split(' ')[0];
    const reqLetter = validation.split(' ')[1];
    const password = validation.split(' ')[2];

    return {
      reqNumberRange: reqNumber.split('-'),
      reqLetter: reqLetter[0],
      passwordArr: password.split(''),
    }
  })

  return formatted;
};

const isValid = validateReq => {
  const letterCount = validateReq.passwordArr.filter(letter => letter === validateReq.reqLetter).length;

  return letterCount >= validateReq.reqNumberRange[0] &&
    letterCount <= validateReq.reqNumberRange[1];
};

const howManyValid = (passwords, validation) => {
  return formatInput(passwords).filter(password => validation(password)).length;
}

// console.log(howManyValid(test));
// console.log(howManyValid(input, isValid));

const isValid2 = validateReq => {
  const isFirstValid = validateReq.passwordArr[validateReq.reqNumberRange[0] - 1] === validateReq.reqLetter;
  const isSecondValid = validateReq.passwordArr[validateReq.reqNumberRange[1] - 1] === validateReq.reqLetter;

  if (isFirstValid && !isSecondValid) {
    return true;
  } else if (isSecondValid && !isFirstValid) {
    return true;
  }

  return false;
};

console.log(howManyValid(input, isValid2));
