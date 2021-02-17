import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Modal, Row, Table} from "react-bootstrap";
import moment from "moment";
import tripService from "../services/tripService";

export const Trips = ({trips, setAllTrips}) => {
    const [showTripsForPeriod, setShowTripsForPeriod] = useState(true);

    useEffect(async () => {
        const refetchedTrips = await tripService.getTrips({withinPeriod: showTripsForPeriod});
        setAllTrips(refetchedTrips);
    }, [showTripsForPeriod])

    const onTripViewSwitch = async() => {
        setShowTripsForPeriod(!showTripsForPeriod);

    }

    const tableName = showTripsForPeriod ? 'Trips for the last 180 days:' : 'Trips for all time';
    const tripsButtonName = showTripsForPeriod ? 'Show all trips' : 'Show trips for last 180 days';

    return (
        <div style={{marginTop: "40px"}}>
            <Row>
                <Col>
                    <h4 className="display-4" style={{fontSize: "30px"}}>{tableName}</h4>
                </Col>
                <Col>
                    <div className="float-right" >
                        <Button className="btn btn-light" onClick={onTripViewSwitch}>{tripsButtonName}</Button>
                    </div>

                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>From</th>
                    <th>To</th>
                </tr>
                </thead>
                <tbody>
                {trips.map((trip, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{moment(trip.from).format('LL')}</td>
                        <td>{moment(trip.to).format('LL')}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>

    )
}
