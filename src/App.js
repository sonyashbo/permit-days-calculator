import {ButtonGroup, Container, ToggleButton} from "react-bootstrap";
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
    const [travelTo, setTravelTo] = useState('Sanya');
    const [traveler, setTraveler] = useState('Sonya');

    const travelToValues = [
        {name: 'To Sanya', value: 'Sanya'},
        {name: 'To Sonya', value: 'Sonya'}
    ];

    const changeTraveler = (newTravelTo) => {
        setTravelTo(newTravelTo);
        const newTraveler = traveler === 'Sanya' ? 'Sonya' : 'Sanya';
        setTraveler(newTraveler);
    }

    useEffect(async () => {
        const trips = await tripService.getTrips({withinPeriod: true, traveler});
        setAllTrips(trips);
    }, [traveler]);

    useEffect(async () => {
        const result = await calculateDays({traveler});
        setDaysLeft(result);
        setShowTrips(true);
    }, [allTrips, traveler]);


    return (
        <div>
            <Container style={{marginTop: "40px"}}>
                <div className="float-right">
                    <ButtonGroup toggle>
                        {travelToValues.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                type="radio"
                                variant="secondary"
                                name="radio"
                                value={radio.value}
                                checked={travelTo === radio.value}
                                onChange={(e) => changeTraveler(e.currentTarget.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </div>
                <h2 className="display-2">For how many days can I go to {travelTo}?</h2>
                <h4 className="display-4">Today is {moment().format('LL')}</h4>
                <h4 className="display-4" style={{fontSize: "30px"}}>You have {daysLeft} days left</h4>
                <br/>
                <DateModal setAllTrips={setAllTrips} traveler={traveler}/>
                <br/>
                {showTrips && <Trips trips={allTrips} setAllTrips={setAllTrips} traveler={traveler}/>}
            </Container>
        </div>
    );
}

export default App;
