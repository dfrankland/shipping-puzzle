use std::collections::HashMap;
use std::fs::File;
use std::io::prelude::*;
use std::io::BufReader;

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Hash, Clone, Copy)]
enum Day {
    M,
    T,
    W,
    R,
    F,
}

type City = String;

#[derive(Debug, Clone)]
struct Leg {
    start: City,
    end: City,
    dow: Day,
}

#[derive(Debug)]
struct Route<'a> {
    legs: Vec<&'a Leg>,
}

impl<'a> Route<'a> {
    fn new(l: &Leg) -> Route {
        Route { legs: vec![l] }
    }
    fn add_leg(&mut self, l: &'a Leg) {
        self.legs.push(l);
    }
}

fn read_legs<P: AsRef<std::path::Path>>(path: P) -> Vec<Leg> {
    let f = BufReader::new(File::open(path).unwrap());
    f.lines()
        .map(|l| l.unwrap())
        .map(|l| {
            let vals: Vec<&str> = l.split(' ').collect();
            Leg {
                start: vals[1].to_string(),
                end: vals[2].to_string(),
                dow: match vals[3] {
                    "M" => Day::M,
                    "T" => Day::T,
                    "W" => Day::W,
                    "R" => Day::R,
                    "F" => Day::F,
                    _ => panic!("Invalid day found: {}", vals[3]),
                },
            }
        }).collect()
}

fn assemble_routes(legs: &[Leg]) -> Vec<Route> {
    let mut legs_by_dow: HashMap<Day, Vec<&Leg>> = HashMap::new();
    for l in legs {
        legs_by_dow.entry(l.dow).or_insert_with(|| vec![]).push(&l);
    }

    let mut finished_routes: Vec<Route> = vec![];
    let mut routes_by_position: HashMap<&City, Vec<Route>> = HashMap::new();

    for dow in &[Day::M, Day::T, Day::W, Day::R, Day::F] {
        let mut extended_routes_by_position: HashMap<&City, Vec<Route>> = HashMap::new();

        for l in legs_by_dow.remove(&dow).unwrap() {
            //Either add this leg to an existing route, or create a new one
            let r =
                if let Some(mut r) = routes_by_position.get_mut(&l.start).and_then(|rs| rs.pop()) {
                    r.add_leg(&l);
                    r
                } else {
                    Route::new(&l)
                };

            extended_routes_by_position
                .entry(&l.end)
                .or_insert_with(|| vec![])
                .push(r);
        }

        //done adding today's legs
        //move any unextended routes into the finished vector
        for (_, mut rs) in routes_by_position {
            finished_routes.append(&mut rs);
        }
        //then carry over whatever was extended to tomorrow
        routes_by_position = extended_routes_by_position;
    }

    for (_, mut rs) in routes_by_position {
        finished_routes.append(&mut rs);
    }

    finished_routes
}

fn main () {
    let legs = read_legs("./legs.txt");
    let routes = assemble_routes(&legs);
    println!("{}", routes.len());
}
