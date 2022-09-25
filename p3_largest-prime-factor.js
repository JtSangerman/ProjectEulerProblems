// https://projecteuler.net/problem=3
//
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
// meaninful optimizing: cute linear/constant optimizations make no difference here (probably in general, too)
//                       what we want is a complexity reduction. dividing work/problem subsets is key

const num = process.argv[2];

const is_prime = (number) => {
    if (number <= 2) return true;

    for (let j = 2; j < number; j++){
        if (number % j == 0){
            return false;
        }
    }
    return true;
}

const it_largest_prime_fact = (number) => {
    let largest = 1;
    let inc = 1;
    for (let i = 2; i < number; i+=inc){ // O(n/2)
        if (i%10000000==0) console.log(i)
        // if i is factor of number
        if (number % i == 0){
            console.log("%s", i)
            if (is_prime(i)) { 
                console.log("\tsimplifying with found prime %s => %s", i, i, number/i)

                largest = i > largest ? i : largest;

                number = number/i;
                i = 2;
            }

        }  
    }
    return largest;
}

const recursive_largest_prime_fact = (number) => {
    if (is_prime(number)) {
        console.log(number)
        return number;
    }

    let p = 2;
    let x = 2;
    for (let i = 2; i < number; i++){ 
        if (number % i == 0){
            p = recursive_largest_prime_fact(number/i);
            x = recursive_largest_prime_fact(i);
            return p > x ? p : x
        }  
    }
}

(() => {
    console.log("finding largest prime of %s", num)
    console.log("largest: ", recursive_largest_prime_fact(num));
    //let largest = it_largest_prime_fact(num);
    //console.log("\tlargest: ", largest);
})()
