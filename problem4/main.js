/**
 *
 * @method For Loop
 * @time_complexity O(n)
 * @space_omplexity O(1)
 * @description Uses a simple for loop to iterate from 1 to n and accumulate the sum. It has a linear time complexity.
 */
function sum_to_n_a(n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
/**
 *
 * @method Arithmetic Progression Formula
 * @time_complexity O(1)
 * @space_omplexity O(1)
 * @description Uses the formula for the sum of an arithmetic progression. Highly efficient with a constant time complexity.
 */
function sum_to_n_b(n) {
    return (n * (n + 1)) / 2;
}
/**
 *
 * @method Recursive
 * @time_complexity O(n)
 * @space_complexity O(n)
 * @description Recursion has a linear time complexity, similar to the loop-based approach, but it may be less efficient for very large values of n due to the function call stack.
 */
function sum_to_n_c(n) {
    if (n <= 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1);
}

function measurePerformance(fn, n, iterations) {
    if (iterations === void 0) { iterations = 1000; }
    var totalTime = 0;
    for (var i = 0; i < iterations; i++) {
        var start = performance.now();
        fn(n);
        var end = performance.now();
        totalTime += end - start;
    }
    // Calculate the average execution time
    var averageTime = totalTime / iterations;
    return averageTime;
}
var n = 100; // Replace with your desired value of 'n'
var iterations = 1000; // Number of times to run each function
var averageTimeA = measurePerformance(sum_to_n_a, n, iterations);
var averageTimeB = measurePerformance(sum_to_n_b, n, iterations);
var averageTimeC = measurePerformance(sum_to_n_c, n, iterations);

console.log('Result of sum_to_n_a', sum_to_n_a(n));
console.log('Average Time for sum_to_n_a:', averageTimeA);

console.log('Result of sum_to_n_b', sum_to_n_b(n));
console.log('Average Time for sum_to_n_b:', averageTimeB);

console.log('Result of sum_to_n_c', sum_to_n_c(n));
console.log('Average Time for sum_to_n_c:', averageTimeC);