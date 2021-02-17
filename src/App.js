import {Container} from "react-bootstrap";
import DateModal from "./components/DateModal";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {Trips} from "./components/Trips";
import {calculateDays} from "./utils/daysCalculator";
import tripService from "./services/tripService"

function App() {
    const [daysLeft, setDaysLeft] = useState(0);
    const [allTrips, setAllTrips] = useState([]);
    const [showTrips, setShowTrips] = useState(false);

    useEffect(async () => {
        const trips = await tripService.getTrips({withinPeriod: true});
        setAllTrips(trips);
    }, []);

    useEffect(async () => {
        const result = await calculateDays();
        setDaysLeft(result);
        setShowTrips(true);
    }, [allTrips]);


    return (
        <div>
            <Container style={{marginTop: "40px"}}>
                <h2 className="display-2">For how many days can I go to Sanya?</h2>
                <h4 className="display-4">Today is {moment().format('LL')}</h4>
                <h4 className="display-4" style={{fontSize: "30px"}}>You have {daysLeft} days left</h4>
                <br/>
                <DateModal setAllTrips={setAllTrips}/>
                <br/>
                {showTrips && <Trips trips={allTrips} setAllTrips={setAllTrips}/>}
            </Container>
        </div>
    );
}

export default App;
