// return the sum of set of all natty numbers x: where x is multiple of 5 and 3 x < 1000
// https://projecteuler.net/problem=1
// ---
// didnt read the whole problem. misinterpreted i/o
// identifying edge cases: inclusive/exclusive definitions, '<' vs '<=' etc

let sum = 0;

let number = 2;
while (++number < 1000) {

    if (number % 3 == 0 || number % 5 == 0){
        sum += number;
    }

}

console.log(sum);