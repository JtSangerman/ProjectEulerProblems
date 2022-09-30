// https://projecteuler.net/problem=3

/**
 * RUN via node cmd:
 *      node p3_largest-prime-factor.js <optional: number>
 *      
 *      600851475143 is default if no args supplied 
 */

// find largest prime factor of n:
//  start at half n (largest factor of a number is n/2 if even, if odd ?? )
//  
// ---------
// wasted hours doing nothing useful
// by the time i realized what i was doing wasnt useful, i was spent.
// the real problem here was finding the optimization, not the trivial prime find solution.
//
// keep it simple, make it work, then optimize. less is more. less first more later.
//
// meaningful optimizing: cute linear/constant optimizations make no difference here (probably in general, too)
//                       what we want is a complexity reduction. dividing work/problem subsets is key
//

const num = process.argv[2] || 600851475143;

const is_prime = (number) => {
    if (number <= 2) return true;

    for (let j = 2; j < number; j++){
        if (number % j == 0){
            return false;
        }
    }
    return true;
}

let it_reduction_count = 0;
let it_work = 0;
const it_largest_prime_fact = (number) => {
    let largest = 1;
    let inc = 1;
    for (let i = 2; i < number; i+=inc){ // O(n/2)
        it_work++;
        if (i%10000000==0) console.log(i)
        // if i is factor of number
        if (number % i == 0){
            if (is_prime(i)) { 
                it_reduction_count++;
                console.log("\t\tsimplifying input with found prime %s to =>", i, number/i)

                largest = i > largest ? i : largest;

                number = number/i;
                i = 2;
            }
        }  
    }
    return largest;
}

let rec_stack_size = 0;
let rec_reduction_count = 0;
let rec_work = 0;
const recursive_largest_prime_fact = (number) => {
    rec_stack_size++;
    if (is_prime(number)) {
        console.log("\t\tProblem work reduced by prime factor of", number)
        return number;
    }

    let p = 2;
    let x = 2;
    for (let i = 2; i < number; i++){ 
        rec_work++;
        if (number % i == 0){
            rec_reduction_count++;
            p = recursive_largest_prime_fact(number/i);
            x = recursive_largest_prime_fact(i); // TODO: idk if this is necessary??
            return p > x ? p : x
        }  
    }
}


/**
 * driver for the iterative and recursive solution with runtime stats
 */
(() => {
    console.log("\n\n")


    console.log("Finding largest prime of %s recursively:\n", num)
        console.log(`\n\tDONE => recursive_largest_prime_fact(${num}) =`, recursive_largest_prime_fact(num));
        console.log("\t\tnumber of recursive complexity reductions (ie, recursive stack size):", rec_stack_size)
        //console.log("\t\toperations required:", rec_work)

    console.log("\n---------------- \n")

    console.log("Finding largest prime of %s iteratively:\n", num)
        console.log(`\n\tDONE => it_largest_prime_fact(${num}) =`, it_largest_prime_fact(num));
        console.log("\t\tnumber of iterative complexity reductions:", it_reduction_count)
        //console.log("\t\toperations required:", it_work)
    
    console.log("\ngg p euler p3\n")

})()
