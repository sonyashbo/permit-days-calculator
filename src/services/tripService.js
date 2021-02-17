import axios from 'axios'
import moment from "moment";

const baseUrl = 'https://permit-days-calculator-default-rtdb.firebaseio.com/'

const addTrip = async ({from, to, traveler}) => {
    const res = await axios.post(`${baseUrl}ranges.json`, {from, to, traveler});
    return res;
}

const getTrips = async ({withinPeriod, traveler}) => {
    const res = await axios.get(`${baseUrl}ranges.json`);
    const dates = [];
    //debugger
    for (let prop in res.data) {
        if (res.data.hasOwnProperty(prop)) {
            dates.push({
                from: res.data[prop].from,
                to: res.data[prop].to,
                traveler: res.data[prop].traveler
            });
        }
    }

    if(!withinPeriod) {
        return dates.filter(date => date.traveler === traveler);
    }

    const period = moment().day(-180);
    const sorted = dates.sort(orderDates).filter(date => moment(date.to)>period && date.traveler === traveler);
    return sorted;
}

function orderDates(a,b){
    const dateA = new Date(a.from);
    const dateB = new Date(b.from);
    return dateA > dateB ? 1 : -1;
};

export default {
    addTrip,
    getTrips
}
