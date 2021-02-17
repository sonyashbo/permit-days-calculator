import tripService from '../services/tripService'
import moment from "moment";

export const calculateDays = async ({traveler}) => {
    const trips = await tripService.getTrips({withinPeriod: true, traveler});
    let dates = [];
    trips.forEach(trip => {
        const days = getDaysBetweenDates(trip.from, trip.to);
        dates = dates.concat(days);

    });
    console.log(dates)
    const period = moment().day(-180);
    dates = dates.filter(date => moment(date.to)>period);
    return 90-dates.length;
};

const getDaysBetweenDates = function(start, end) {
    const dates = [];

    const from = moment(start).startOf('day');
    const to = moment(end).startOf('day');

    dates.push(from.toDate())

    while(from.add(1, 'days').diff(to) <= 0) {
        dates.push(from.clone().toDate());
    }

    return dates;
};
