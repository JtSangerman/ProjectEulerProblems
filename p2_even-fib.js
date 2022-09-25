/*
* p2_even-fib.js - finds sum of all even fib numbers under 4,000,000
* --
* I had implemented recursive fib a few days prior using a memo cache so this 
* problem was solved p easily
*/


let cache = {1: 1, 2: 2};
const fib_r = (num) => {
    if (cache[num]) return cache[num];

    let val = fib_r(num - 1) + fib_r(num - 2);
    cache[num] = val;

    return val;
}

const MAX_FIB = 4000000

let i = 1;
let fib = 0;
let sum_of_evens = 0;
while (fib < MAX_FIB){
    fib = fib_r(i);

    if (fib % 2 === 0) 
        sum_of_evens += fib

    console.log(`fib_r(${i})=${fib}`)

    i++;
}

console.log(`Sum of even fib nums < ${MAX_FIB} is ${sum_of_evens}`)