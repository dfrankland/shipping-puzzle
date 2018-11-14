# shipping-puzzle

# Explanation

The following is taken from [Kevin Lynagh's][kevin's blog] blog post
["Exploring a shipping puzzle"][puzzle link].

> Here’s the puzzle: Given a set of “legs”, each consisting of a day of the
> week, origin and destination:
>
> ```
> M PDX SEA
> T PDX SFO
> T SEA DEN
> W DEN PDX
> R PDX DEN
> F DEN JFK
> ```
>
> How can the legs be partitioned into “routes” for individual airplanes,
> subject to the following constraints:
>
> *   the destination of one leg must match the origin of the next leg
> *   planes must keep moving (e.g., a route can’t consist of a Monday Seattle
>     -> Portland leg followed by a Wednesday Portland -> Tacoma leg, since then
>     plane would be idle on Tuesday)
>
> A trivial solution meeting these constraints would be to consider each leg as
> a separate route — but that would require a lot of planes. The puzzle is to
> find a partitioning with the fewest possible routes.
>
> In this example, we know we need at least two routes, since there are two legs
> scheduled on Tuesday. One possible solution is for one plane to fly PDX, SEA,
> DEN, PDX, DEN, JFK and a second plane to fly just the Tuesday PDX to SFO leg.

Also, see ["Exploring a shipping puzzle, part 2"][puzzle link 2].

[kevin's blog]: https://kevinlynagh.com/
[puzzle link]: https://kevinlynagh.com/notes/shipping-puzzle/
[puzzle link 2]: https://kevinlynagh.com/notes/shipping-puzzle/part-2/

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
