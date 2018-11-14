(ns test.attempt2
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

(defn attempt-2
  [legs]
  (let [dow-legs (group-by :dow legs)]
    (loop [[dow & dows] ["M" "T" "W" "R" "F"]
           routes-by-position {}
           finished-routes #{}]

      (if (nil? dow)
        ;;done
        (reduce into finished-routes (vals routes-by-position))

        ;;else get all of today's legs and try to attach to routes
        (let [[extended-routes-by-position unextended-routes-by-position]
              (loop [[l & ls] (dow-legs dow)
                     extended-routes-by-position {}
                     unextended-routes-by-position routes-by-position]
                (if (nil? l)
                  [extended-routes-by-position unextended-routes-by-position]
                  (if-let [r (-> unextended-routes-by-position
                                 (get (:start l))
                                 first)]

                    ;;Add this leg to a route
                    (recur ls
                           (update extended-routes-by-position (:end l) conj (conj r l))
                           (update unextended-routes-by-position (:start l) rest))

                    ;;Leg can't be added to existing route, start a new one
                    (recur ls
                           (update extended-routes-by-position (:end l) conj [l])
                           unextended-routes-by-position))))]

          (recur dows
                 ;;extended routes can keep being extended
                 extended-routes-by-position
                 ;;routes that weren't extended today must be finished; move them out so they won't slow down future calcs
                 (reduce into finished-routes (vals unextended-routes-by-position))))))))

(defn -main [& args]
  (pprint/pprint (count (attempt-2 legs))))
