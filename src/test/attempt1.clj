(ns test.attempt1
  (:gen-class))

(use '[clojure.string :as str :only (split)])
(use '[clojure.pprint :as pprint])

(def legs
  (->> (str/split (slurp "legs.txt") #"\n")
       (map (fn [s]
              (let [[id start end dow] (str/split s #"\s+")]
                {:id id :start start :end end :dow dow})))
       set))

(def tomorrow
  {"M" "T", "T" "W", "W" "R", "R" "F"})

(defn add-legs
  [dow possible-legs routes]
  (reduce (fn [routes {:keys [start] :as l}] (if-let [r (->> routes
                                                             (filter #(let [last-leg (last %)]
                                                                        (and (= dow (tomorrow (:dow last-leg)))
                                                                             (= start (:end last-leg)))))
                                                             first)]
                                               (-> routes
                                                   (disj r)
                                                   (conj (conj r l)))
                                               (conj routes [l])))
          routes possible-legs))

(defn attempt-1
  [legs]
  (let [dow-legs (group-by :dow legs)]
    (->> #{}
         (add-legs "M" (dow-legs "M"))
         (add-legs "T" (dow-legs "T"))
         (add-legs "W" (dow-legs "W"))
         (add-legs "R" (dow-legs "R"))
         (add-legs "F" (dow-legs "F")))))

(defn -main [& args]
  (pprint/pprint (count (attempt-1 legs))))
