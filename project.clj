(defproject shipping-puzzle "1.0.0-SNAPSHOT"
  :dependencies
    [[org.clojure/clojure "1.9.0"]]
  :profiles {
    :attempt1 {
      :aot  [test.attempt1]
      :main test.attempt1}
    :attempt2 {
      :aot  [test.attempt2]
      :main test.attempt2}})
