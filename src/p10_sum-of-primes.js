/*
* p10_sum-of-primes.js - find sum of all primes below 2,000,000
* --
* was miscalculating 4 as prime (< vs <=). I added a check to check for overflow, but nope, was a red herring
* eventually spotted it and got the answer. trying p7 now
*/


const is_prime = num => {
    let max_bound = Math.sqrt(num);

    for (let i = 2; i <= max_bound; i++){
        if (num % i == 0)
            return false;
    }

    console.log(`${num} is PRIME`)
    return true;
}

const MAX = 2000000;

let sum = 0;
for (let i = 2; i < MAX; i++){
    if (is_prime(i)) {
        sum += i;
    }
}

console.log(`\n\n => Sum of all primes below ${MAX} is ${sum}`);