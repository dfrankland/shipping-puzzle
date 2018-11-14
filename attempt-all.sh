#! /bin/bash

set -e;

echo -e "\n##### Attempt 1";

echo -e "\n### Clojure";
lein with-profile attempt1 compile &> /dev/null;
lein with-profile attempt1 uberjar &> /dev/null;
time java -jar ./target/shipping-puzzle-1.0.0-SNAPSHOT-standalone.jar;