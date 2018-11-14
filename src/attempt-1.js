const { readFileSync } = require('fs');
const { resolve: resolvePath } = require('path');

const MONDAY = 'M';
const TUESDAY = 'T';
const WEDNESDAY = 'W';
const THURSDAY = 'R';
const FRIDAY = 'F';

const TOMORROW = {
  [MONDAY]: TUESDAY,
  [TUESDAY]: WEDNESDAY,
  [WEDNESDAY]: THURSDAY,
  [THURSDAY]: FRIDAY,
};

const DAYS_OF_WEEK = [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY];

const legs = (
  readFileSync(
    resolvePath(__dirname, '../legs.txt'),
    { encoding: 'utf8' },
  ).split('\n')
).map((s) => {
  const [id, start, end, dayOfWeek] = s.trim().split(' ');
  return {
    id,
    start,
    end,
    dayOfWeek,
  };
});

const addLegs = (dayOfWeek, possibleLegs, routesInitial) => (
  possibleLegs.reduce(
    (routes, leg) => {
      const { start } = leg;

      let matchingRoute = null;
      let index = 0;
      for (; index < routes.length; index += 1) {
        const route = routes[index];
        const {
          dayOfWeek: routeDayOfWeek,
          end: routeEnd,
        } = route.slice(-1).pop();
        if (
          dayOfWeek === TOMORROW[routeDayOfWeek]
            && start === routeEnd
        ) {
          matchingRoute = route;
          break;
        }
      }

      if (matchingRoute) {
        routes[index].push(leg);
      } else {
        routes.push([leg]);
      }

      return routes;
    },
    routesInitial,
  )
);

const dayOfWeekLegs = legs.reduce(
  (acc, { dayOfWeek, ...rest }) => {
    const existingDayOfWeek = acc[dayOfWeek];
    return {
      ...acc,
      [dayOfWeek]: [
        ...(Array.isArray(existingDayOfWeek) ? existingDayOfWeek : []),
        { dayOfWeek, ...rest },
      ],
    };
  },
  {},
);

const results = DAYS_OF_WEEK.reduce(
  (acc, dayOfWeek) => addLegs(
    dayOfWeek,
    dayOfWeekLegs[dayOfWeek],
    acc,
  ),
  [],
);

console.log(results.length);
