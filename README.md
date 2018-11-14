# shipping-puzzle

## Dependencies

*   [Clojure](https://clojure.org/) / [Leiningen](https://leiningen.org/)
*   [Node.js](https://nodejs.org/)
*   [Rust / Cargo](https://rustup.rs/)

## Running Benchmark

```bash
bash ./attempt-all.sh
```

## Example Benchmark Output

Here's the output from running the benchmarks on a 2.2 GHz Intel Core i7 MacBook
Pro from Mid 2015.

```
##### Attempt 1

### Clojure
2414

real    0m6.102s
user    0m7.489s
sys     0m0.778s

### Node.js
2414

real    0m2.276s
user    0m2.110s
sys     0m0.104s

##### Attempt 2

### Clojure
2414

real    0m1.332s
user    0m2.534s
sys     0m0.175s

### Node.js
2414

real    0m0.843s
user    0m0.750s
sys     0m0.053s

### Rust
2414

real    0m0.024s
user    0m0.010s
sys     0m0.003s
```
