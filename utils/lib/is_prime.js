const is_prime = (number) => {
    if (number <= 2) return true;

    let bound = Math.ceil(Math.sqrt(number))
    for (let j = 2; j <= bound; j++){
        if (number % j == 0){
            return false;
        }
    }

    return true;
};

module.exports = is_prime;
