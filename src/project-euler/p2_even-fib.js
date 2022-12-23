/*
* p2_even-fib.js - finds sum of all even fib numbers under 4,000,000
* --
* I had implemented recursive fib a few days prior using a memo cache so this 
* problem was solved p easily
*/


let cache = {1: 1, 2: 2};
const fib_r = (n) => {
    if (cache[n]) return cache[n];

    let val = fib_r(n - 1) + fib_r(n - 2);
    cache[n] = val;

    return val;
}

const fib = (n) => {
    if (n <= 2) return n;

    return fib(n - 1) + fib(n - 2);
}

const MAX_FIB = 4000000

let i = 1;
let fib_n = 0;
let sum_of_evens = 0;
while (fib < MAX_FIB){
    fib_n = fib_r(i);

    if (fib % 2 === 0) 
        sum_of_evens += fib_n

    console.log(`fib_r(${i})=${fib_n}`)

    i++;
}

console.log(`Sum of even fib nums < ${MAX_FIB} is ${sum_of_evens}`)