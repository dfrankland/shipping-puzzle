const { readFileSync } = require('fs');
const { resolve: resolvePath } = require('path');

const MONDAY = 'M';
const TUESDAY = 'T';
const WEDNESDAY = 'W';
const THURSDAY = 'R';
const FRIDAY = 'F';

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

const assembleRoutes = (dayOfWeekLegs) => {
  let finishedRoutes = [];
  let routesByPosition = {};

  DAYS_OF_WEEK.forEach((dayOfWeek) => {
    const extendedRoutesByPosition = {};

    dayOfWeekLegs[dayOfWeek].forEach((leg) => {
      // Either add this leg to an existing route, or create a new one.
      let route;
      if (Array.isArray(routesByPosition[leg.start])) {
        route = routesByPosition[leg.start].pop() || [];
        route.push(leg);
      } else {
        route = [leg];
      }

      if (Array.isArray(extendedRoutesByPosition[leg.end])) {
        extendedRoutesByPosition[leg.end].push(route);
      } else {
        extendedRoutesByPosition[leg.end] = [route];
      }
    });

    // Done adding today's legs.
    // Move any unextended routes into the finished vector.
    Object.values(routesByPosition).forEach((routeByPosition) => {
      finishedRoutes = finishedRoutes.concat(Object.values(routeByPosition));
    });

    // Then carry over whatever was extended to tomorrow.
    routesByPosition = extendedRoutesByPosition;
  });

  Object.values(routesByPosition).forEach((routeByPosition) => {
    finishedRoutes = finishedRoutes.concat(Object.values(routeByPosition));
  });

  return finishedRoutes;
};

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

const results = assembleRoutes(dayOfWeekLegs);

console.log(results.length);
