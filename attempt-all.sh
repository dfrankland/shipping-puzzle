#! /bin/bash

set -e;

echo -e "\n##### Attempt 1";

echo -e "\n### Clojure";
lein with-profile attempt1 compile &> /dev/null;
lein with-profile attempt1 uberjar &> /dev/null;
time java -jar ./target/shipping-puzzle-1.0.0-SNAPSHOT-standalone.jar;

echo -e "\n### Node.js";
time node ./src/attempt-1.js;

echo -e "\n##### Attempt 2";

echo -e "\n### Clojure";
lein with-profile attempt2 compile &> /dev/null;
lein with-profile attempt2 uberjar &> /dev/null;
time java -jar ./target/shipping-puzzle-1.0.0-SNAPSHOT-standalone.jar;

echo -e "\n### Node.js";
time node ./src/attempt-2.js;

echo -e "\n### Rust";
cargo build --release &> /dev/null;
time ./target/release/shipping-puzzle;
