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


/**
 * Takeaways: 
 *  - computing solution would take years without the prime factorization optimization. brute force won't work for this reason. complexity reduction needed.
 *  - prime factorization optimization is a great recursion exercise.
 * 
 *  - (i think) recursive solution is faster in terms of runtime opertations. the recursive solution's first found prime factor is the answer
 * 
 *  - iterative solution starts at the lower bound and works its way up, requiring more runtime ops. Can be linearly optimized by 
 *    reversing the loop, ie start at the upper bound and work down until first prime fact is found, as opposed to starting at lower bound
 *    and working until the last prime fact is found
 * 
 *  TODO:
 *     linear optimizations
 *          - iterative: should start prime factorization starting at the right-end bound instead of 0
 *          - can increment by 2 for prime fact search
 *     
 * 
 *      general
 *          - add runtime duration elapsed comparison!
 *  
 *          - learn to understand how to analyze and prove the complexities here 
 * 
 *            - Optimized prime factorization solution runtime complexity? 
 *                  - guess: O(nlogn) ?
 *            - brute force solution complexity? 
 *               - napkin math guess (ignoring sqrt(n) bounds):
 *                     
 *                     => let m be count(get_factors(n)) 
 *                     => O(n) * O(get_factors(n)) * O(is_prime(m)) = O(n) * O(n) * O(m)
 *                                                                  = O(n * n * m)
 *                                                                  = O(n^2 * m)
 *                                                                  QED 
 * */

const num = process.argv[2] || 600851475143;

let is_prime_work = 0;
const is_prime = (number) => {
    if (number <= 2) return true;

    let bound = Math.ceil(Math.sqrt(number))
    for (let j = 2; j < bound; j++){
        is_prime_work++;
        if (number % j == 0){
            return false;
        }
    }
    return true;
}

let it_reduction_count = 0;
let it_work = 0;
const iterative_get_largest_prime_fact = (number) => {
    let largest = 1;
    for (let i = 2; i <= number; i++){
        it_work++;
        if (number % i == 0){
            if (is_prime(i)) { 
                let n_reduced = number/i;
                console.log(`\t`, { pf_reduction_factor: i, iterative_reduction_count: ++it_reduction_count }, "\t:\t" + number + " / " + i +  `${n_reduced <= 9999 ? '\t' : ""}\t= ` + n_reduced);

                largest = i > largest ? i : largest;
                number = n_reduced

                i = 2;
            }
        }
    }
    console.log(`\n\tSOLVED iterative_get_largest_prime_fact(${num}) = `, largest);
    return largest;
}

let rec_stack_size = 0;
let rec_reduction_count = 0;
let rec_work = 0;
let rec_depth = 0;
const recursive_get_largest_prime_fact = (number) => {
    rec_stack_size++;
    rec_depth++;
    if (is_prime(number)) {
        rec_depth--;
        console.log(`\n\tSOLVED recursive_get_largest_prime_fact(${num}) = `, number);
        return number;
    }

    for (let i = 2; i < number; i++){ 
        rec_work++;
        if (number % i == 0){
            let n_reduced = number/i;
            console.log(`\t`, { pf_reduction_factor: i, recurisve_depth: rec_depth },  "\t:\t" + number + " / " + i +  `${n_reduced <= 9999 ? '\t' : ""}\t= ` + n_reduced);

            rec_reduction_count++;
            return recursive_get_largest_prime_fact(n_reduced);
        }  
    }
}


/**
 * Driver for the iterative and recursive solution with runtime stats
 * Runs the recursive solution followed by the iterative solution
 * Adds runtime statistics 
 */
(() => {
    console.clear();

    console.log(`\n\nsolve recursive_get_largest_prime_fact(`, num, ")\n    Complexity reductions:");
    let rec_solution_runtime_stats = {
        solution_type: "Recursive",
        fn_call_signature: `recursive_get_largest_prime_fact(${num})`,
        [`f(${num})`]: recursive_get_largest_prime_fact(num),
        complexity_reductions: rec_reduction_count,
        subproblem_solution_checks: rec_work,
        is_prime_operations: is_prime_work,
        other_stats: { recursive_stack_depth: rec_stack_size }
    };
    
    is_prime_work = 0;

    console.log(`\nsolve iterative_get_largest_prime_fact (`, num, ")\n    Complexity reductions:");
    let it_solution_runtime_stats = { 
        solution_type: "Iterative",
        fn_call_signature: `iterative_get_largest_prime_fact(${num})`,
        [`f(${num})`]: iterative_get_largest_prime_fact(num),
        complexity_reductions: it_reduction_count,
        subproblem_solution_checks: it_work,
        is_prime_operations: is_prime_work,
        other_stats: { subproblem_iteration_count: it_reduction_count }
    };

    console.log("\n\n");
    console.log("Runtime Complexity Statistics");
    console.table([it_solution_runtime_stats, rec_solution_runtime_stats]);
    console.log("\n\n");
})()
