/*
* p7_10001st-prime.js - find the 10001st prime
* --
* almost got it first try, had some off-by-1 errors
*/

const is_prime = num => {
    let max_bound = Math.sqrt(num);

    for (let i = 2; i <= max_bound; i++){
        if (num % i == 0)
            return false;
    }

    return true;
}

const find_next_prime = num => {
    while (true){
        if (is_prime(++num))
            return num;
    }
}

const GOAL = 10001;

let num_primes_found = 1;
let current_prime = 2;
while (num_primes_found < GOAL){

    current_prime = find_next_prime(current_prime);
    num_primes_found++;

}

console.log(`The nth prime for n=${GOAL} is ${current_prime}`)