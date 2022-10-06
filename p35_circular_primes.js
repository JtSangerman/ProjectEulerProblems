/** https://projecteuler.net/problem=35
 * 
 * The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.
 *
 * There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.
 *
 * How many circular primes are there below one million?
 * 
 * TAKEAWAYS
 *      YAGNI!: implemented memo cache before it was even an issue: it was actaully SLOWER time elapsed than no cache...
 * 
 */

let util = require("./utils/util")

let cache = {}; // cache calls to expensive is_prime
const is_num_circular_prime_cached = (num) => {
    let n = Math.ceil(Math.log10(num))
    for (let i = 0; i < n; i++){
        let num_rotated = rotate_num(num, i);

        let cached = cache[num_rotated];
        if (cached){
            if (cached === -1) return false;
            else continue;
        } 

        let is_prime = util.is_prime(num_rotated);
        cache[num_rotated] = is_prime ? 1 : -1;
        if (!is_prime){
            return false;
        }
    }
    return true;
}

is_num_circular_prime = (num) => {
    let n = Math.ceil(Math.log10(num))
    for (let i = 0; i < n; i++){
        let num_rotated = rotate_num(num, i);

        let is_prime = util.is_prime(num_rotated);
        if (!is_prime){
            return false;
        }
    }
    return true;
}

const rotate_num = (num, n) => {
    let s = num + ""; 
    for (let i = 1; i <= n; i++){
        s = s[s.length-1] + s.substring(0, s.length-1);
    }
    return Number.parseInt(s);
} 

const find_all_circ_prime_under_n = (n, use_caching = false) => {
    let circ_primes = [];
    for (let i = 2; i <= n; i++){
        let is_circular_prime;
        if (use_caching)
            is_circular_prime = is_num_circular_prime_cached(i);
        else
            is_circular_prime = is_num_circular_prime(i);

        if (is_circular_prime){
            circ_primes.push(i);
            console.log(i)
        }
    }
    return circ_primes;
}


let n = process.argv[2] || 1000000;

let start_ms = new Date().getTime();
let circ_primes_under_n = find_all_circ_prime_under_n(n);
let end_ms = new Date().getTime();
let duration_ms = end_ms - start_ms;

console.log(`UNCACHED: find_all_circ_prime_under_n(${n}):`, );
console.log({duration_ms})
console.log(circ_primes_under_n)
console.log(circ_primes_under_n.length)

////
console.log("\n\n ////// \n\n")
///

let cached_start_ms = new Date().getTime();
let cached_circ_primes_under_n = find_all_circ_prime_under_n(n, true);
let cached_end_ms = new Date().getTime();
let cached_duration_ms = cached_end_ms - cached_start_ms;

console.log(`CACHED: find_all_circ_prime_under_n(${n}):`, );
console.log({cached_duration_ms})
console.log(cached_circ_primes_under_n)
console.log(cached_circ_primes_under_n.length)
